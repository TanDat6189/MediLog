"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Edit, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { CardItem } from "@/types/CardItem";
import { VisitNoteItem } from "@/types/VisitNoteItem";
import { CreateVisitNote } from "@/types/CreateVisitNote";

export default function HospitalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [card, setCard] = useState<CardItem | null>(null);
  const [entries, setEntries] = useState<VisitNoteItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [currentEntry, setCurrentEntry] = useState<VisitNoteItem>({
    id: "",
    hospitalId: "",
    visitDate: "",
    notes: "",
    createdAt: "",
    images: [""],
  });

  // Form state
  const [newEntry, setNewEntry] = useState<{
    visitDate: string;
    notes: string;
    images: string[];
  }>({
    visitDate: format(new Date(), "yyyy-MM-dd"),
    notes: "",
    images: [],
  });

  // File upload state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [editSelectedFiles, setEditSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    fetch(`/api/hospital/${params.id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setCard(data));

    fetch(`/api/visitNote?hospitalId=${params.id}`)
      .then((res) => res.json())
      .then((data) => setEntries(data));

    setLoading(false);
  }, [params.id]);

  // Create new entry
  const handleCreateEntry = async (e) => {
    e.preventDefault();
    const id = `e${Math.random().toString(36).substring(2, 9)}`;
    const newCreateVisitNote: CreateVisitNote = {
      id,
      hospitalId: params.id as string,
      visitDate: newEntry.visitDate,
      notes: newEntry.notes,
    };

    const resVisitNote = await fetch(`/api/visitNote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCreateVisitNote),
    });
    const resultVisitNote = await resVisitNote.json();

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });
    formData.append("noteId", id);

    const resVisitImage = await fetch(`/api/upload`, {
      method: "POST",
      body: formData,
    });
    const resultVisitImage = await resVisitImage.json();

    if (resultVisitNote.data[0] && resultVisitImage.data) {
      const newEntryWithId: VisitNoteItem = {
        ...resultVisitNote.data[0],
        images: resultVisitImage.data,
      };

      setEntries((prev) => [...prev, newEntryWithId]);
    } else {
      const newEntryWithId: VisitNoteItem = {
        ...resultVisitNote.data[0],
        images: null,
      };

      setEntries((prev) => [...prev, newEntryWithId]);
    }

    setNewEntry({
      visitDate: format(new Date(), "yyyy-MM-dd"),
      notes: "",
      images: [],
    });
    setSelectedFiles([]);
    setIsCreateModalOpen(false);
  };

  // Handle form input changes for new entry
  const handleNewEntryChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file selection for new entry
  const handleFileSelect = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files as File[]);
      setSelectedFiles(filesArray);
      // In a real app, you would upload these files to a server
      // For this demo, we'll create object URLs to preview them
      const imageUrls = filesArray.map((file) => URL.createObjectURL(file));
      setNewEntry((prev) => ({
        ...prev,
        images: imageUrls,
      }));
    }
  };

  // Remove image from new entry
  const removeImage = (index) => {
    setNewEntry((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Edit entry
  const handleEditEntry = async (e) => {
    e.preventDefault();

    const dataObj = {
      id: currentEntry.id,
      profileId: currentEntry.hospitalId,
      visitDate: currentEntry.visitDate,
      notes: currentEntry.notes,
    };

    const resVisitNote = await fetch(`/api/visitNote`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataObj),
    });
    const resultVisitNote = await resVisitNote.json();

    const formData = new FormData();
    editSelectedFiles.forEach((file) => {
      formData.append("images", file);
    });
    formData.append("noteId", currentEntry.id);

    const resVisitImage = await fetch(`/api/upload`, {
      method: "POST",
      body: formData,
    });
    const resultVisitImage = await resVisitImage.json();
    console.log(resultVisitImage);

    if (resultVisitImage.data) {
      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === currentEntry.id
            ? {
                ...currentEntry,
                ...resultVisitNote.data[0],
                images: [
                  ...currentEntry?.images?.slice(
                    0,
                    currentEntry.images.length - editSelectedFiles.length
                  ),
                  ...resultVisitImage.data,
                ],
              }
            : entry
        )
      );
    } else {
      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === currentEntry.id
            ? {
                ...currentEntry,
                ...resultVisitNote.data[0],
              }
            : entry
        )
      );
    }

    setIsEditModalOpen(false);
    setEditSelectedFiles([]);
  };

  // Handle form input changes for editing entry
  const handleEditEntryChange = (e) => {
    const { name, value } = e.target;
    setCurrentEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file selection for edit entry
  const handleEditFileSelect = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files as File[]);
      setEditSelectedFiles(filesArray);
      // In a real app, you would upload these files to a server
      // For this demo, we'll create object URLs to preview them
      const imageUrls = filesArray.map((file) => URL.createObjectURL(file));
      setCurrentEntry((prev) => ({
        ...prev,
        images: [...(prev.images ?? []), ...imageUrls],
      }));
    }
  };

  // Remove image from edit entry
  const removeEditImage = async (index) => {
    if (
      currentEntry.images &&
      index < currentEntry.images.length - editSelectedFiles.length
    ) {
      const res = await fetch(`/api/visitImage`, {
        method: "POST",
        body: JSON.stringify(currentEntry.images[index]),
      });
    } else {
      editSelectedFiles.splice(currentEntry.images.length - index - 1, 1);
    }
    setCurrentEntry((prev) => ({
      ...prev,
      images: (prev.images ?? []).filter((_, i) => i !== index),
    }));
  };

  // Delete entry
  const handleDeleteEntry = async (id) => {
    const res = await fetch(`/api/visitNote/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setEntries((prev) => prev.filter((entry) => entry.id !== id));
    }
  };

  // Open edit modal with entry data
  const openEditModal = (entry) => {
    setCurrentEntry(entry);
    setIsEditModalOpen(true);
  };

  // Open image viewer
  const openImageViewer = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsImageViewerOpen(true);
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!card) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold">Card not found</h2>
        <Button variant="link" onClick={() => router.push("/dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Cards</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{card.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{card.name}</h1>
          <p className="text-muted-foreground">{card.address}</p>
          <p className="mt-1 font-medium">Hotline: {card.hotline}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/dashboard/hospital")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button size="sm" onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create a new visit note
          </Button>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Entries List */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Visit note</h2>

        {entries.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <p className="mb-4 text-center text-muted-foreground">
                No entries found for this card.
              </p>
              <Button onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create First Entry
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <Card key={entry.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <CardTitle className="text-base font-medium">
                      {format(new Date(entry.visitDate), "MMMM dd, yyyy")}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground">{entry.notes}</p>

                  {entry.images && entry.images.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {entry.images.map((image, index) => (
                        <div
                          key={index}
                          className="relative h-20 w-20 cursor-pointer overflow-hidden rounded-md border"
                          onClick={() => openImageViewer(image)}
                        >
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Entry image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end gap-2 border-t bg-muted/50 px-6 py-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(entry)}
                  >
                    <Edit className="mr-2 h-3 w-3" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="mr-2 h-3 w-3" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the entry from{" "}
                          {format(new Date(entry.visitDate), "MMMM d, yyyy")}.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteEntry(entry.id)}
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
        )}
      </div>

      {/* Create Entry Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <VisuallyHidden>
          <DialogTitle>Thông báo</DialogTitle>
        </VisuallyHidden>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Create New Entry</DialogTitle>
            <DialogDescription>
              Add a new entry for {card.name}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateEntry}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="visitDate">Visit Date</Label>
                <Input
                  id="visitDate"
                  name="visitDate"
                  type="date"
                  value={newEntry.visitDate}
                  onChange={handleNewEntryChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={newEntry.notes}
                  onChange={handleNewEntryChange}
                  rows={4}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="images">Images</Label>
                <Input
                  id="images"
                  name="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  className="cursor-pointer"
                />

                {newEntry.images.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {newEntry.images.map((image, index) => (
                      <div
                        key={index}
                        className="relative h-20 w-20 overflow-hidden rounded-md border"
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          className="absolute right-0 top-0 rounded-bl-md bg-black/70 p-1 text-white"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Entry</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Entry Modal */}
      {currentEntry && (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <VisuallyHidden>
            <DialogTitle>Thông báo</DialogTitle>
          </VisuallyHidden>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Edit Entry</DialogTitle>
              <DialogDescription>Update the entry details.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditEntry}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-visitDate">Visit Date</Label>
                  <Input
                    id="edit-visitDate"
                    name="visitDate"
                    type="date"
                    value={currentEntry.visitDate}
                    onChange={handleEditEntryChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-notes">Notes</Label>
                  <Textarea
                    id="edit-notes"
                    name="notes"
                    value={currentEntry.notes}
                    onChange={handleEditEntryChange}
                    rows={4}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-images">Add More Images</Label>
                  <Input
                    id="edit-images"
                    name="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleEditFileSelect}
                    className="cursor-pointer"
                  />

                  {currentEntry.images && currentEntry.images.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {currentEntry.images.map((image, index) => (
                        <div
                          key={index}
                          className="relative h-20 w-20 overflow-hidden rounded-md border"
                        >
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Preview ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            className="absolute right-0 top-0 rounded-bl-md bg-black/70 p-1 text-white"
                            onClick={() => removeEditImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Image Viewer Modal */}
      <Dialog open={isImageViewerOpen} onOpenChange={setIsImageViewerOpen}>
        <DialogContent className="max-w-4xl p-0">
          <VisuallyHidden>
            <DialogTitle>Thông báo</DialogTitle>
          </VisuallyHidden>
          <div className="relative flex h-[80vh] w-full items-center justify-center bg-black">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 z-10 text-white hover:bg-white/20"
              onClick={() => setIsImageViewerOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
            <div className="relative h-full w-full">
              {selectedImage && (
                <Image
                  src={selectedImage || "/placeholder.svg"}
                  alt="Full size image"
                  fill
                  className="object-contain"
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
