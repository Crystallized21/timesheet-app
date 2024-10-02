"use client"

import TimesheetCard from "@/components/TimesheetCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute top-0 right-0 p-4">
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: {
                width: "3rem",
                height: "3rem",
              },
              userButtonPopoverCard: {
                width: "20rem",
              },
            },
          }}
        />
      </div>
      <div className="bg-background flex flex-col justify-center items-center min-h-screen">
        <SignedIn>
          <div className="w-full max-w-5xl mx-auto">
            <TimesheetCard />
          </div>
        </SignedIn>
        <SignedOut>
          <div className="flex flex-col items-center">
            <h1 className="mb-4 text-2xl">Hi there! Please <span className="font-semibold">sign in</span> to access your timesheet.</h1>
            <Button>
              <SignInButton />
            </Button>
          </div>
        </SignedOut>
      </div>
      <div className="absolute bottom-4 right-4">
        <ThemeToggle />
      </div>
    </div>
  );
}