"use client"

import { useState, useEffect } from "react"
// import { mockChatHistory } from "@/db/mockdata"

import { FileTextIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

function ChatItem({
  titleText,
  id,
  openfunc,
}: {
  titleText: string
  id: string
  openfunc: () => void
}) {
  return (
    <CommandItem
      onSelect={() => {
        console.log(`You selected session id: ${id}`)
        openfunc()
      }}
    >
      <FileTextIcon />
      <span>{titleText}</span>
    </CommandItem>
  )
}

const parsedChats = Object.keys(localStorage)
    .filter((key) => key.startsWith("chat_"))
    .map((key) => {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    })
    .filter(Boolean); // removes any null values if parsing failed

export function ChatHistory({
  idSessionFunc,
  open,
  openFunc,
}: {
  idSessionFunc: (id: string) => void
  open: boolean
  openFunc: (open: boolean) => void
}) {
  
  const [chatData, setChatData] = useState([] as any[])

  useEffect(() => {
    setChatData(parsedChats)
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => openFunc(true)} variant="outline" className="w-fit">
        Chat History
      </Button>
      <CommandDialog open={open} onOpenChange={openFunc}>
        <Command>
          <CommandInput placeholder="Type a past chat or search..." />
          <CommandList>
            <CommandEmpty>No chat found.</CommandEmpty>
            <CommandGroup heading="">
              {chatData.map((data) => (
                <ChatItem
                  key={data.sessionId}
                  titleText={data.title}
                  id={data.sessionId}
                  openfunc={() => {
                    openFunc(false)
                    idSessionFunc(data.sessionId)
                  }}
                />
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}
