import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ActionBarProps = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ActionBar({
  searchQuery,
  setSearchQuery,
  setIsCreateModalOpen,
}: ActionBarProps) {
  return (
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
  );
}
