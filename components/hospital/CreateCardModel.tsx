import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { CardItem } from "@/types/CardItem";

type CreateCardModelProps = {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCards: React.Dispatch<React.SetStateAction<CardItem[]>>;
  userId: any;
};

export default function CreateCardModel({
  isCreateModalOpen,
  setIsCreateModalOpen,
  setCards,
  userId,
}: CreateCardModelProps) {
  const [newCard, setNewCard] = useState({
    name: "",
    address: "",
    hotline: "",
  });

  // Create new card
  const handleCreateCard = async (e) => {
    e.preventDefault();
    const id = Math.random().toString(36).substring(2, 9);

    const data = { id, userId, ...newCard };

    const res = await fetch(`/api/hospital/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result) {
      setCards((prev) => [...prev, result.data[0]]);
      setNewCard({ name: "", address: "", hotline: "" });
      setIsCreateModalOpen(false);
    }
  };

  // Handle form input changes for new card
  const handleNewCardChange = (e) => {
    const { name, value } = e.target;
    setNewCard((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Card</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new card.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateCard}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={newCard.name}
                onChange={handleNewCardChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                value={newCard.address}
                onChange={handleNewCardChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="hotline">Hotline</Label>
              <Input
                id="hotline"
                name="hotline"
                value={newCard.hotline}
                onChange={handleNewCardChange}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Card</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
