"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  Eye,
  Loader2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

interface Broker {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  license: string;
  leads: number;
  properties: number;
  status: string;
}

export default function AdminCorretores() {
  const router = useRouter();
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterStatus, setFilterStatus] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBrokers = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch("http://localhost:3001/api/brokers", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (data.success) {
        setBrokers(data.data);
      } else {
        setError(data.message || "Erro ao carregar corretores.");
      }
    } catch (err) {
      setError("Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrokers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja remover este corretor? Esta ação não pode ser desfeita.")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3001/api/brokers/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (data.success) {
        setBrokers(brokers.filter(b => b.id !== id));
        alert("Corretor removido com sucesso!");
      } else {
        alert(data.message || "Erro ao remover corretor.");
      }
    } catch (err) {
      alert("Erro ao conectar ao servidor para excluir corretor.");
    }
  };

  const filteredBrokers = brokers.filter(b => {
    const matchesStatus = filterStatus === "Todos" || b.status === filterStatus;
    const matchesSearch = 
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.document.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.license && b.license.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesStatus && matchesSearch;
  });

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
        {loading ? (
          <div className="p-12 text-center flex flex-col items-center gap-3">
            <Loader2 className="animate-spin text-primary" size={32} />
            <p className="text-text-muted text-sm">Carregando corretores...</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center flex flex-col items-center gap-3">
            <AlertCircle className="text-red-500" size={32} />
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        ) : (
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
      )}
      </div>
    </div>
  );
}
