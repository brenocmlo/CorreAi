"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Filter, UserPlus, MoreVertical, Mail, Phone, Pencil, Trash2, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Lead {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  stage: string;
  budgetMin: string | null;
  budgetMax: string | null;
  score?: number;
  lastActive?: string;
}

export default function Leads() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStage, setFilterStage] = useState("Todos");
  const [showFilter, setShowFilter] = useState(false);

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const fetchLeads = async () => {
    setLoading(true);
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
        // Map raw database stages and defaults
        const mapped = data.data.map((l: any) => ({
          id: l.id,
          name: l.name,
          email: l.email,
          phone: l.phone,
          stage: l.stage,
          budgetMin: l.budgetMin,
          budgetMax: l.budgetMax,
          score: Math.floor(Math.random() * 40) + 60, // Mock lead score
          lastActive: "Ativo"
        }));
        setLeads(mapped);
      } else {
        setError(data.message || "Erro ao carregar leads.");
      }
    } catch (err) {
      setError("Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getStageLabel = (stage: string) => {
    switch(stage) {
      case 'NEW': return 'Novo Lead';
      case 'IN_PROGRESS': return 'Em Progresso';
      case 'VISIT_SCHEDULED': return 'Visita Agendada';
      case 'PROPOSAL_SENT': return 'Proposta Enviada';
      case 'NEGOTIATION': return 'Em Negociação';
      case 'CLOSED_WON': return 'Ganho';
      case 'CLOSED_LOST': return 'Perdido';
      default: return stage;
    }
  };

  const getStageColor = (stage: string) => {
    switch(stage) {
      case 'NEW': return 'bg-blue-50 text-blue-600';
      case 'IN_PROGRESS': return 'bg-sky-50 text-sky-600';
      case 'VISIT_SCHEDULED': return 'bg-purple-50 text-purple-600';
      case 'PROPOSAL_SENT': return 'bg-amber-50 text-amber-600';
      case 'NEGOTIATION': return 'bg-accent-lighter text-accent';
      case 'CLOSED_WON': return 'bg-emerald-50 text-emerald-600';
      case 'CLOSED_LOST': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja remover este lead?")) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3001/api/leads/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await res.json();
        if (data.success) {
          setLeads(leads.filter(lead => lead.id !== id));
          alert("Lead removido com sucesso!");
        } else {
          alert(data.message || "Erro ao remover lead.");
        }
      } catch (err) {
        alert("Erro de conexão ao remover lead.");
      }
      setOpenMenuId(null);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      lead.phone.includes(searchTerm);

    const matchesStage = filterStage === "Todos" || getStageLabel(lead.stage) === filterStage;

    return matchesSearch && matchesStage;
  });

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-background">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Leads e Clientes</h1>
          <p className="text-text-muted text-sm mt-1">Acompanhe e nutra sua base de contatos.</p>
        </div>
        <Link href="/leads/novo" className="bg-primary hover:bg-primary-light text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium transition-colors shadow-sm">
          <UserPlus size={18} />
          Novo Lead
        </Link>
      </header>

      {/* Control Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nome, email ou telefone..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-accent bg-transparent"
          value={filterStage}
          onChange={(e) => setFilterStage(e.target.value)}
        >
          <option value="Todos">Todos os Estágios</option>
          <option value="Novo Lead">Novo Lead</option>
          <option value="Em Progresso">Em Progresso</option>
          <option value="Visita Agendada">Visita Agendada</option>
          <option value="Proposta Enviada">Proposta Enviada</option>
          <option value="Em Negociação">Em Negociação</option>
          <option value="Ganho">Ganho</option>
          <option value="Perdido">Perdido</option>
        </select>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 bg-white rounded-2xl border border-gray-100">
          <Loader2 className="w-10 h-10 text-accent animate-spin" />
          <p className="text-slate-500 font-semibold text-sm">Carregando seus leads...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 bg-white rounded-2xl border border-gray-100">
          <AlertCircle className="w-10 h-10 text-red-500" />
          <p className="text-red-500 font-semibold text-sm">{error}</p>
        </div>
      ) : filteredLeads.length > 0 ? (
        /* Leads Table */
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Lead</th>
                  <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Contato</th>
                  <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Orçamento Max</th>
                  <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Estágio</th>
                  <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Score</th>
                  <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider">Última Ação</th>
                  <th className="px-6 py-4 text-xs font-bold text-text-muted uppercase tracking-wider text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLeads.map((lead) => (
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
                          <Mail size={12} /> {lead.email || "Não informado"}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-text-muted">
                          <Phone size={12} /> {lead.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-text-main">
                      {lead.budgetMax ? new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(Number(lead.budgetMax)) : "Não informado"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStageColor(lead.stage)}`}>
                        {getStageLabel(lead.stage)}
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
                      <div className="relative inline-block text-left">
                        <button 
                          onClick={() => setOpenMenuId(openMenuId === lead.id ? null : lead.id)}
                          className="text-gray-400 hover:text-primary transition-colors p-1 rounded-lg hover:bg-gray-100"
                        >
                          <MoreVertical size={18} />
                        </button>

                        {openMenuId === lead.id && (
                          <div 
                            ref={menuRef}
                            className="absolute right-0 mt-2 w-44 rounded-xl bg-white shadow-xl border border-gray-100 py-2 z-20"
                          >
                            <div className="px-3 py-1.5 mb-1 border-b border-gray-50">
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ações do Lead</p>
                            </div>
                            <Link 
                              href={`/leads/${lead.id}/editar`}
                              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-text-main hover:bg-gray-50 transition-colors mx-1 rounded-lg"
                            >
                              <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center">
                                <Pencil size={14} className="text-gray-500" />
                              </div>
                              <span className="font-medium">Editar Lead</span>
                            </Link>
                            <button 
                              onClick={() => handleDelete(lead.id)}
                              className="w-[calc(100%-8px)] flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors mx-1 rounded-lg"
                            >
                              <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
                                <Trash2 size={14} className="text-red-600" />
                              </div>
                              <span className="font-medium">Remover Lead</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mx-auto">
            <UserPlus size={28} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-base">Nenhum lead encontrado</h4>
            <p className="text-slate-500 text-sm mt-1">Cadastre um lead ou ajuste os seus filtros.</p>
          </div>
        </div>
      )}
    </div>
  );
}
