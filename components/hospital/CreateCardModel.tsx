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

type CardItem = {
  id: string;
  name: string;
  description: string;
  hotline: string;
};

type CreateCardModelProps = {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCards: React.Dispatch<React.SetStateAction<CardItem[]>>;
};

export default function CreateCardModel({
  isCreateModalOpen,
  setIsCreateModalOpen,
  setCards,
}: CreateCardModelProps) {
  const [newCard, setNewCard] = useState({
    name: "",
    description: "",
    hotline: "",
  });

  // Create new card
  const handleCreateCard = (e) => {
    e.preventDefault();
    const id = Math.random().toString(36).substring(2, 9);
    setCards((prev) => [...prev, { id, ...newCard }]);
    setNewCard({ name: "", description: "", hotline: "" });
    setIsCreateModalOpen(false);
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
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newCard.description}
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
