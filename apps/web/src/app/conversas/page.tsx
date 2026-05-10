"use client";

import { Search, Phone, Video, MoreVertical, Bot, Send, Heart, Image as ImageIcon } from "lucide-react";

export default function Conversas() {
  const leads = [
    { name: "Sarah Jenkins", msg: '"O acesso ao rooftop é..."', time: "há 2m", active: true, avatar: "S" },
    { name: "Marcus Thorne", msg: "Checking your last offer...", time: "há 1h", active: false, avatar: "M" },
    { name: "Elena Rodriguez", msg: '"Can we schedule for Tues?"', time: "há 3h", active: false, avatar: "E" },
  ];

  return (
    <div className="flex-1 flex overflow-hidden bg-background">
      
      {/* 1. Contacts List */}
      <div className="w-80 bg-gray-50 border-r border-gray-100 flex flex-col h-full">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar leads..." 
              className="w-full pl-10 pr-4 py-3 bg-gray-200/50 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-2">
          {leads.map((lead, i) => (
            <div 
              key={i} 
              className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-colors ${lead.active ? 'bg-white shadow-sm border border-gray-100' : 'hover:bg-gray-100'}`}
            >
              <div className="relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${lead.active ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-300 text-gray-600'}`}>
                  {lead.avatar}
                </div>
                <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white rounded-full ${lead.active ? 'bg-accent' : 'bg-gray-400'}`}></div>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center mb-0.5">
                  <h4 className="font-bold text-text-main text-sm truncate">{lead.name}</h4>
                  <span className="text-xs text-text-muted">{lead.time}</span>
                </div>
                <p className="text-xs text-text-muted truncate">{lead.msg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Main Chat */}
      <div className="flex-1 flex flex-col bg-white border-r border-gray-100">
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
            <button className="hover:text-text-main transition-colors"><Phone size={20} /></button>
            <button className="hover:text-text-main transition-colors"><Video size={20} /></button>
            <button className="hover:text-text-main transition-colors"><MoreVertical size={20} /></button>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="text-center">
            <span className="text-xs font-medium text-text-muted bg-gray-50 px-3 py-1 rounded-full">Today, October 24</span>
          </div>

          {/* User Message */}
          <div className="flex justify-end">
            <div className="bg-accent text-white rounded-2xl rounded-tr-sm px-5 py-4 max-w-md shadow-sm">
              <p className="text-sm leading-relaxed">Olá! Estou procurando um apartamento moderno de 2 quartos no centro. Orçamento em torno de R$ 850k. Precisa ter uma boa vista!</p>
              <div className="text-right mt-2 text-white/70 text-[10px]">10:42 AM</div>
            </div>
          </div>

          {/* Bot Response */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex flex-shrink-0 items-center justify-center mt-1">
              <Bot size={14} className="text-white" />
            </div>
            <div className="max-w-xl">
              <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm px-5 py-4 mb-4">
                <p className="text-sm text-text-main leading-relaxed">
                  Ótima escolha, Sarah! Selecionei três listagens premium que combinam com sua preferência pelo centro e seu orçamento. Todas possuem janelas do chão ao teto com vista panorâmica da cidade.
                </p>
              </div>
              
              {/* Property Cards inside chat */}
              <div className="flex gap-4 overflow-x-auto pb-2">
                {/* Property Card 1 */}
                <div className="min-w-[240px] bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <div className="h-32 bg-gray-200 relative">
                     <div className="absolute top-2 left-2 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">Destaque</div>
                     <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded-lg backdrop-blur-sm">$825,000</div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-text-main text-sm truncate">O Zenith Loft</h4>
                    <p className="text-xs text-text-muted mt-1 truncate">Centro da Cidade</p>
                  </div>
                </div>

                {/* Property Card 2 */}
                <div className="min-w-[240px] bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <div className="h-32 bg-gray-200 relative">
                     <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded-lg backdrop-blur-sm">$849,000</div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-text-main text-sm truncate">Azure Heights Interior</h4>
                    <p className="text-xs text-text-muted mt-1 truncate">Centro da Cidade</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
            <button className="text-gray-400 hover:text-primary transition-colors"><ImageIcon size={20} /></button>
            <input 
              type="text" 
              placeholder="Escreva sua mensagem..." 
              className="flex-1 bg-transparent border-none focus:outline-none text-sm text-text-main py-2"
            />
            <button className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-light transition-colors shadow-sm">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Right Sidebar Details */}
      <div className="w-80 bg-white overflow-y-auto">
        <div className="p-6">
          {/* Main Property Detail */}
          <div className="rounded-2xl overflow-hidden bg-gray-100 h-48 mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold text-text-main leading-tight">O Zenith Loft</h2>
            <button className="text-accent hover:text-accent-light transition-colors"><Heart size={24} className="fill-current" /></button>
          </div>
          
          <p className="text-sm text-text-muted leading-relaxed mb-6">
            Moradia premium no centro com janelas do chão ao teto e integração de casa inteligente.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-wide mb-1">Tamanho</p>
              <p className="text-base font-bold text-text-main">1.240 m²</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-wide mb-1">Andar</p>
              <p className="text-base font-bold text-text-main">32º Andar</p>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-[10px] text-text-muted font-bold uppercase tracking-wide mb-3">Corretor Atribuído</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">DC</div>
              <div>
                <h4 className="font-bold text-text-main text-sm">David Chen</h4>
                <p className="text-xs text-text-muted">Especialista em Imóveis de Luxo</p>
              </div>
            </div>
          </div>

          {/* Lead Score */}
          <div className="bg-accent-lighter/50 rounded-2xl p-5 border border-accent-lighter">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-text-main text-sm">Pontuação do Lead: 94</h4>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
              <div className="bg-accent h-2 rounded-full" style={{ width: '94%' }}></div>
            </div>
            <p className="text-[11px] text-text-muted leading-relaxed">
              Sarah visualizou 4 imóveis no centro e focou no Zenith Loft por 15 minutos.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
