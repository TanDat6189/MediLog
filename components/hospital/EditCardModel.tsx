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

type EditCardModelProps = {
  currentCard: CardItem;
  isEditModalOpen: boolean;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentCard: React.Dispatch<React.SetStateAction<CardItem>>;
};

export default function EditCardModel({
  currentCard,
  isEditModalOpen,
  setIsEditModalOpen,
  setCurrentCard,
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
  const handleEditCard = (e) => {
    // e.preventDefault();
    // setCards((prev) =>
    //   prev.map((card) => (card.id === currentCard.id ? currentCard : card))
    // );
    // setIsEditModalOpen(false);
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
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={currentCard.description}
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
