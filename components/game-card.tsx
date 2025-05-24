import Image from "next/image"
import { Star } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Game } from "@/lib/data"

interface GameCardProps {
  game: Game
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={game.image || "/placeholder.svg"}
          alt={game.title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg line-clamp-1">{game.title}</h3>
          <Badge variant="outline">{game.genre}</Badge>
        </div>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < Math.floor(game.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300 dark:text-gray-600"}`}
            />
          ))}
          <span className="ml-1 text-sm text-muted-foreground">{game.rating.toFixed(1)}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {game.platforms.map((platform) => (
            <Badge key={platform} variant="secondary" className="text-xs">
              {platform}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{game.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end items-center">
        <div className="text-sm text-muted-foreground">{game.releaseYear}</div>
      </CardFooter>
    </Card>
  )
}
