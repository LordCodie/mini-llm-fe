// {
//     sessionId: string;
//     title: string;
//     createdAt: string;
//     updatedAt: string;
//     prompt_data: [
//       {
//         id: string;
//         role: user;
//         content: string;
//         timestamp: string;
//         isGenerating?: undefined;
//     },
//     {
//         id: string;
//         role: assistant;
//         content: string;
//         timestamp: string;
//         isGenerating?: undefined;
//     }
//   ]
// }

// lib/storage.ts
import { nanoid } from "nanoid"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string | null
  timestamp: string
}

export interface ChatSession {
  sessionId: string
  title: string | null
  createdAt: string
  updatedAt: string
  prompt_data: Message[]
}

/**
 * Saves a message into localStorage.
 * Creates a new session if activeSessionId is null/undefined.
 * Appends to an existing session if activeSessionId is provided.
 */
export const saveStorageData = (
  userRole: "user" | "assistant",
  content: string | null,
  activeSessionId?: string | null
): string => {
  const timestamp = new Date().toISOString()

  const newMessage: Message = {
    id: `msg_${nanoid()}`,
    role: userRole,
    content,
    timestamp,
  }

  // 1. Try to load existing session if an ID was passed
  const key = activeSessionId ? `chat_${activeSessionId}` : null
  const existingData = key ? localStorage.getItem(key) : null

  if (existingData && key) {
    // ------------ [Carry on in SAME Session] ------------
    const session: ChatSession = JSON.parse(existingData)
    session.prompt_data.push(newMessage)
    session.updatedAt = timestamp

    localStorage.setItem(key, JSON.stringify(session))
    return session.sessionId
  } else {
    // ------------ [Create NEW Chat Session] ------------
    const newSessionId = nanoid()
    const newKey = `chat_${newSessionId}`
    const title =
      content && content.length > 25
        ? `${content.substring(0, 25)}...`
        : content

    const newSession: ChatSession = {
      sessionId: newSessionId,
      title,
      createdAt: timestamp,
      updatedAt: timestamp,
      prompt_data: [newMessage],
    }

    localStorage.setItem(newKey, JSON.stringify(newSession))
    return newSession.sessionId
  }
}

/**
 * Retrieves and parses a ChatSession object from localStorage.
 * @param {string} key - The localStorage key (e.g., "chat_v1StGXR8" or just "v1StGXR8").
 * @returns  The parsed ChatSession object, or null if not found/invalid.
 */
export const getStorageData = (key: string) => {
  if (typeof window === "undefined") return null // Guard against SSR environments

  // Normalize key: automatically add 'chat_' prefix if omitted
  const storageKey = key.startsWith("chat_") ? key : `chat_${key}`

  const data = localStorage.getItem(storageKey)

  if (!data) return null

  try {
    const parsedData = JSON.parse(data)
    console.log(`Retrieved ChatSession from localStorage for key "${storageKey}":`, parsedData)
    return parsedData
  } catch (error) {
    console.error(
      `Error parsing ChatSession from localStorage for key "${storageKey}":`,
      error
    )
    return null
  }
}
