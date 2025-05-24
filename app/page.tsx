import type React from "react";

import { useState, useCallback } from "react";
import { Search } from "lucide-react";
import GameCard from "@/components/game-card";
import { ThemeToggle } from "@/components/theme-toggle";
import { type Game, getGames } from "@/lib/data";
import GamesClient from "@/components/GamesClient";

export default async function GamesPage() {
  // Fetch games from the database on the server
  const games: Game[] = await getGames();

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
            <Input
              placeholder="Search games..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4">
          <div className="container mx-auto">
            {games.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">No games found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {games.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
