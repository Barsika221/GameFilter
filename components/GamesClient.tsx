"use client";

import { useState, useCallback } from "react";
import { Filter, Search } from "lucide-react";
import GameCard from "@/components/game-card";
import FilterSidebar from "@/components/filter-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type Game } from "@/lib/data";

export default function GamesClient({ games }: { games: Game[] }) {
  const [filteredGames, setFilteredGames] = useState<Game[]>(games);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    genres: [] as string[],
    platforms: [] as string[],
    yearRange: [1990, 2025] as [number, number],
    ratingRange: [0, 5] as [number, number],
  });

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchQuery(query);
      applyFilters(query, activeFilters);
    },
    [activeFilters]
  );

  const applyFilters = useCallback(
    (query: string, filters: typeof activeFilters) => {
      let filtered = [...games];

      // Apply search filter
      if (query.trim()) {
        filtered = filtered.filter((game) =>
          game.title.toLowerCase().includes(query.toLowerCase())
        );
      }

      // Apply genre filter
      if (filters.genres.length > 0) {
        filtered = filtered.filter((game) => filters.genres.includes(game.genre));
      }

      // Apply platform filter
      if (filters.platforms.length > 0) {
        filtered = filtered.filter((game) =>
          game.platforms.some((platform) => filters.platforms.includes(platform))
        );
      }

      // Apply year range filter
      filtered = filtered.filter(
        (game) =>
          game.releaseYear >= filters.yearRange[0] &&
          game.releaseYear <= filters.yearRange[1]
      );

      // Apply rating filter
      filtered = filtered.filter(
        (game) =>
          game.rating >= filters.ratingRange[0] &&
          game.rating <= filters.ratingRange[1]
      );

      setFilteredGames(filtered);
    },
    [games]
  );

  const handleFiltersChange = useCallback(
    (filters: typeof activeFilters) => {
      setActiveFilters(filters);
      applyFilters(searchQuery, filters);
    },
    [searchQuery, applyFilters]
  );

  return (
    <div className="flex h-full">
      {/* Filter Sidebar */}
      <FilterSidebar
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onFiltersChange={handleFiltersChange}
      />

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Search and Filter Toggle Button */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search games..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <h3 className="text-lg font-medium">No games found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters
              </p>
            </div>
          ) : (
            filteredGames.map((game) => <GameCard key={game.id} game={game} />)
          )}
        </div>
      </div>
    </div>
  );
}