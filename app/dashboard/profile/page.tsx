"use client";

import { Separator } from "@/components/ui/separator";

import PersonalInfo from "@/components/profile/PersonalInfo";

export default function ProfilePage() {
  return (
    <div className="flex-1 space-y-6 p-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome to your profile
        </h2>
        <p className="text-muted-foreground">
          Here's an overview of your account activity and information.
        </p>
      </div>
      <Separator />

      {/* Personal Information Section */}
      <PersonalInfo />
    </div>
  );
}
