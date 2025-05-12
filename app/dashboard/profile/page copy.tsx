"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProfilePage() {
  // Personal information state
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "John Doe",
    birthYear: 1985,
    hometown: "San Francisco, CA",
    height: 178,
    weight: 75,
    bloodType: "O",
    medicalHistory:
      "No significant medical history. Regular check-ups show normal health parameters. Allergic to peanuts.",
  });

  // Edit modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ ...personalInfo });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle select input changes
  const handleSelectChange = (name, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save form data
  const handleSave = (e) => {
    e.preventDefault();
    setPersonalInfo(editFormData);
    setIsEditModalOpen(false);
  };

  // Open edit modal
  const openEditModal = () => {
    setEditFormData({ ...personalInfo });
    setIsEditModalOpen(true);
  };

  return (
    <div className="flex-1 space-y-6 p-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome to your profile
        </h2>
        <p className="text-muted-foreground">
          Here's an overview of your account activity and information.
        </p>
      </div>
      <Separator />

      {/* Personal Information Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Personal Information</h3>
          <Button onClick={openEditModal}>Edit Information</Button>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Medical Profile</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                Full Name
              </h4>
              <p className="font-medium">{personalInfo.fullName}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                Birth Year
              </h4>
              <p className="font-medium">{personalInfo.birthYear}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                Hometown
              </h4>
              <p className="font-medium">{personalInfo.hometown}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                Height
              </h4>
              <p className="font-medium">{personalInfo.height} cm</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                Weight
              </h4>
              <p className="font-medium">{personalInfo.weight} kg</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                Blood Type
              </h4>
              <p className="font-medium">{personalInfo.bloodType}</p>
            </div>

            <div className="col-span-full space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                Medical History
              </h4>
              <p className="whitespace-pre-line text-sm">
                {personalInfo.medicalHistory}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Information Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Personal Information</DialogTitle>
            <DialogDescription>
              Update your personal and medical information below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={editFormData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="birthYear">Birth Year</Label>
                <Input
                  id="birthYear"
                  name="birthYear"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={editFormData.birthYear}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="hometown">Hometown</Label>
                <Input
                  id="hometown"
                  name="hometown"
                  value={editFormData.hometown}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    min="50"
                    max="250"
                    value={editFormData.height}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    min="20"
                    max="300"
                    value={editFormData.weight}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bloodType">Blood Type</Label>
                <Select
                  value={editFormData.bloodType}
                  onValueChange={(value) =>
                    handleSelectChange("bloodType", value)
                  }
                  required
                >
                  <SelectTrigger id="bloodType">
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="AB">AB</SelectItem>
                    <SelectItem value="O">O</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="medicalHistory">Medical History</Label>
                <Textarea
                  id="medicalHistory"
                  name="medicalHistory"
                  rows={4}
                  value={editFormData.medicalHistory}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
