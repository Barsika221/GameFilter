export interface Game {
  id: number
  title: string
  genre: string
  platforms: string[]
  releaseYear: number
  rating: number
  image: string
  description: string
}

export const genres = [
  "Action",
  "Adventure",
  "RPG",
  "Strategy",
  "Simulation",
  "Sports",
  "Racing",
  "Puzzle",
  "Horror",
  "Shooter",
]

export const platforms = [
  "PC",
  "PlayStation 5",
  "PlayStation 4",
  "Xbox Series X",
  "Xbox One",
  "Nintendo Switch",
  "Mobile",
]

export const games: Game[] = [
  {
    id: 1,
    title: "Elden Ring",
    genre: "RPG",
    platforms: ["PC", "PlayStation 5", "PlayStation 4", "Xbox Series X", "Xbox One"],
    releaseYear: 2022,
    rating: 4.8,
    image: "/placeholder.svg?height=300&width=500",
    description: "An action RPG developed by FromSoftware and published by Bandai Namco Entertainment.",
  },
  {
    id: 2,
    title: "God of War Ragnarök",
    genre: "Action",
    platforms: ["PlayStation 5", "PlayStation 4"],
    releaseYear: 2022,
    rating: 4.9,
    image: "/placeholder.svg?height=300&width=500",
    description:
      "An action-adventure game developed by Santa Monica Studio and published by Sony Interactive Entertainment.",
  },
  {
    id: 3,
    title: "Horizon Forbidden West",
    genre: "Action",
    platforms: ["PlayStation 5", "PlayStation 4"],
    releaseYear: 2022,
    rating: 4.7,
    image: "/placeholder.svg?height=300&width=500",
    description:
      "An action role-playing game developed by Guerrilla Games and published by Sony Interactive Entertainment.",
  },
  {
    id: 4,
    title: "The Legend of Zelda: Tears of the Kingdom",
    genre: "Adventure",
    platforms: ["Nintendo Switch"],
    releaseYear: 2023,
    rating: 4.9,
    image: "/placeholder.svg?height=300&width=500",
    description: "An action-adventure game developed and published by Nintendo for the Nintendo Switch.",
  },
  {
    id: 5,
    title: "Cyberpunk 2077",
    genre: "RPG",
    platforms: ["PC", "PlayStation 5", "PlayStation 4", "Xbox Series X", "Xbox One"],
    releaseYear: 2020,
    rating: 3.8,
    image: "/placeholder.svg?height=300&width=500",
    description:
      "An open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.",
  },
  {
    id: 6,
    title: "FIFA 23",
    genre: "Sports",
    platforms: ["PC", "PlayStation 5", "PlayStation 4", "Xbox Series X", "Xbox One", "Nintendo Switch"],
    releaseYear: 2022,
    rating: 4.2,
    image: "/placeholder.svg?height=300&width=500",
    description: "A football simulation video game published by Electronic Arts.",
  },
  {
    id: 7,
    title: "Minecraft",
    genre: "Simulation",
    platforms: ["PC", "PlayStation 4", "Xbox One", "Nintendo Switch", "Mobile"],
    releaseYear: 2011,
    rating: 4.8,
    image: "/placeholder.svg?height=300&width=500",
    description:
      "A sandbox video game developed by Mojang Studios where players can build and explore virtual worlds made up of blocks.",
  },
  {
    id: 8,
    title: "Call of Duty: Modern Warfare II",
    genre: "Shooter",
    platforms: ["PC", "PlayStation 5", "PlayStation 4", "Xbox Series X", "Xbox One"],
    releaseYear: 2022,
    rating: 4.3,
    image: "/placeholder.svg?height=300&width=500",
    description: "A first-person shooter game developed by Infinity Ward and published by Activision.",
  },
  {
    id: 9,
    title: "Stardew Valley",
    genre: "Simulation",
    platforms: ["PC", "PlayStation 4", "Xbox One", "Nintendo Switch", "Mobile"],
    releaseYear: 2016,
    rating: 4.8,
    image: "/placeholder.svg?height=300&width=500",
    description:
      "A farming simulation game developed by Eric Barone. Players take the role of a character who inherits their grandfather's dilapidated farm.",
  },
  {
    id: 10,
    title: "Resident Evil 4 Remake",
    genre: "Horror",
    platforms: ["PC", "PlayStation 5", "PlayStation 4", "Xbox Series X"],
    releaseYear: 2023,
    rating: 4.7,
    image: "/placeholder.svg?height=300&width=500",
    description: "A remake of the 2005 game Resident Evil 4, developed and published by Capcom.",
  },
  {
    id: 11,
    title: "Forza Horizon 5",
    genre: "Racing",
    platforms: ["PC", "Xbox Series X", "Xbox One"],
    releaseYear: 2021,
    rating: 4.6,
    image: "/placeholder.svg?height=300&width=500",
    description: "A racing video game developed by Playground Games and published by Xbox Game Studios.",
  },
  {
    id: 12,
    title: "Among Us",
    genre: "Strategy",
    platforms: ["PC", "PlayStation 5", "PlayStation 4", "Xbox Series X", "Xbox One", "Nintendo Switch", "Mobile"],
    releaseYear: 2018,
    rating: 4.5,
    image: "/placeholder.svg?height=300&width=500",
    description: "An online multiplayer social deduction game developed and published by Innersloth.",
  },
  {
    id: 13,
    title: "Hades",
    genre: "Action",
    platforms: ["PC", "PlayStation 5", "PlayStation 4", "Xbox Series X", "Xbox One", "Nintendo Switch"],
    releaseYear: 2020,
    rating: 4.9,
    image: "/placeholder.svg?height=300&width=500",
    description: "A roguelike action dungeon crawler developed and published by Supergiant Games.",
  },
  {
    id: 14,
    title: "Tetris Effect",
    genre: "Puzzle",
    platforms: ["PC", "PlayStation 5", "PlayStation 4", "Xbox Series X", "Xbox One", "Nintendo Switch"],
    releaseYear: 2018,
    rating: 4.7,
    image: "/placeholder.svg?height=300&width=500",
    description: "A puzzle game developed by Monstars and Resonair and published by Enhance Games.",
  },
  {
    id: 15,
    title: "Civilization VI",
    genre: "Strategy",
    platforms: ["PC", "PlayStation 4", "Xbox One", "Nintendo Switch", "Mobile"],
    releaseYear: 2016,
    rating: 4.6,
    image: "/placeholder.svg?height=300&width=500",
    description: "A turn-based strategy 4X video game developed by Firaxis Games and published by 2K Games.",
  },
]
