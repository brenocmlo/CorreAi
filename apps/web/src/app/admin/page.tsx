"use client";

import { useState } from "react";
import { 
  Users, 
  Home, 
  TrendingUp, 
  UserCheck, 
  Search, 
  MoreVertical, 
  ChevronRight,
  Filter,
  BarChart3,
  MapPin,
  Mail,
  Phone
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats] = useState({
    totalBrokers: 12,
    totalLeads: 485,
    totalProperties: 156,
    activeCampaigns: 8
  });

  const [brokers] = useState([
    { id: 1, name: "Ricardo Mendes", email: "ricardo@correai.com", leads: 42, properties: 15, sales: 3, status: "Online" },
    { id: 2, name: "Ana Paula", email: "ana.paula@correai.com", leads: 38, properties: 12, sales: 5, status: "Offline" },
    { id: 3, name: "Juliano Santos", email: "juliano@correai.com", leads: 25, properties: 8, sales: 2, status: "Online" },
    { id: 4, name: "Fernanda Costa", email: "fernanda@correai.com", leads: 56, properties: 22, sales: 7, status: "Online" },
  ]);

  const [recentLeads] = useState([
    { id: 1, name: "Carlos Oliveira", broker: "Fernanda Costa", stage: "Proposta", date: "Há 5 min" },
    { id: 2, name: "Mariana Silva", broker: "Ricardo Mendes", stage: "Visita", date: "Há 15 min" },
    { id: 3, name: "Roberto Souza", broker: "Ana Paula", stage: "Novo", date: "Há 1 hora" },
  ]);

  return (
    <div className="flex-1 overflow-y-auto bg-[#f8fafc] p-8">
      <header className="flex justify-between items-end mb-10">
        <div>
          <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-[0.2em] mb-2">
            <BarChart3 size={14} />
            Visão Geral do Sistema
          </div>
          <h1 className="text-3xl font-extrabold text-text-main tracking-tight italic">Admin Dashboard</h1>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 text-text-main px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
            <Filter size={18} />
            Filtrar Período
          </button>
          <button className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary-light transition-colors shadow-lg shadow-primary/20">
            <TrendingUp size={18} />
            Exportar Relatório
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total de Corretores" value={stats.totalBrokers} icon={UserCheck} color="bg-blue-500" change="+2 este mês" />
        <StatCard title="Leads Ativos" value={stats.totalLeads} icon={Users} color="bg-accent" change="+12% vs mês passado" />
        <StatCard title="Imóveis em Carteira" value={stats.totalProperties} icon={Home} color="bg-purple-500" change="+8 novos hoje" />
        <StatCard title="Vendas Mensais" value="R$ 4.2M" icon={TrendingUp} color="bg-amber-500" change="+22% de crescimento" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Brokers List */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
            <h3 className="font-bold text-text-main flex items-center gap-2">
              <Users size={18} className="text-primary" />
              Ranking de Corretores
            </h3>
            <button className="text-xs font-bold text-accent hover:underline flex items-center gap-1">
              Ver todos <ChevronRight size={14} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                  <th className="px-6 py-4">Corretor</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Leads</th>
                  <th className="px-6 py-4">Imóveis</th>
                  <th className="px-6 py-4">Vendas</th>
                  <th className="px-6 py-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {brokers.map((broker) => (
                  <tr key={broker.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-primary border border-gray-200 group-hover:scale-105 transition-transform">
                          {broker.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-text-main">{broker.name}</p>
                          <p className="text-xs text-text-muted">{broker.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        broker.status === 'Online' ? 'bg-accent-lighter text-accent' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${broker.status === 'Online' ? 'bg-accent' : 'bg-gray-400'}`} />
                        {broker.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-text-main">{broker.leads}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-text-muted">{broker.properties}</td>
                    <td className="px-6 py-4 text-sm font-bold text-primary">{broker.sales}</td>
                    <td className="px-6 py-4 text-center">
                      <button className="p-2 text-gray-300 hover:text-primary transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Analytics/Recent */}
        <div className="space-y-8">
          {/* Recent Leads */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-text-main mb-6 flex items-center gap-2">
              <TrendingUp size={18} className="text-accent" />
              Atividade Recente
            </h3>
            <div className="space-y-6">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex gap-4 group">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-accent-lighter flex items-center justify-center text-accent font-bold text-sm">
                      {lead.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-50">
                       <span className="w-3 h-3 rounded-full bg-accent" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-text-main group-hover:text-accent transition-colors">{lead.name}</h4>
                      <span className="text-[10px] font-medium text-text-muted">{lead.date}</span>
                    </div>
                    <p className="text-xs text-text-muted mt-0.5">
                      Atribuído a <span className="font-bold text-primary">{lead.broker}</span>
                    </p>
                    <div className="mt-2 inline-block px-2 py-0.5 bg-gray-50 rounded text-[9px] font-bold text-gray-500 uppercase">
                      {lead.stage}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 rounded-xl border border-dashed border-gray-200 text-xs font-bold text-text-muted hover:border-accent hover:text-accent transition-all">
              Ver Log Completo
            </button>
          </div>

          {/* Quick Info Box */}
          <div className="bg-primary rounded-3xl p-6 text-white shadow-xl shadow-primary/20 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10" />
             <h4 className="text-lg font-bold mb-2">Suporte Administrativo</h4>
             <p className="text-white/70 text-sm mb-6 leading-relaxed">Gerencie permissões e visualize métricas de todo o time em tempo real.</p>
             <button className="bg-accent text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-accent-dark transition-colors">
               Configurações Globais
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, change }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
          <Icon size={24} />
        </div>
        <span className="text-[10px] font-bold text-accent bg-accent-lighter px-2 py-1 rounded-lg">
          {change}
        </span>
      </div>
      <p className="text-sm font-bold text-text-muted uppercase tracking-wide">{title}</p>
      <h2 className="text-3xl font-black text-text-main mt-1 tracking-tight italic">{value}</h2>
    </div>
  );
}
