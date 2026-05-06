"use client";

import { Bell, Search, TrendingUp, MessageSquare, Wallet, Bot } from "lucide-react";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="flex-1 overflow-y-auto p-8 bg-background">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Painel de Inteligência</h1>
          <p className="text-text-muted text-sm mt-1">Bem-vindo de volta, veja o que está acontecendo com suas propriedades hoje.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Pesquisar leads ou imóveis..." 
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent w-64 shadow-sm"
            />
          </div>
          <button className="p-2 bg-white border border-gray-200 rounded-full text-gray-600 hover:text-primary shadow-sm">
            <Bell size={20} />
          </button>
          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden border border-gray-200">
            {/* Placeholder User Avatar */}
            <div className="w-full h-full bg-primary flex items-center justify-center text-white font-bold">
              C
            </div>
          </div>
        </div>
      </header>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
             <div className="w-24 h-24 bg-accent rounded-full blur-3xl -mr-10 -mt-10"></div>
          </div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-accent-lighter text-accent rounded-xl">
              <TrendingUp size={24} />
            </div>
            <span className="text-xs font-semibold text-accent bg-accent-lighter px-2 py-1 rounded-md">+12.5%</span>
          </div>
          <p className="text-sm text-text-muted font-medium mb-1">Leads Ativos</p>
          <h2 className="text-3xl font-bold text-text-main">1,284</h2>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
             <div className="w-24 h-24 bg-indigo-500 rounded-full blur-3xl -mr-10 -mt-10"></div>
          </div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-indigo-50 text-indigo-500 rounded-xl">
              <MessageSquare size={24} />
            </div>
            <span className="text-xs font-semibold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md">+8%</span>
          </div>
          <p className="text-sm text-text-muted font-medium mb-1">Conversas IA</p>
          <h2 className="text-3xl font-bold text-text-main">452</h2>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-500 rounded-xl">
              <Wallet size={24} />
            </div>
            <span className="text-xs font-medium text-gray-500">Estável</span>
          </div>
          <p className="text-sm text-text-muted font-medium mb-1">Comissão Est.</p>
          <h2 className="text-3xl font-bold text-text-main">$42.8k</h2>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Area */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-text-main">Eficiência de Conversão de Leads</h3>
              <p className="text-sm text-text-muted">Desempenho diário de nutrição de leads via IA</p>
            </div>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button className="px-3 py-1 text-sm font-medium bg-white shadow-sm rounded-md text-text-main">Semanal</button>
              <button className="px-3 py-1 text-sm font-medium text-text-muted hover:text-text-main">Mensal</button>
            </div>
          </div>
          
          {/* Mock Chart using CSS Bars */}
          <div className="h-64 mt-8 flex items-end justify-between gap-4">
            {[40, 30, 60, 90, 45, 80, 55].map((height, i) => (
              <div key={i} className="w-full flex flex-col items-center gap-2 group">
                <div className="w-full bg-accent-lighter rounded-t-sm rounded-b-sm overflow-hidden relative" style={{ height: '100%' }}>
                  <div 
                    className={`absolute bottom-0 w-full rounded-t-sm transition-all duration-500 group-hover:opacity-80 ${height === 90 ? 'bg-accent' : 'bg-gray-200'}`} 
                    style={{ height: `${height}%` }}
                  >
                    {height === 90 && <div className="w-1.5 h-1.5 bg-white rounded-full mx-auto mt-2 opacity-80"></div>}
                  </div>
                </div>
                <span className="text-xs text-text-muted font-medium uppercase mt-2">
                  {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Robot Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-lg font-bold text-text-main mb-6">Atividade do Robô</h3>
          
          <div className="space-y-6 flex-1">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border-4 border-accent-lighter flex items-center justify-center relative">
                <svg className="absolute top-0 left-0 w-full h-full -rotate-90">
                  <circle cx="24" cy="24" r="24" className="stroke-accent fill-none stroke-[4] stroke-dasharray-[150] stroke-dashoffset-[20] rounded-full" />
                </svg>
                <span className="text-sm font-bold text-accent">88%</span>
              </div>
              <div>
                <h4 className="font-bold text-text-main text-sm">Resolução no 1º Contato</h4>
                <p className="text-xs text-text-muted mt-0.5">Em todas as sessões de chat ativas</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border-4 border-indigo-50 flex items-center justify-center relative">
                <svg className="absolute top-0 left-0 w-full h-full -rotate-90">
                  <circle cx="24" cy="24" r="24" className="stroke-indigo-400 fill-none stroke-[4] stroke-dasharray-[150] stroke-dashoffset-[80] rounded-full" />
                </svg>
                <span className="text-sm font-bold text-indigo-500">12s</span>
              </div>
              <div>
                <h4 className="font-bold text-text-main text-sm">Tempo Médio de Resposta</h4>
                <p className="text-xs text-text-muted mt-0.5">Em todas as sessões de chat ativas</p>
              </div>
            </div>
          </div>

          <button className="w-full mt-6 py-3 bg-gray-100 hover:bg-gray-200 text-text-main font-medium rounded-xl transition-colors text-sm">
            Ver Logs Completos
          </button>
        </div>

      </div>
      
      {/* Floating Chat Bot Icon at bottom right (matches design) */}
      <div className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-primary-light transition-colors">
        <Bot size={24} />
      </div>
    </div>
  );
}
