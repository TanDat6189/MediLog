"use client";

import { useState } from "react";
import { Plus, Search, Edit, Save, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

// Sample data for the cards
const initialCards = [
  {
    id: "1",
    name: "Technical Support",
    description: "Get help with technical issues and product troubleshooting",
    hotline: "+1 (800) 123-4567",
    details:
      "Our technical support team is available 24/7 to assist with any technical issues you may encounter. We provide support for all our products and services, including installation, configuration, and troubleshooting.",
  },
  {
    id: "2",
    name: "Customer Service",
    description: "Assistance with orders, returns, and general inquiries",
    hotline: "+1 (800) 987-6543",
    details:
      "Our customer service team is dedicated to providing exceptional service. We can assist with order tracking, returns, exchanges, and any general inquiries about our products and services.",
  },
  {
    id: "3",
    name: "Billing Department",
    description: "Help with invoices, payments, and subscription issues",
    hotline: "+1 (800) 456-7890",
    details:
      "Our billing department can assist with any questions related to invoices, payments, refunds, and subscription management. We ensure transparent and hassle-free billing processes.",
  },
  {
    id: "4",
    name: "Sales Team",
    description: "Information about products, pricing, and special offers",
    hotline: "+1 (800) 234-5678",
    details:
      "Our sales team can provide detailed information about our products, pricing options, volume discounts, and current promotions. We're here to help you find the right solution for your needs.",
  },
  {
    id: "5",
    name: "Partner Relations",
    description: "Support for business partners and collaborators",
    hotline: "+1 (800) 345-6789",
    details:
      "Our partner relations team works closely with our business partners and collaborators to ensure successful partnerships. We provide resources, training, and support to help our partners succeed.",
  },
  {
    id: "6",
    name: "IT Support",
    description: "Internal technical support for employees",
    hotline: "+1 (800) 567-8901",
    details:
      "Our IT support team provides technical assistance to employees. We handle hardware and software issues, network connectivity, and access management to ensure smooth operations.",
  },
];

export default function Profile() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter cards based on search query
  const filteredCards = initialCards.filter(
    (card) =>
      card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Find the card with the matching ID
  // const card = initialCards.find((card) => card.id === cardId);

  // State for editing mode
  const [isEditing, setIsEditing] = useState(false);
  // const initialEditedCard = card
  //   ? { ...card }
  //   : {
  //       id: "",
  //       name: "",
  //       description: "",
  //       hotline: "",
  //       details: "",
  //     };
  // const [editedCard, setEditedCard] = useState(initialEditedCard);

  return (
    <div className="flex flex-col h-full">
      {/* Breadcrumb navigation */}
      <div className="border-b">
        <div className="flex h-14 items-center px-4 gap-2">
          <a
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Home
          </a>
          <span className="text-sm text-muted-foreground">/</span>
          <span className="text-sm font-medium">Dashboard</span>
        </div>
      </div>

      <div className="flex-1 space-y-6 p-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome to your notes site
          </h2>
          <p className="text-muted-foreground">
            Here's an overview of your notes.
          </p>
        </div>

        {/* Search and Add New Card */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex flex-1 max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="Search cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" size="icon">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Card
          </Button>
        </div>

        <Separator />

        {/* Clickable cards grid */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Hosiptal Information</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Technical Support",
                description:
                  "Get help with technical issues and product troubleshooting",
                hotline: "+1 (800) 123-4567",
              },
              {
                name: "Customer Service",
                description:
                  "Assistance with orders, returns, and general inquiries",
                hotline: "+1 (800) 987-6543",
              },
              {
                name: "Billing Department",
                description:
                  "Help with invoices, payments, and subscription issues",
                hotline: "+1 (800) 456-7890",
              },
              {
                name: "Sales Team",
                description:
                  "Information about products, pricing, and special offers",
                hotline: "+1 (800) 234-5678",
              },
              {
                name: "Partner Relations",
                description: "Support for business partners and collaborators",
                hotline: "+1 (800) 345-6789",
              },
              {
                name: "IT Support",
                description: "Internal technical support for employees",
                hotline: "+1 (800) 567-8901",
              },
            ].map((item, index) => (
              <a
                key={index}
                href={`/dashboard/support/${item.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="block"
              >
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 min-h-10">
                      {item.description}
                    </p>
                    <div className="flex items-center text-sm font-medium">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      {item.hotline}
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between">
                    {isEditing ? (
                      <Button onClick={() => {}} className="mr-2">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    )}

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the card and remove it from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => {}}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardFooter>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
