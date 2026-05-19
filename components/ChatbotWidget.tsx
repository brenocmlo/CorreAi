"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

interface ChatbotWidgetProps {
  context: "cliente" | "corretor";
}

export default function ChatbotWidget({ context }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Controla o estado de espera da IA
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text:
        context === "cliente"
          ? "Olá! Sou a inteligência artificial do CorreAi. Como posso ajudar você a encontrar o imóvel dos seus sonhos hoje?"
          : "Olá Corretor! Como posso ajudar a otimizar suas vendas e gerenciar seus leads hoje?",
      sender: "bot",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const currentInput = inputValue;
    setInputValue("");

    // 1. Adiciona a mensagem do usuário na tela instantaneamente
    const userMessageId = Date.now();
    const updatedMessages: Message[] = [
      ...messages,
      { id: userMessageId, text: currentInput, sender: "user" },
    ];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // 2. Formata todo o histórico de mensagens para o padrão do SDK do Gemini (user / model)
      const formattedHistory = updatedMessages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));

      // 3. Envia para a nossa API Route interna
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: formattedHistory,
          context: context,
        }),
      });

      const data = await response.json();

      // 4. Adiciona a resposta real do Gemini na tela
      if (response.ok && data.text) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now(), text: data.text, sender: "bot" },
        ]);
      } else {
        throw new Error(data.error || "Erro desconhecido");
      }
    } catch (error) {
      console.error("Erro ao falar com o bot:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "Ops, tive um problema técnico para processar sua mensagem agora. Pode tentar novamente em alguns instantes?",
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 overflow-hidden flex flex-col h-[500px] border border-slate-100 transition-all transform duration-300 ease-in-out">
          {/* Header */}
          <div className="bg-primary text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="text-accent w-6 h-6" />
              <h3 className="font-semibold">Assistente CorreAi</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.sender === "user"
                      ? "bg-accent text-white rounded-br-none"
                      : "bg-white border border-slate-100 text-slate-800 rounded-bl-none shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Balão de Carregamento / Digitando */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 text-slate-400 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={isLoading ? "CorreAi está digitando..." : "Digite sua mensagem..."}
                disabled={isLoading}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all disabled:opacity-60"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-accent hover:bg-sky-600 text-white p-2.5 rounded-full transition-colors flex-shrink-0 disabled:bg-slate-200 disabled:text-slate-400"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-accent hover:bg-sky-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}