import mongoose, { type Document, Schema } from "mongoose";
import type { IUser } from "@/types/db";

// ---------------------------------------------------------------------------
// UserDocument — Mongoose document type
// Field names match Auth.js AdapterUser shape for clean Phase 3 integration.
// ---------------------------------------------------------------------------

export interface UserDocument extends IUser, Document {
  _id: mongoose.Types.ObjectId;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    emailVerified: {
      type: Date,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
UserSchema.index({ role: 1 });
// email unique index is created by the `unique: true` field option above.

const User =
  (mongoose.models.User as mongoose.Model<UserDocument>) ??
  mongoose.model<UserDocument>("User", UserSchema);

export default User;
