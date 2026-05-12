"use client";

import { ArrowLeft, CheckCircle, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NovaCampanha() {
  const [formData, setFormData] = useState({
    nome: "",
    publico: "",
    orcamento: "",
    inicio: "",
    fim: "",
    canais: "Email",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Campanha criada com sucesso!");
    // logic to save campaign
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-background">
      <header className="flex items-center gap-4 mb-8">
        <Link href="/" className="p-2 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-text-main hover:bg-gray-50 transition-colors shadow-sm">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-text-main">Criar Nova Campanha</h1>
          <p className="text-text-muted text-sm mt-1">Configure uma nova campanha de marketing para seus imóveis.</p>
        </div>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-text-main block">Nome da Campanha *</label>
              <input 
                required
                type="text" 
                placeholder="Ex: Lançamento Alto Padrão - Verão"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                value={formData.nome}
                onChange={e => setFormData({...formData, nome: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main block">Público-Alvo</label>
              <input 
                type="text" 
                placeholder="Ex: Investidores, Famílias"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                value={formData.publico}
                onChange={e => setFormData({...formData, publico: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main block">Orçamento</label>
              <input 
                type="text" 
                placeholder="Ex: R$ 5.000"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                value={formData.orcamento}
                onChange={e => setFormData({...formData, orcamento: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main block">Data de Início</label>
              <input 
                type="date" 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent text-text-main"
                value={formData.inicio}
                onChange={e => setFormData({...formData, inicio: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main block">Data de Fim</label>
              <input 
                type="date" 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent text-text-main"
                value={formData.fim}
                onChange={e => setFormData({...formData, fim: e.target.value})}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-text-main block">Canais de Comunicação</label>
              <select 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent text-text-main"
                value={formData.canais}
                onChange={e => setFormData({...formData, canais: e.target.value})}
              >
                <option value="Email">Email Marketing</option>
                <option value="WhatsApp">WhatsApp Message</option>
                <option value="Social">Redes Sociais (Ads)</option>
                <option value="Multi">Múltiplos Canais</option>
              </select>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-end gap-3">
            <Link href="/" className="px-5 py-2.5 text-sm font-medium text-text-main bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
              <X size={16} /> Cancelar
            </Link>
            <button type="submit" className="px-5 py-2.5 text-sm font-medium text-white bg-primary rounded-xl hover:bg-primary-light transition-colors flex items-center gap-2 shadow-sm">
              <CheckCircle size={16} /> Criar Campanha
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
