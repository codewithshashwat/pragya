import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center py-20 px-4 sm:px-8 md:px-16 w-full">
      <div className="w-full max-w-4xl flex flex-col gap-16">
        {/* Header Section */}
        <header className="flex flex-col gap-6 text-center sm:text-left items-center sm:items-start max-w-2xl">
          <h1 className="text-display font-bold tracking-tight text-foreground">
            Pragya
          </h1>
          <p className="text-h4 font-serif text-foreground font-semibold">
            Read. Reflect. Retain.
          </p>
          <p className="text-body-lg text-text-secondary leading-relaxed">
            A calm, focused digital library designed for reading, learning, and
            making knowledge your own. Experience a distraction-free environment
            that prioritizes your relationship with the text.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button size="lg">Start Reading</Button>
            <Button variant="outline" size="lg">
              Explore Library
            </Button>
          </div>
        </header>

        {/* Typography & Surface Demonstration */}
        <section className="flex flex-col gap-8">
          <h2 className="text-h2 font-bold mb-4 border-b pb-2 border-border-warm">
            Typography & Structure
          </h2>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Demo Card */}
            <Card className="flex-1 w-full max-w-lg">
              <CardHeader>
                <div className="text-sm font-medium text-text-muted mb-2 tracking-wide uppercase">
                  Featured Book
                </div>
                <CardTitle className="text-h3 font-serif">
                  The Architecture of Calm
                </CardTitle>
                <CardDescription className="text-text-secondary mt-1 text-base">
                  By Elena Rossi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body font-serif text-foreground">
                  "True attention requires an environment that does not compete
                  for it. When we remove the unnecessary, we create space for
                  the essential to emerge."
                </p>
                <div className="mt-6 flex flex-col gap-2">
                  <label
                    htmlFor="notes"
                    className="text-small font-medium text-text-secondary"
                  >
                    Quick Note
                  </label>
                  <Input id="notes" placeholder="Write your thoughts..." />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center mt-2">
                <span className="text-caption text-text-muted">
                  Last read: Today
                </span>
                <Button variant="secondary" size="sm">
                  Continue
                </Button>
              </CardFooter>
            </Card>

            {/* Typography Scale Preview */}
            <div className="flex-1 flex flex-col gap-4 p-6 bg-white border border-border-warm rounded-lg shadow-sm">
              <h3 className="text-h4 font-bold border-b border-border pb-2">
                Scale Preview
              </h3>
              <div className="flex flex-col gap-3 font-sans">
                <div className="text-h1">Heading 1</div>
                <div className="text-h2">Heading 2</div>
                <div className="text-h3">Heading 3</div>
                <div className="text-h4 font-serif">Heading 4 (Serif)</div>
                <div className="text-body-lg text-text-secondary">
                  Body Large — Used for introductions.
                </div>
                <div className="text-body font-serif">
                  Body (Serif) — Used for immersive reading.
                </div>
                <div className="text-small">
                  Small — Interface elements & metadata.
                </div>
                <div className="text-caption text-text-muted">
                  Caption — very small details.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
