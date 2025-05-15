"use client";

import { useSession } from "next-auth/react";

import { useEffect, useState } from "react";

import { Separator } from "@/components/ui/separator";

import BreadcrumbNav from "@/components/hospital/BreadcrumbNav";
import Title from "@/components/hospital/Title";
import ActionBar from "@/components/hospital/ActionBar";
import CardList from "@/components/hospital/CardList";
import CreateCardModel from "@/components/hospital/CreateCardModel";

import { CardItem } from "@/types/CardItem";

export default function HospitalPage() {
  const { data: session, status } = useSession();

  const [cards, setCards] = useState<CardItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/hospital?userId=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => setCards(data));
    }
  }, [session?.user?.id]);

  // Filter cards based on search query
  const filteredCards = cards.filter(
    (card) =>
      card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.hotline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

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
        userId={session?.user?.id}
      />
    </div>
  );
}
