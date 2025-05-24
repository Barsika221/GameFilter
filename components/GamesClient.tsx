"use client";
import { useState, useCallback } from "react";
import GameCard from "@/components/game-card";
import { type Game } from "@/lib/data";

export default function GamesClient({ games }: { games: Game[] }) {
  const [filteredGames, setFilteredGames] = useState<Game[]>(games);
  const [searchQuery, setSearchQuery] = useState("");

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

  // ...add filter logic as needed...

  return (
    <div>
      <input
        type="text"
        placeholder="Search games..."
        value={searchQuery}
        onChange={handleSearch}
        className="mb-4 p-2 border rounded"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}