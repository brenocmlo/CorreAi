"use client";

import { ArrowLeft, Save, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NovoLead() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    orcamento: "",
    interesse: "Apartamento",
  });

  const parseNumericValue = (value: string | number): number | null => {
    if (value === undefined || value === null) return null;
    const str = String(value).replace(/[^\d,.-]/g, "");
    if (!str) return null;
    let normalized = str;
    if (str.includes(",")) {
      normalized = str.replace(/\./g, "").replace(",", ".");
    } else {
      const parts = str.split(".");
      if (parts.length > 2) {
        normalized = str.replace(/\./g, "");
      } else if (parts.length === 2) {
        if (parts[1].length === 3) {
          normalized = str.replace(/\./g, "");
        }
      }
    }
    const parsed = Number(normalized);
    return isNaN(parsed) ? null : parsed;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      let apiType = "APARTMENT";
      if (formData.interesse === "Casa") apiType = "HOUSE";
      else if (formData.interesse === "Studio") apiType = "OTHER";
      else if (formData.interesse === "Terreno") apiType = "LAND";
      else if (formData.interesse === "Comercial") apiType = "COMMERCIAL";

      const response = await fetch("http://localhost:3001/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.nome,
          email: formData.email || null,
          phone: formData.telefone,
          budgetMin: 0,
          budgetMax: parseNumericValue(formData.orcamento),
          locationInterest: null,
          propertyTypePref: [apiType]
        })
      });

      const result = await response.json();
      if (response.ok && result.success) {
        alert("Lead cadastrado com sucesso!");
        router.push("/leads");
      } else {
        alert(result.message || "Erro ao cadastrar lead.");
      }
    } catch (err) {
      console.error(err);
      alert("Não foi possível conectar ao servidor.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-background">
      <header className="flex items-center gap-4 mb-8">
        <Link href="/leads" className="p-2 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-text-main hover:bg-gray-50 transition-colors shadow-sm">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-text-main">Cadastrar Novo Lead</h1>
          <p className="text-text-muted text-sm mt-1">Insira as informações do novo contato no sistema.</p>
        </div>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main block">Nome Completo *</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                value={formData.nome}
                onChange={e => setFormData({...formData, nome: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main block">Email *</label>
              <input 
                required
                type="email" 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main block">Telefone</label>
              <input 
                type="tel" 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                value={formData.telefone}
                onChange={e => setFormData({...formData, telefone: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main block">Orçamento Estimado</label>
              <input 
                type="text" 
                placeholder="Ex: R$ 800.000"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                value={formData.orcamento}
                onChange={e => setFormData({...formData, orcamento: e.target.value})}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-text-main block">Tipo de Imóvel de Interesse</label>
              <select 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent text-text-main"
                value={formData.interesse}
                onChange={e => setFormData({...formData, interesse: e.target.value})}
              >
                <option value="Apartamento">Apartamento</option>
                <option value="Casa">Casa</option>
                <option value="Studio">Studio</option>
                <option value="Terreno">Terreno</option>
                <option value="Comercial">Comercial</option>
              </select>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-end gap-3">
            <Link href="/leads" className="px-5 py-2.5 text-sm font-medium text-text-main bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
              <X size={16} /> Cancelar
            </Link>
            <button 
              type="submit" 
              disabled={submitting}
              className="px-5 py-2.5 text-sm font-medium text-white bg-primary rounded-xl hover:bg-primary-light transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Salvando...
                </>
              ) : (
                <>
                  <Save size={16} /> Salvar Lead
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
