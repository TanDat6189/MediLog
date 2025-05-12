import "../globals.css";

import type React from "react";
import type { Metadata } from "next";

import { Logout } from "@/components/auth/LogoutForm";
import SidebarItem from "@/components/sidebar/SidebarItem";

let title = "MediLog";
let description =
  "This is a Next.js starter kit that uses NextAuth.js for simple email + password login and a Postgres database to persist the data.";

export const metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  metadataBase: new URL("https://nextjs-postgres-auth.vercel.app"),
};

import { FileUser, NotebookPen, Bot } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <Sidebar>
                <SidebarHeader className="border-b">
                  <div className="flex h-14 items-center px-4">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src="data:image/png;base64,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"
                        alt="User"
                      />
                      <AvatarFallback>Logo</AvatarFallback>
                    </Avatar>
                    <h1 className="text-xl font-semibold pl-8">MediLog</h1>
                  </div>
                </SidebarHeader>
                <SidebarContent>
                  <SidebarMenu>
                    <SidebarItem
                      href="/dashboard/profile"
                      icon={<FileUser className="h-5 w-5" />}
                      label="My Profile"
                    />
                    <SidebarItem
                      href="/dashboard/hospital"
                      icon={<NotebookPen className="h-5 w-5" />}
                      label="Hospital"
                    />
                    <SidebarItem
                      href="/dashboard"
                      icon={<Bot className="h-5 w-5" />}
                      label="Chatbot"
                    />
                  </SidebarMenu>
                </SidebarContent>
                <SidebarFooter className="border-t">
                  <div className="flex items-center p-4">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="User"
                      />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="ml-3 space-y-0.5">
                      <p className="text-sm font-medium">user@example.com</p>
                      <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                    <Logout />
                  </div>
                </SidebarFooter>
                <SidebarRail />
              </Sidebar>

              <SidebarInset>{children}</SidebarInset>
            </div>
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
