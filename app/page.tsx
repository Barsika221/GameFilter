"use client";

import type React from "react";

import { useState, useCallback } from "react";
import { Filter, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { type Game, games } from "@/lib/data";

export default function GamesPage() {
  const [filteredGames, setFilteredGames] = useState<Game[]>(games);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredGames(games);
      return;
    }

    const filtered = games.filter((game) =>
      game.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredGames(filtered);
  };

  const applyFilters = useCallback(
    (
      selectedGenres: string[],
      selectedPlatforms: string[],
      yearRange: [number, number],
      ratingRange: [number, number]
    ) => {
      let filtered = [...games];
      if (searchQuery.trim()) {
        filtered = filtered.filter((game) =>
          game.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      if (selectedGenres.length > 0) {
        filtered = filtered.filter((game) =>
          selectedGenres.includes(game.genre)
        );
      }
      if (selectedPlatforms.length > 0) {
        filtered = filtered.filter((game) =>
          game.platforms.some((platform) =>
            selectedPlatforms.includes(platform)
          )
        );
      }
      filtered = filtered.filter(
        (game) =>
          game.releaseYear >= yearRange[0] && game.releaseYear <= yearRange[1]
      );
      filtered = filtered.filter(
        (game) => game.rating >= ratingRange[0] && game.rating <= ratingRange[1]
      );

      setFilteredGames(filtered);
    },
    [searchQuery]
  );

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="border-b p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Game Library</h1>
            <div className="flex items-center gap-2"></div>
          </div>

          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar*/}

        {/* Game Cards - Scrollable */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="container mx-auto">
            {filteredGames.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">No games found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGames.map((game) => null)}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
