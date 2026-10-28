import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// ---------------------------------------------------------------------------
// HMR-safe connection cache
// Stored on globalThis so it survives Next.js Hot Module Replacement cycles
// in development (modules are re-imported but the Node process is not
// restarted, so globalThis persists across HMR).
// ---------------------------------------------------------------------------

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var __mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = globalThis.__mongooseCache ?? {
  conn: null,
  promise: null,
};

if (!globalThis.__mongooseCache) {
  globalThis.__mongooseCache = cache;
}

// ---------------------------------------------------------------------------
// connectToDatabase
// Call this at the top of every server function that needs the database.
// Returns the shared mongoose instance.
// ---------------------------------------------------------------------------

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (!MONGODB_URI) {
    throw new Error(
      "Missing environment variable: MONGODB_URI\n" +
        "Add it to .env.local:\n" +
        '  MONGODB_URI="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>"',
    );
  }

  // Return cached connection immediately if already established.
  if (cache.conn) {
    return cache.conn;
  }

  // Create connection promise only once. Concurrent callers await the same
  // promise rather than opening multiple connections.
  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
  }

  try {
    cache.conn = await cache.promise;
  } catch (error) {
    // Clear the promise so the next call retries the connection.
    cache.promise = null;
    throw error;
  }

  return cache.conn;
}

export default connectToDatabase;
