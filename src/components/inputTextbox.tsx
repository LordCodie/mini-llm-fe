"use client"

import TextareaAutosize from "react-textarea-autosize"

import { useState, type KeyboardEvent } from "react"

import { LoadingButton } from "./loadingButton"
import { ChatArea } from "./chatArea"

import { saveStorageData, getStorageData } from "@/store/localstorage"
import { llmresponse } from "@/services/llm"

import type { ChatSession, Message } from "@/store/localstorage"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group"

// Custom props for InputTextBox component
type InputTextBoxProps = {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  currentId: string
  messages: Message[]
  setMessages: (messages: Message[]) => void
  setCurrentId: (id: string) => void
  open: boolean
  openFunc: (open: boolean) => void
  onMessageSent: () => void
}

export function InputTextBox({
  isLoading,
  setIsLoading,
  currentId, // This comes from ChatHistory via App.tsx
  messages, // This comes from ChatHistory via App.tsx
  setCurrentId, // This comes from ChatHistory via App.tsx
  open,
  openFunc,
  onMessageSent,
}: InputTextBoxProps) {
  const [question, setQuestion] = useState("")

  {
    /* Handle Enter key press to trigger runLLM */
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      runLLM()
    }
  }

  {
    /* ----- Simulate running the LLM (replace with actual logic) ----------*/
  }
  const runLLM = async () => {
    if (question.trim() !== "") {
      setIsLoading(true)
      const promptText = question

      const updatedSessionId = saveStorageData("user", promptText, currentId || null) // session key is returned here
      onMessageSent()

      if (!currentId) setCurrentId(updatedSessionId) // Update the currentId if it's a new session

      const sessionData: ChatSession = getStorageData(`chat_${currentId}`)

      // Prepare the conversation history for the LLM response
      const conversationHistory = sessionData?.prompt_data
        .filter((msg) => msg.content !== null)
        .map((msg) => ({
          role: msg.role as "user" | "assistant",
          content: msg.content as string,
        }))

      try {
        const aiResponse = await llmresponse(conversationHistory || [])
        saveStorageData("assistant", aiResponse, currentId) // Save the response to localStorage
        onMessageSent() // Notify parent to refresh messages
      } catch (error) {
        console.error("Error generating LLM response:", error)
        saveStorageData(
          "assistant",
          "An error occurred while generating the response.",
          currentId
        )
      } finally {
        setIsLoading(false)
        setQuestion("") // Clear the input field after sending the message
      }
    }
  }

  {
    /* ----- Simulate running the LLM (replace with actual logic) ----------*/
  }

  return (
    <div className="grid w-full gap-6 px-24">
      <ChatArea
        id={currentId}
        open={open}
        openFunc={openFunc}
        messages={messages}
      />

      <InputGroup>
        {/* TextareaAutosize component for the input field */}
        <TextareaAutosize
          data-slot="input-group-control"
          className="flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
          placeholder="Write your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />

        {/* InputGroupAddon for the button */}
        <InputGroupAddon align="block-end">
          {isLoading ? (
            <LoadingButton />
          ) : (
            <InputGroupButton
              className="ml-auto"
              size="sm"
              variant="default"
              onClick={runLLM}
              disabled={!question}
            >
              Ask Codie 🗣️
            </InputGroupButton>
          )}
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
