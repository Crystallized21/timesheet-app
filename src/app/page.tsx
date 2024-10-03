"use client"

import { SignedIn, SignedOut, SignInButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import DashboardPage from "@/components/dashboard/DashboardPage";

export default function Home() {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="bg-background flex flex-col justify-center items-center">
        <SignedIn>
          <div className="w-full mx-auto">
            <DashboardPage/>
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
    </div>
  );
}