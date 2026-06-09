"use client";

import { Search, Phone, Video, MoreVertical, Bot, Send, Heart, Image as ImageIcon, Loader2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  brokerId: string;
  stage: string;
}

interface Message {
  id: string | number;
  text: string;
  sender: "user" | "bot";
  time?: string;
}

export default function Conversas() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activeLeadIndex, setActiveLeadIndex] = useState<number>(-1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [loadingChat, setLoadingChat] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [isFavorite, setIsFavorite] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const fetchLeads = async () => {
    setLoadingLeads(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch("http://localhost:3001/api/leads", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (data.success) {
        setLeads(data.data);
        if (data.data.length > 0) {
          setActiveLeadIndex(0);
        }
      } else {
        setError(data.message || "Erro ao carregar leads.");
      }
    } catch (err) {
      setError("Não foi possível conectar ao servidor.");
    } finally {
      setLoadingLeads(false);
    }
  };

  const fetchHistory = async (leadId: string) => {
    setLoadingChat(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3001/api/chat/history/${leadId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (data.success && data.data && data.data.length > 0) {
        // Chat history records list from MongoDB
        const interaction = data.data[0]; // Active interaction
        const mappedMessages = interaction.messages.map((m: any, idx: number) => ({
          id: m._id || idx,
          text: m.content,
          sender: m.role === 'user' ? 'user' : 'bot',
          time: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }));
        setMessages(mappedMessages);
      } else {
        // Welcome message if empty
        setMessages([
          { id: 1, text: "Olá! Sou o assistente virtual CorretAI. Ainda não iniciamos nossa conversa. Digite abaixo para simular uma interação de lead!", sender: 'bot' }
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingChat(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    if (activeLeadIndex >= 0 && leads[activeLeadIndex]) {
      fetchHistory(leads[activeLeadIndex].id);
    }
  }, [activeLeadIndex, leads]);

  const handleSendMessage = async () => {
    if (!messageText.trim() || activeLeadIndex < 0 || !leads[activeLeadIndex]) return;
    const activeLead = leads[activeLeadIndex];
    const userMsgText = messageText;
    setMessageText("");

    const newMsg: Message = {
      id: Date.now(),
      text: userMsgText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg]);

    try {
      const response = await fetch("http://localhost:3001/api/chat/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: activeLead.id,
          brokerId: activeLead.brokerId,
          message: userMsgText,
          channel: "web"
        })
      });

      const data = await response.json();
      if (response.ok && data.reply) {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            text: data.reply,
            sender: 'bot',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeLead = activeLeadIndex >= 0 && leads[activeLeadIndex] ? leads[activeLeadIndex] : null;

  return (
    <div className="flex-1 flex overflow-hidden bg-background">
      
      {/* 1. Contacts List */}
      <div className="w-80 bg-gray-50 border-r border-gray-100 flex flex-col h-full shrink-0">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar leads..." 
              className="w-full pl-10 pr-4 py-3 bg-gray-200/50 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loadingLeads ? (
          <div className="flex-1 flex items-center justify-center p-4">
            <Loader2 className="animate-spin text-accent" />
          </div>
        ) : error ? (
          <div className="flex-1 flex items-center justify-center p-4 text-center text-xs text-red-500">
            <AlertCircle className="mx-auto mb-2" />
            {error}
          </div>
        ) : filteredLeads.length > 0 ? (
          <div className="flex-1 overflow-y-auto px-4 space-y-2">
            {filteredLeads.map((lead, i) => {
              const actualIdx = leads.findIndex(l => l.id === lead.id);
              const isActive = actualIdx === activeLeadIndex;
              return (
                <div 
                  key={lead.id} 
                  onClick={() => setActiveLeadIndex(actualIdx)}
                  className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-colors ${isActive ? 'bg-white shadow-sm border border-gray-100' : 'hover:bg-gray-100'}`}
                >
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-300 text-gray-600'}`}>
                      {lead.name.charAt(0)}
                    </div>
                    <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white rounded-full ${isActive ? 'bg-accent' : 'bg-gray-400'}`}></div>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex justify-between items-center mb-0.5">
                      <h4 className="font-bold text-text-main text-sm truncate">{lead.name}</h4>
                    </div>
                    <p className="text-xs text-text-muted truncate">{lead.phone}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center p-4 text-xs text-text-muted">
            Nenhum lead com conversa.
          </div>
        )}
      </div>

      {/* 2. Main Chat */}
      <div className="flex-1 flex flex-col bg-white border-r border-gray-100">
        {activeLead ? (
          <>
            {/* Chat Header */}
            <header className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-lighter text-accent rounded-full flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-text-main text-base">Assistente CorretAI</h2>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-xs font-semibold text-accent uppercase tracking-wide">IA Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-500">
                <button onClick={() => alert(`Ligando para ${activeLead.phone}`)} className="hover:text-text-main transition-colors"><Phone size={20} /></button>
                <button onClick={() => alert("Mais opções")} className="hover:text-text-main transition-colors"><MoreVertical size={20} /></button>
              </div>
            </header>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {loadingChat ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="animate-spin text-accent w-8 h-8" />
                </div>
              ) : (
                messages.map((msg) => (
                  msg.sender === 'user' ? (
                    <div key={msg.id} className="flex justify-end">
                      <div className="bg-accent text-white rounded-2xl rounded-tr-sm px-5 py-4 max-w-md shadow-sm">
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                        {msg.time && <div className="text-right mt-2 text-white/70 text-[10px]">{msg.time}</div>}
                      </div>
                    </div>
                  ) : (
                    <div key={msg.id} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex flex-shrink-0 items-center justify-center mt-1">
                        <Bot size={14} className="text-white" />
                      </div>
                      <div className="max-w-xl">
                        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm px-5 py-4 mb-4">
                          <p className="text-sm text-text-main leading-relaxed">
                            {msg.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                ))
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
                <input 
                  type="text" 
                  placeholder={`Simular mensagem de ${activeLead.name}...`} 
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-transparent border-none focus:outline-none text-sm text-text-main py-2"
                />
                <button onClick={handleSendMessage} className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-light transition-colors shadow-sm">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-text-muted p-8">
            <Bot size={48} className="text-gray-300 mb-4" />
            <p className="text-sm font-semibold">Nenhuma conversa ativa</p>
            <p className="text-xs mt-1">Selecione um lead ao lado para visualizar o chat.</p>
          </div>
        )}
      </div>

      {/* 3. Right Sidebar Details */}
      <div className="w-80 bg-white overflow-y-auto shrink-0 border-l border-gray-100">
        {activeLead ? (
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-bold text-text-main leading-tight">{activeLead.name}</h2>
              <button onClick={() => setIsFavorite(!isFavorite)} className={`${isFavorite ? 'text-accent hover:text-accent-light' : 'text-gray-300 hover:text-gray-400'} transition-colors`}>
                <Heart size={24} className={isFavorite ? "fill-current" : ""} />
              </button>
            </div>
            
            <p className="text-sm text-text-muted leading-relaxed mb-6">
              Lead associado ao corretor.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-[10px] text-text-muted font-bold uppercase tracking-wide mb-1">Telefone</p>
                <p className="text-xs font-bold text-text-main truncate">{activeLead.phone}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-[10px] text-text-muted font-bold uppercase tracking-wide mb-1">Estágio</p>
                <p className="text-xs font-bold text-text-main">{activeLead.stage}</p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-wide mb-3">Email</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                  {activeLead.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-text-main text-xs truncate max-w-[150px]">{activeLead.email || "Não cadastrado"}</h4>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-xs text-text-muted">
            Selecione um lead para ver informações detalhadas.
          </div>
        )}
      </div>

    </div>
  );
}

