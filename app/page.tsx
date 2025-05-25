import type React from "react";

import { useState, useCallback } from "react";
import { Search } from "lucide-react";
import GameCard from "@/components/game-card";
import { ThemeToggle } from "@/components/theme-toggle";
import { type Game, getGames } from "@/lib/data";
import GamesClient from "@/components/GamesClient";
import { Input } from "@/components/ui/input";

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
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4">
          <div className="container mx-auto">
            {/* Pass games to the client component to handle search/filtering */}
            <GamesClient games={games} />
          </div>
        </main>
      </div>
    </div>
  );
}