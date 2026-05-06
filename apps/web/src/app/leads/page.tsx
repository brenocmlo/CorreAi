"use client";

import { Search, Plus, Filter, UserPlus, MoreVertical, Mail, Phone } from "lucide-react";

export default function Leads() {
  const leads = [
    { id: 1, name: "Sarah Jenkins", email: "sarah.j@example.com", phone: "+1 555-0123", stage: "Visita Agendada", score: 94, budget: "R$ 800k - 1M", lastActive: "Há 10 min" },
    { id: 2, name: "Marcus Thorne", email: "m.thorne@example.com", phone: "+1 555-0198", stage: "Em Negociação", score: 85, budget: "R$ 1.5M - 2M", lastActive: "Ontem" },
    { id: 3, name: "Elena Rodriguez", email: "elena.rod@example.com", phone: "+1 555-0144", stage: "Novo Lead", score: 45, budget: "R$ 500k - 700k", lastActive: "Há 3 horas" },
    { id: 4, name: "James Wilson", email: "j.wilson@example.com", phone: "+1 555-0177", stage: "Proposta Enviada", score: 72, budget: "R$ 900k - 1.2M", lastActive: "Há 2 dias" },
  ];

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
    <div className="flex-1 overflow-y-auto p-8 bg-background">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Leads e Clientes</h1>
          <p className="text-text-muted text-sm mt-1">Acompanhe e nutra sua base de contatos.</p>
        </div>
        <button className="bg-primary hover:bg-primary-light text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium transition-colors shadow-sm">
          <UserPlus size={18} />
          Novo Lead
        </button>
      </header>

      {/* Control Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nome, email ou telefone..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-text-main hover:bg-gray-50">
          <Filter size={16} /> Etapa do Funil
        </button>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Lead</th>
                <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Contato</th>
                <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Orçamento</th>
                <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Estágio</th>
                <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Score</th>
                <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Última Ação</th>
                <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                        {lead.name.charAt(0)}
                      </div>
                      <span className="font-bold text-text-main text-sm">{lead.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-xs text-text-muted">
                        <Mail size={12} /> {lead.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-text-muted">
                        <Phone size={12} /> {lead.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-text-main">{lead.budget}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStageColor(lead.stage)}`}>
                      {lead.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-accent h-full rounded-full" style={{ width: `${lead.score}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-text-main">{lead.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-muted">{lead.lastActive}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-gray-400 hover:text-primary transition-colors p-1">
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
