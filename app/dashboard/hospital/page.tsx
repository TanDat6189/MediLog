"use client";

import { useSession } from "next-auth/react";

import { useEffect, useState } from "react";

import { Separator } from "@/components/ui/separator";

import BreadcrumbNav from "@/components/hospital/BreadcrumbNav";
import Title from "@/components/hospital/Title";
import ActionBar from "@/components/hospital/ActionBar";
import CardList from "@/components/hospital/CardList";
import CreateCardModel from "@/components/hospital/CreateCardModel";

// Sample card data
const initialCards = [
  {
    id: "1",
    name: "Customer Support",
    description:
      "24/7 customer support for all product inquiries and technical issues.",
    hotline: "1-800-123-4567",
  },
  {
    id: "2",
    name: "Sales Department",
    description:
      "Contact our sales team for quotes, bulk orders, and special pricing.",
    hotline: "1-800-987-6543",
  },
  {
    id: "3",
    name: "Technical Support",
    description:
      "Get help with product installation, troubleshooting, and maintenance.",
    hotline: "1-800-456-7890",
  },
  {
    id: "4",
    name: "Billing Department",
    description:
      "Questions about your invoice, payment methods, or account status.",
    hotline: "1-800-789-0123",
  },
];

export default function HospitalPage() {
  const { data: session, status } = useSession();

  const [cards, setCards] = useState(initialCards);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {}, []);

  // Filter cards based on search query
  const filteredCards = cards.filter(
    (card) =>
      card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.hotline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 p-8">
      {/* Breadcrumb Navigation */}
      <BreadcrumbNav />

      {/* Page Title */}
      <Title />

      {/* Search and Action Bar */}
      <ActionBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />

      <Separator className="my-6" />

      {/* Cards Grid */}
      <CardList filteredCards={filteredCards} setCards={setCards} />

      {/* Create Card Modal */}
      <CreateCardModel
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
        setCards={setCards}
      />
    </div>
  );
}
