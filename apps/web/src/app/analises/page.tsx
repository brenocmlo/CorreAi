"use client";

import { BarChart2, TrendingUp, Users, Calendar, Download } from "lucide-react";

export default function Analises() {
  return (
    <div className="flex-1 overflow-y-auto p-8 bg-background">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Análises e Relatórios</h1>
          <p className="text-text-muted text-sm mt-1">Visão aprofundada sobre o desempenho da sua equipe e IA.</p>
        </div>
        <button className="bg-white border border-gray-200 hover:bg-gray-50 text-text-main px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium transition-colors shadow-sm">
          <Download size={18} />
          Exportar Relatório
        </button>
      </header>

      {/* Date Filter */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 mb-8">
        <div className="flex items-center gap-2 text-text-muted text-sm">
          <Calendar size={18} />
          <span>Período:</span>
        </div>
        <select className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-accent">
          <option>Últimos 30 Dias</option>
          <option>Últimos 7 Dias</option>
          <option>Este Mês</option>
          <option>Mês Passado</option>
          <option>Este Ano</option>
        </select>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Taxa de Conversão", value: "18.5%", trend: "+2.1%", icon: TrendingUp, color: "text-accent", bg: "bg-accent-lighter" },
          { title: "Tempo Médio (Chat)", value: "4m 12s", trend: "-15s", icon: BarChart2, color: "text-indigo-500", bg: "bg-indigo-50" },
          { title: "Novos Leads", value: "342", trend: "+45", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
          { title: "Imóveis Visitados", value: "128", trend: "+12", icon: BarChart2, color: "text-purple-500", bg: "bg-purple-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-md ${stat.trend.startsWith('+') ? 'text-accent bg-accent-lighter' : 'text-red-500 bg-red-50'}`}>
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-sm text-text-muted font-medium mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-text-main">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-96 flex flex-col">
          <h3 className="text-lg font-bold text-text-main mb-6">Origem dos Leads</h3>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-100 rounded-xl bg-gray-50">
            <p className="text-text-muted font-medium">Gráfico de Pizza (Integração Futura Recharts/Chart.js)</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-96 flex flex-col">
          <h3 className="text-lg font-bold text-text-main mb-6">Receita vs Projeção</h3>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-100 rounded-xl bg-gray-50">
            <p className="text-text-muted font-medium">Gráfico de Linha (Integração Futura Recharts/Chart.js)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
