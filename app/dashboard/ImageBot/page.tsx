"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { Send, Sparkles } from "lucide-react";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// Message type definition
type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  image?: string;
  error?: boolean;
};

export default function Imagebot() {
  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI image assistant. Describe an image you'd like to see.",
      sender: "bot",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Create a placeholder bot message with loading state
      const botMessageId = (Date.now() + 1).toString();
      const botMessage: Message = {
        id: botMessageId,
        content: "Generating your image...",
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);

      // Prepare the API URL
      const encodedPrompt = encodeURIComponent(userMessage.content);
      const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}`;

      // Update the bot message with the image
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? {
                ...msg,
                content: "Here's what I generated based on your description:",
                image: imageUrl,
              }
            : msg
        )
      );
    } catch (error) {
      // Handle error
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: "We are unable to process your request.",
          sender: "bot",
          error: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
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
        <h2 className="text-3xl font-bold tracking-tight">
          AI Image Generator
        </h2>
        <p className="text-muted-foreground">
          Describe an image and I'll generate it for you using AI.
        </p>
      </div>
      <Separator className="my-6" />

      {/* Chat Interface */}
      <Card className="flex flex-1 flex-col">
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
                {message.sender === "bot" && (
                  <Avatar className="mr-2 h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="Bot" />
                    <AvatarFallback>
                      <Sparkles className="h-4 w-4" />
                    </AvatarFallback>
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
                  <p className="text-sm">{message.content}</p>
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
                  <Avatar className="ml-2 h-8 w-8">
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
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !inputValue.trim()}>
              {isLoading ? (
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
