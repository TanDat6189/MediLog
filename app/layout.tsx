import "./globals.css";

import type React from "react";
import type { Metadata } from "next";

let title = "Next.js + Postgres Auth Starter";
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

import { BarChart3, Home, LogOut } from "lucide-react";

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
import { Button } from "@/components/ui/button";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <div className="flex min-h-screen">
            <Sidebar>
              <SidebarHeader className="border-b">
                <div className="flex h-14 items-center px-4">
                  <h1 className="text-xl font-semibold">MediLog</h1>
                </div>
              </SidebarHeader>
              <SidebarContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive>
                      <a href="/dashboard/profile">
                        <Home className="h-5 w-5" />
                        <span>My Profile</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/dashboard/hospital">
                        <BarChart3 className="h-5 w-5" />
                        <span>My Note</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarContent>
              <SidebarFooter className="border-t">
                <div className="flex items-center p-4">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="ml-3 space-y-0.5">
                    <p className="text-sm font-medium">user@example.com</p>
                    <p className="text-xs text-muted-foreground">Admin</p>
                  </div>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <LogOut className="h-5 w-5" />
                    <span className="sr-only">Sign out</span>
                  </Button>
                </div>
              </SidebarFooter>
              <SidebarRail />
            </Sidebar>

            <SidebarInset>{children}</SidebarInset>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
