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
  // Assumes your collection is named "games"
  return db.collection<Game>("games").find().toArray()
}

export async function getGenres(): Promise<string[]> {
  const db = await getDb()
  // Assumes your collection is named "genres" and each doc has a "name" field
  const genres = await db.collection<{ name: string }>("genres").find().toArray()
  return genres.map(g => g.name)
}

export async function getPlatforms(): Promise<string[]> {
  const db = await getDb()
  // Assumes your collection is named "platforms" and each doc has a "name" field
  const platforms = await db.collection<{ name: string }>("platforms").find().toArray()
  return platforms.map(p => p.name)
}
