import TimesheetsPage from "@/components/timesheet/TimesheetPageComponent";
import {SignedIn, SignedOut, SignInButton} from "@clerk/nextjs";
import {Button} from "@/components/ui/button";

export default function TimesheetPage() {
  return (
    <div>
      <div className="bg-background flex flex-col justify-center items-center">
        <SignedIn>
          <div className="w-full mx-auto">
            <TimesheetsPage/>
          </div>
        </SignedIn>
        <SignedOut>
          <div className="flex flex-col items-center">
            <h1 className="mb-4 text-2xl">Hi there! Please <span className="font-semibold">sign in</span> to access your
              timesheet.</h1>
            <Button>
              <SignInButton/>
            </Button>
          </div>
        </SignedOut>
      </div>
    </div>
  );
}