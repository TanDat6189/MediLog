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

type CardItem = {
  id: string;
  name: string;
  description: string;
  hotline: string;
};

type CardListProps = {
  filteredCards: CardItem[];
  setCards: React.Dispatch<React.SetStateAction<CardItem[]>>;
};

export default function CardList({ filteredCards }: CardListProps) {
  const router = useRouter();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState(initialCards[0]);

  // Open edit modal with card data
  const openEditModal = (card) => {
    setCurrentCard(card);
    setIsEditModalOpen(true);
  };

  // Delete card
  const handleDeleteCard = (id) => {
    // setCards((prev) => prev.filter((card) => card.id !== id));
  };

  // Navigate to card detail page
  const navigateToCardDetail = (id) => {
    router.push(`/dashboard/hospital/${id}`);
  };

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCards.map((card) => (
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
                  {card.description}
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
      />
    </>
  );
}
