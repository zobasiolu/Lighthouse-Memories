import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, Search, Calendar, Star, Filter } from "lucide-react";

interface Memory {
  id: string;
  text: string;
  date: string;
  sentiment: "positive" | "neutral" | "negative";
  theme: string;
  isFavorite: boolean;
}

const MemoryJournal = ({ memories = defaultMemories }) => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");

  // Filter and sort memories based on current settings
  const filteredMemories = memories
    .filter((memory) => {
      if (filter === "favorites") return memory.isFavorite;
      if (filter === "positive") return memory.sentiment === "positive";
      if (filter === "neutral") return memory.sentiment === "neutral";
      if (filter === "negative") return memory.sentiment === "negative";
      return true; // 'all' filter
    })
    .filter(
      (memory) =>
        memory.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        memory.theme.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "theme") {
        return a.theme.localeCompare(b.theme);
      }
      return 0;
    });

  const toggleFavorite = (id: string) => {
    // This would be implemented with actual state management in a real app
    console.log(`Toggle favorite for memory ${id}`);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-slate-900 text-white border-slate-700">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Star className="h-6 w-6 text-yellow-400" />
          Memory Journal
        </CardTitle>
        <CardDescription className="text-slate-400">
          Your collection of decoded lighthouse memories
        </CardDescription>
      </CardHeader>

      <div className="px-6 pb-2 flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search memories..."
            className="pl-8 bg-slate-800 border-slate-700 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 items-center">
          <Filter className="h-4 w-4 text-slate-400" />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px] bg-slate-800 border-slate-700 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-white">
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="theme">Theme</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <CardContent>
        <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
          <TabsList className="grid grid-cols-4 mb-4 bg-slate-800">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="positive">Positive</TabsTrigger>
            <TabsTrigger value="negative">Negative</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <ScrollArea className="h-[350px] pr-4">
              {filteredMemories.length > 0 ? (
                <div className="space-y-4">
                  {filteredMemories.map((memory) => (
                    <MemoryCard
                      key={memory.id}
                      memory={memory}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <p>No memories found</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          {/* Other tab contents share the same structure */}
          <TabsContent value="favorites" className="mt-0">
            <ScrollArea className="h-[350px] pr-4">
              {filteredMemories.length > 0 ? (
                <div className="space-y-4">
                  {filteredMemories.map((memory) => (
                    <MemoryCard
                      key={memory.id}
                      memory={memory}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <p>No favorite memories yet</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="positive" className="mt-0">
            <ScrollArea className="h-[350px] pr-4">
              {filteredMemories.length > 0 ? (
                <div className="space-y-4">
                  {filteredMemories.map((memory) => (
                    <MemoryCard
                      key={memory.id}
                      memory={memory}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <p>No positive memories found</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="negative" className="mt-0">
            <ScrollArea className="h-[350px] pr-4">
              {filteredMemories.length > 0 ? (
                <div className="space-y-4">
                  {filteredMemories.map((memory) => (
                    <MemoryCard
                      key={memory.id}
                      memory={memory}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <p>No negative memories found</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between border-t border-slate-700 pt-4">
        <div className="text-sm text-slate-400">
          <span>{filteredMemories.length} memories</span>
        </div>
        <Button
          variant="outline"
          className="text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-white"
        >
          Export Journal
        </Button>
      </CardFooter>
    </Card>
  );
};

interface MemoryCardProps {
  memory: Memory;
  onToggleFavorite: (id: string) => void;
}

const MemoryCard = ({ memory, onToggleFavorite }: MemoryCardProps) => {
  const sentimentColor = {
    positive: "bg-green-500",
    neutral: "bg-blue-500",
    negative: "bg-red-500",
  }[memory.sentiment];

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge className={`${sentimentColor} hover:${sentimentColor}`}>
              {memory.sentiment}
            </Badge>
            <Badge
              variant="outline"
              className="ml-2 border-slate-600 text-slate-300"
            >
              {memory.theme}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`${memory.isFavorite ? "text-red-500" : "text-slate-400"} hover:text-red-500 hover:bg-transparent`}
            onClick={() => onToggleFavorite(memory.id)}
          >
            <Heart
              className={`h-5 w-5 ${memory.isFavorite ? "fill-current" : ""}`}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-white">{memory.text}</p>
      </CardContent>
      <CardFooter className="pt-0 text-xs text-slate-400 flex items-center">
        <Calendar className="h-3 w-3 mr-1" />
        <span>Decoded on {memory.date}</span>
      </CardFooter>
    </Card>
  );
};

// Default memories for demonstration
const defaultMemories: Memory[] = [
  {
    id: "1",
    text: "I still remember the day we sailed across that turquoise bay, the wind carrying whispers of a life I once knew.",
    date: "May 15, 2023",
    sentiment: "positive",
    theme: "Nostalgia",
    isFavorite: true,
  },
  {
    id: "2",
    text: "The lighthouse keeper told me stories of shipwrecks and lost souls. I wonder if my own story will someday be among them.",
    date: "June 3, 2023",
    sentiment: "negative",
    theme: "Reflection",
    isFavorite: false,
  },
  {
    id: "3",
    text: "Every night I watch the stars from my window, mapping constellations that guide me through memories both bitter and sweet.",
    date: "June 10, 2023",
    sentiment: "neutral",
    theme: "Contemplation",
    isFavorite: true,
  },
  {
    id: "4",
    text: "The fog rolled in this morning, obscuring everything but the sound of distant foghorns. Sometimes not seeing is a blessing.",
    date: "July 22, 2023",
    sentiment: "negative",
    theme: "Solitude",
    isFavorite: false,
  },
  {
    id: "5",
    text: "Found a message in a bottle today. Someone else's hopes cast into the vast ocean. I added mine and sent it back to sea.",
    date: "August 5, 2023",
    sentiment: "positive",
    theme: "Hope",
    isFavorite: true,
  },
];

export default MemoryJournal;
