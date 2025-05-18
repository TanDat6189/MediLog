"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { BarChart3, Home, LogOut, Send, Settings, User } from "lucide-react";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// Message type definition
type Message = {
  id: string;
  content: string;
  sender: "user" | "ai";
  image?: string;
  error?: boolean;
  isStreaming?: boolean;
};

// Mock AI response function (simulates streaming)
const mockAIResponse = async (
  prompt: string,
  onToken: (token: string) => void
): Promise<void> => {
  // Sample responses based on user input
  const responses: Record<string, string> = {
    hello: "Hello! How can I assist you today?",
    help: "I'm here to help! You can ask me questions, request information, or just chat.",
    "who are you":
      "I'm an AI assistant designed to help answer your questions and provide information.",
    "what can you do":
      "I can answer questions, provide information, help with tasks, and engage in conversation on various topics.",
  };

  // Default response if no match
  let response =
    "Thank you for your message. I'm here to help with any questions you might have.";

  // Check if we have a specific response for this prompt
  const lowercasePrompt = prompt.toLowerCase();
  for (const key in responses) {
    if (lowercasePrompt.includes(key)) {
      response = responses[key];
      break;
    }
  }

  // Add some context from the prompt to make it feel more personalized
  if (!Object.keys(responses).some((key) => lowercasePrompt.includes(key))) {
    if (lowercasePrompt.includes("?")) {
      response = `That's an interesting question. ${response}`;
    } else if (lowercasePrompt.length > 50) {
      response = `Thanks for sharing that with me. ${response}`;
    }
  }

  // Stream the response token by token
  const tokens = response.split(" ");

  for (const token of tokens) {
    await new Promise((resolve) =>
      setTimeout(resolve, 50 + Math.random() * 100)
    );
    onToken(token + " ");
  }
};

export default function Chatbot() {
  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI image assistant. Describe an image you'd like to see.",
      sender: "ai",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  // Ref for chat container to auto-scroll
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue(value);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim() || isStreaming) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Create a placeholder for AI response
    const aiMessageId = (Date.now() + 1).toString();
    const aiMessage: Message = {
      id: aiMessageId,
      content: "",
      sender: "ai",
      isStreaming: true,
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsStreaming(true);

    // Simulate AI response streaming
    await mockAIResponse(userMessage.content, (token) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId
            ? { ...msg, content: msg.content + token }
            : msg
        )
      );
    });

    // Mark streaming as complete
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === aiMessageId ? { ...msg, isStreaming: false } : msg
      )
    );
    setIsStreaming(false);
  };

  // Handle image load error
  const handleImageError = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              content: "We are unable to process your request.",
              image: undefined,
              error: true,
            }
          : msg
      )
    );
  };

  return (
    <div className="flex h-full flex-1 flex-col p-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI Chatbot</h2>
        <p className="text-muted-foreground">
          Describe your problems and I'll give you advices.
        </p>
      </div>
      <Separator className="my-6" />

      {/* Chat Interface */}
      <Card className="flex flex-1 flex-col overflow-hidden">
        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 md:p-6"
          style={{ maxHeight: "calc(100vh - 300px)" }}
        >
          <div className="flex flex-col space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "ai" && (
                  <Avatar className="mr-2 h-8 w-8 self-end">
                    <AvatarImage src="/placeholder.svg" alt="AI" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : message.error
                      ? "bg-destructive/10 text-destructive"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                    {message.isStreaming && (
                      <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-current"></span>
                    )}
                  </p>
                  {message.image && (
                    <div className="mt-2 overflow-hidden rounded-md">
                      <Image
                        src={message.image || "/placeholder.svg"}
                        alt="Generated image"
                        width={400}
                        height={300}
                        className="max-h-[300px] w-full object-contain"
                        onError={() => handleImageError(message.id)}
                      />
                    </div>
                  )}
                </div>
                {message.sender === "user" && (
                  <Avatar className="ml-2 h-8 w-8 self-end">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <CardContent className="border-t bg-background p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              placeholder="Describe an image you'd like to see..."
              value={inputValue}
              onChange={handleInputChange}
              disabled={isLoading || isStreaming}
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={isLoading || isStreaming || !inputValue.trim()}
            >
              {isLoading || isStreaming ? (
                <div className="flex items-center">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  <span className="ml-2">Sending</span>
                </div>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
