"use client";

import { useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  UserPlus, 
  Mail, 
  Phone, 
  ChevronRight,
  Shield,
  Trash2,
  Pencil,
  Eye
} from "lucide-react";
import Link from "next/link";

export default function AdminCorretores() {
  const [brokers, setBrokers] = useState([
    { id: 1, name: "Ricardo Mendes", email: "ricardo@correai.com", phone: "(11) 98888-7777", document: "123.456.789-00", license: "CRECI 12345", leads: 42, properties: 15, status: "Ativo" },
    { id: 2, name: "Ana Paula", email: "ana.paula@correai.com", phone: "(11) 97777-6666", document: "987.654.321-11", license: "CRECI 54321", leads: 38, properties: 12, status: "Ativo" },
    { id: 3, name: "Juliano Santos", email: "juliano@correai.com", phone: "(11) 96666-5555", document: "456.789.123-22", license: "CRECI 67890", leads: 25, properties: 8, status: "Inativo" },
    { id: 4, name: "Fernanda Costa", email: "fernanda@correai.com", phone: "(11) 95555-4444", document: "321.654.987-33", license: "CRECI 09876", leads: 56, properties: 22, status: "Ativo" },
  ]);

  const [showFilter, setShowFilter] = useState(false);
  const [filterStatus, setFilterStatus] = useState("Todos");

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja remover este corretor? Esta ação não pode ser desfeita.")) {
      setBrokers(brokers.filter(b => b.id !== id));
    }
  };

  const filteredBrokers = filterStatus === "Todos" 
    ? brokers 
    : brokers.filter(b => b.status === filterStatus);

  return (
    <div className="flex-1 overflow-y-auto bg-[#f8fafc] p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-main flex items-center gap-2">
            <Users className="text-primary" />
            Gestão de Corretores
          </h1>
          <p className="text-text-muted text-sm mt-1">Visualize e gerencie todos os corretores cadastrados na plataforma.</p>
        </div>
        <Link href="/admin/corretores/novo" className="bg-primary hover:bg-primary-light text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold transition-all shadow-lg shadow-primary/20">
          <UserPlus size={18} />
          Novo Corretor
        </Link>
      </header>

      {/* Control Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nome, email, CRECI ou CPF..." 
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
          />
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 px-5 py-3 border border-gray-100 rounded-xl text-sm font-bold text-text-main hover:bg-gray-50 transition-colors bg-white shadow-sm"
          >
            <Filter size={18} /> Status: {filterStatus}
          </button>
          
          {showFilter && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
              {["Todos", "Ativo", "Inativo"].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setFilterStatus(status);
                    setShowFilter(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${
                    filterStatus === status ? "text-accent font-bold" : "text-text-muted font-medium"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Brokers Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Corretor</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Documentação</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Métricas</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredBrokers.map((broker) => (
                <tr key={broker.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
                        {broker.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-text-main">{broker.name}</h4>
                        <div className="flex flex-col gap-0.5 mt-0.5">
                          <span className="text-[11px] text-text-muted flex items-center gap-1"><Mail size={10} /> {broker.email}</span>
                          <span className="text-[11px] text-text-muted flex items-center gap-1"><Phone size={10} /> {broker.phone}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-text-main">{broker.license}</span>
                      <span className="text-[10px] text-text-muted flex items-center gap-1 uppercase tracking-wider"><Shield size={10} /> CPF: {broker.document}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-text-muted uppercase">Leads</p>
                        <p className="text-sm font-black text-primary">{broker.leads}</p>
                      </div>
                      <div className="w-px h-6 bg-gray-100" />
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-text-muted uppercase">Imóveis</p>
                        <p className="text-sm font-black text-primary">{broker.properties}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold ${
                      broker.status === 'Ativo' ? 'bg-accent-lighter text-accent' : 'bg-red-50 text-red-500'
                    }`}>
                      {broker.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-2 text-gray-400 hover:text-primary transition-colors hover:bg-gray-100 rounded-lg" title="Ver Detalhes">
                        <Eye size={18} />
                      </button>
                      <Link href={`/admin/corretores/${broker.id}/editar`} className="p-2 text-gray-400 hover:text-accent transition-colors hover:bg-accent-lighter rounded-lg" title="Editar">
                        <Pencil size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(broker.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors hover:bg-red-50 rounded-lg" 
                        title="Excluir"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
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
