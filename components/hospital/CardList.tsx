import { useRouter } from "next/navigation";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

import EditCardModel from "@/components/hospital/EditCardModel";

import { CardItem } from "@/types/CardItem";

type CardListProps = {
  filteredCards: CardItem[];
  setCards: React.Dispatch<React.SetStateAction<CardItem[]>>;
};

export default function CardList({ filteredCards, setCards }: CardListProps) {
  const router = useRouter();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState<CardItem>({
    id: "",
    profileId: "",
    name: "",
    address: "",
    hotline: "",
  });

  // Open edit modal with card data
  const openEditModal = (card) => {
    setCurrentCard(card);
    setIsEditModalOpen(true);
  };

  // Delete card
  const handleDeleteCard = async (id) => {
    const res = await fetch(`/api/hospital/${id}`, {
      method: "DELETE",
    });

    const result = await res.json();
    console.log(result.data);
    if (result.data) {
      setCards((prev) => prev.filter((card) => card.id !== id));
    }
  };

  // Navigate to card detail page
  const navigateToCardDetail = (id) => {
    router.push(`/dashboard/hospital/${id}`);
  };

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCards?.map((card) => (
          <Card key={card.id} className="overflow-hidden">
            <div
              className="cursor-pointer"
              onClick={() => navigateToCardDetail(card.id)}
            >
              <CardHeader>
                <CardTitle>{card.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {card.address}
                </p>
                <div className="mt-4">
                  <p className="text-sm font-medium">Hotline:</p>
                  <p className="text-sm">{card.hotline}</p>
                </div>
              </CardContent>
            </div>
            <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-3">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  openEditModal(card);
                }}
              >
                Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the card and remove it from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDeleteCard(card.id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>

      <EditCardModel
        currentCard={currentCard}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        setCurrentCard={setCurrentCard}
        setCards={setCards}
      />
    </>
  );
}
