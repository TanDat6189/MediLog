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

type EditCardModelProps = {
  currentCard: CardItem;
  isEditModalOpen: boolean;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentCard: React.Dispatch<React.SetStateAction<CardItem>>;
  setCards: React.Dispatch<React.SetStateAction<CardItem[]>>;
};

export default function EditCardModel({
  currentCard,
  isEditModalOpen,
  setIsEditModalOpen,
  setCurrentCard,
  setCards,
}: EditCardModelProps) {
  // Handle form input changes for editing card
  const handleEditCardChange = (e) => {
    const { name, value } = e.target;
    setCurrentCard((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Edit card
  const handleEditCard = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/hospital/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentCard),
    });

    const result = await res.json();

    if (result) {
      setCards((prev) =>
        prev.map((card) =>
          card.id === result.data[0].id ? result.data[0] : card
        )
      );
      setIsEditModalOpen(false);
    }
  };

  return (
    <>
      {/* Edit Card Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Card</DialogTitle>
            <DialogDescription>
              Update the details of this card.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditCard}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={currentCard.name}
                  onChange={handleEditCardChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-address">Address</Label>
                <Textarea
                  id="edit-address"
                  name="address"
                  value={currentCard.address}
                  onChange={handleEditCardChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-hotline">Hotline</Label>
                <Input
                  id="edit-hotline"
                  name="hotline"
                  value={currentCard.hotline}
                  onChange={handleEditCardChange}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
