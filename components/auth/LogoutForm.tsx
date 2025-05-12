import { auth, signOut } from "@/server/auth";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function Logout() {
  let session = await auth();
  console.log(session);

  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit" variant="ghost" size="icon" className="ml-auto">
        <LogOut className="h-5 w-5" />
        <span className="sr-only">Sign out</span>
      </Button>
    </form>
  );
}

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">Sign out</button>
    </form>
  );
}
