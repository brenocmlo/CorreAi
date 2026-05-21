"use client";

import { useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  ChevronRight,
  User,
  Calendar,
  DollarSign
} from "lucide-react";
import Link from "next/link";

export default function AdminLeads() {
  const [leads] = useState([
    { id: 1, name: "Sarah Jenkins", email: "sarah.j@example.com", phone: "+1 555-0123", broker: "Ricardo Mendes", stage: "Visita Agendada", score: 94, budget: "R$ 800k - 1M", createdAt: "12/05/2026" },
    { id: 2, name: "Marcus Thorne", email: "m.thorne@example.com", phone: "+1 555-0198", broker: "Fernanda Costa", stage: "Em Negociação", score: 85, budget: "R$ 1.5M - 2M", createdAt: "11/05/2026" },
    { id: 3, name: "Elena Rodriguez", email: "elena.rod@example.com", phone: "+1 555-0144", broker: "Ana Paula", stage: "Novo Lead", score: 45, budget: "R$ 500k - 700k", createdAt: "10/05/2026" },
    { id: 4, name: "James Wilson", email: "j.wilson@example.com", phone: "+1 555-0177", broker: "Fernanda Costa", stage: "Proposta Enviada", score: 72, budget: "R$ 900k - 1.2M", createdAt: "09/05/2026" },
  ]);

  const getStageColor = (stage: string) => {
    switch(stage) {
      case 'Novo Lead': return 'bg-blue-50 text-blue-600';
      case 'Visita Agendada': return 'bg-purple-50 text-purple-600';
      case 'Proposta Enviada': return 'bg-amber-50 text-amber-600';
      case 'Em Negociação': return 'bg-accent-lighter text-accent';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#f8fafc] p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-text-main flex items-center gap-2">
          <Users className="text-primary" />
          Todos os Leads do Sistema
        </h1>
        <p className="text-text-muted text-sm mt-1">Visão global de todos os contatos captados por todos os corretores.</p>
      </header>

      {/* Control Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar leads por nome, email ou telefone..." 
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-5 py-3 border border-gray-100 rounded-xl text-sm font-bold text-text-main hover:bg-gray-50 transition-colors">
          <Filter size={18} /> Todos os Corretores
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Lead</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Atribuído a</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Orçamento</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Estágio</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Data</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-text-main text-sm block">{lead.name}</span>
                        <span className="text-[10px] text-text-muted">{lead.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      <User size={14} className="text-gray-400" />
                      {lead.broker}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm font-black text-text-main">
                      <DollarSign size={14} className="text-accent" />
                      {lead.budget}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${getStageColor(lead.stage)}`}>
                      {lead.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
                      <Calendar size={12} />
                      {lead.createdAt}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-gray-400 hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-100">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
