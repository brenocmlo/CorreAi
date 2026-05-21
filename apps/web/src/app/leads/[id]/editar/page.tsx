"use client";

import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditarLead() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    orcamento: "",
    interesse: "Apartamento",
  });

  // Mock data fetching
  useEffect(() => {
    // In a real app, you would fetch the lead by ID
    const leads = [
      { id: 1, name: "Sarah Jenkins", email: "sarah.j@example.com", phone: "+1 555-0123", stage: "Visita Agendada", score: 94, budget: "R$ 800k - 1M", lastActive: "Há 10 min", interest: "Apartamento" },
      { id: 2, name: "Marcus Thorne", email: "m.thorne@example.com", phone: "+1 555-0198", stage: "Em Negociação", score: 85, budget: "R$ 1.5M - 2M", lastActive: "Ontem", interest: "Casa" },
      { id: 3, name: "Elena Rodriguez", email: "elena.rod@example.com", phone: "+1 555-0144", stage: "Novo Lead", score: 45, budget: "R$ 500k - 700k", lastActive: "Há 3 horas", interest: "Studio" },
      { id: 4, name: "James Wilson", email: "j.wilson@example.com", phone: "+1 555-0177", stage: "Proposta Enviada", score: 72, budget: "R$ 900k - 1.2M", lastActive: "Há 2 dias", interest: "Apartamento" },
    ];

    const lead = leads.find(l => l.id === Number(id));
    if (lead) {
      setFormData({
        nome: lead.name,
        email: lead.email,
        telefone: lead.phone,
        orcamento: lead.budget,
        interesse: lead.interest || "Apartamento",
      });
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Lead atualizado com sucesso!");
    router.push("/leads");
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-background">
      <header className="flex items-center gap-4 mb-8">
        <Link href="/leads" className="p-2 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-text-main hover:bg-gray-50 transition-colors shadow-sm">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-text-main">Editar Lead</h1>
          <p className="text-text-muted text-sm mt-1">Atualize as informações do contato no sistema.</p>
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
            <button type="submit" className="px-5 py-2.5 text-sm font-medium text-white bg-primary rounded-xl hover:bg-primary-light transition-colors flex items-center gap-2 shadow-sm">
              <Save size={16} /> Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
