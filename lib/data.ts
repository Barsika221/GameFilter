import { MongoClient } from "mongodb"

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

// MongoDB connection URI and DB name
const uri = "mongodb://127.0.0.1:27017"
const dbName = "GameFilter"

let client: MongoClient | null = null

async function getDb() {
  if (!client) {
    client = new MongoClient(uri)
    await client.connect()
  }
  return client.db(dbName)
}

export async function getGames(): Promise<Game[]> {
  const db = await getDb()
  const gamesFromDb = await db.collection<Game>("games").find().toArray()
  
  // Convert MongoDB documents to plain serializable objects
  return gamesFromDb.map(game => ({
    id: game.id,
    title: game.title,
    genre: game.genre,
    platforms: game.platforms,
    releaseYear: game.releaseYear,
    rating: game.rating,
    image: game.image,
    description: game.description
    // Explicitly omit _id field
  }))
}

export async function getGenres(): Promise<string[]> {
  const db = await getDb()
  const genres = await db.collection<{ name: string }>("genres").find().toArray()
  return genres.map(g => g.name)
}

export async function getPlatforms(): Promise<string[]> {
  const db = await getDb()
  const platforms = await db.collection<{ name: string }>("platforms").find().toArray()
  return platforms.map(p => p.name)
}

// API Route Handlers
export async function GET_genres() {
  try {
    const genres = await getGenres()
    return { genres }
  } catch (error) {
    return { error: "Failed to fetch genres" }
  }
}

export async function GET_platforms() {
  try {
    const platforms = await getPlatforms()
    return { platforms }
  } catch (error) {
    return { error: "Failed to fetch platforms" }
  }
}
