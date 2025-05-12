"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

import BreadcrumbNav from "@/components/hospital/BreadcrumbNav";
import Title from "@/components/hospital/Title";

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
  const [cards, setCards] = useState(initialCards);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState(initialCards);
  const [newCard, setNewCard] = useState({
    name: "",
    description: "",
    hotline: "",
  });

  const router = useRouter();

  // Filter cards based on search query
  const filteredCards = cards.filter(
    (card) =>
      card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.hotline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle form input changes for new card
  const handleNewCardChange = (e) => {
    // const { name, value } = e.target;
    // setNewCard((prev) => ({
    //   ...prev,
    //   [name]: value,
    // }));
  };

  // Handle form input changes for editing card
  const handleEditCardChange = (e) => {
    // const { name, value } = e.target;
    // setCurrentCard((prev) => ({
    //   ...prev,
    //   [name]: value,
    // }));
  };

  // Create new card
  const handleCreateCard = (e) => {
    // e.preventDefault();
    // const id = Math.random().toString(36).substring(2, 9);
    // setCards((prev) => [...prev, { id, ...newCard }]);
    // setNewCard({ name: "", description: "", hotline: "" });
    // setIsCreateModalOpen(false);
  };

  // Edit card
  const handleEditCard = (e) => {
    // e.preventDefault();
    // setCards((prev) =>
    //   prev.map((card) => (card.id === currentCard.id ? currentCard : card))
    // );
    // setIsEditModalOpen(false);
  };

  // Delete card
  const handleDeleteCard = (id) => {
    // setCards((prev) => prev.filter((card) => card.id !== id));
  };

  // Open edit modal with card data
  const openEditModal = (card) => {
    setCurrentCard(card);
    setIsEditModalOpen(true);
  };

  // Navigate to card detail page
  const navigateToCardDetail = (id) => {
    router.push(`/dashboard/hospital/${1}`);
  };

  return (
    <div className="flex-1 p-8">
      {/* Breadcrumb Navigation */}
      <BreadcrumbNav />

      {/* Page Title */}
      <Title />

      {/* Search and Action Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search cards..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="gap-2">Search</Button>
        <Button className="gap-2" onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4" />
          Create a hospital card
        </Button>
      </div>

      <Separator className="my-6" />

      {/* Cards Grid */}
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

      {/* Create Card Modal */}
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

      {/* Edit Card Modal */}
      {currentCard && (
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
      )}
    </div>
  );
}
