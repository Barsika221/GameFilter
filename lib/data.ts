import { MongoClient, ServerApiVersion } from "mongodb"

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

// MongoDB Atlas connection URI and DB name from environment variables
const username = process.env.MONGODB_USERNAME || ""
const password = process.env.MONGODB_PASSWORD || ""
const cluster = process.env.MONGODB_CLUSTER || "gamefilter.46pel4n.mongodb.net"
const appName = process.env.MONGODB_APP_NAME || "GameFilter"

const uri = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority&appName=${appName}`
const dbName = process.env.MONGODB_DB_NAME || "GameFilter"

let client: MongoClient | null = null

async function getDb() {
  try {
    if (!client) {
      if (!username || !password) {
        throw new Error("MongoDB credentials not found in environment variables")
      }
      
      console.log("Connecting to MongoDB Atlas...")
      client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: false,
          deprecationErrors: true,
        }
      })
      await client.connect()
      // Test the connection
      await client.db("admin").command({ ping: 1 })
      console.log("Connected to MongoDB Atlas successfully")
    }
    return client.db(dbName)
  } catch (error) {
    console.error("MongoDB Atlas connection error:", error)
    client = null
    throw error
  }
}

export async function getGames(): Promise<Game[]> {
  try {
    console.log("Fetching games...")
    const db = await getDb()
    const gamesFromDb = await db.collection<Game>("games").find().toArray()
    console.log(`Found ${gamesFromDb.length} games`)
    
    return gamesFromDb.map(game => ({
      id: game.id,
      title: game.title,
      genre: game.genre,
      platforms: game.platforms,
      releaseYear: game.releaseYear,
      rating: game.rating,
      image: game.image,
      description: game.description
    }))
  } catch (error) {
    console.error("Error in getGames:", error)
    throw error
  }
}

export async function getGenres(): Promise<string[]> {
  try {
    console.log("Fetching genres from games collection...")
    const db = await getDb()
    
    // Get unique genres from the games collection
    const genres = await db.collection("games").distinct("genre")
    console.log(`Found ${genres.length} unique genres:`, genres)
    
    // Filter out any null/undefined values and sort
    return genres.filter(genre => genre && genre.trim() !== "").sort()
  } catch (error) {
    console.error("Error in getGenres:", error)
    throw error
  }
}

export async function getPlatforms(): Promise<string[]> {
  try {
    console.log("Fetching platforms from games collection...")
    const db = await getDb()
    
    // Get all unique platforms from the games collection
    // Since platforms is an array field, we use aggregation to unwind it
    const platformsResult = await db.collection("games").aggregate([
      { $unwind: "$platforms" },
      { $group: { _id: "$platforms" } },
      { $sort: { _id: 1 } }
    ]).toArray()
    
    const platforms = platformsResult
      .map(item => item._id)
      .filter(platform => platform && platform.trim() !== "")
    
    console.log(`Found ${platforms.length} unique platforms:`, platforms)
    return platforms
  } catch (error) {
    console.error("Error in getPlatforms:", error)
    throw error
  }
}