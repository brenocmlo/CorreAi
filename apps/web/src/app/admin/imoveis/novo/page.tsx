"use client";

import { ArrowLeft, Save, X, Building, MapPin, DollarSign, Camera, Layout } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NovoImovelAdmin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    price: "",
    type: "Apartamento",
    description: "",
    broker: "",
    beds: "",
    baths: "",
    area: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Imóvel cadastrado com sucesso e atribuído ao corretor!");
    router.push("/admin/imoveis");
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-[#f8fafc]">
      <header className="flex items-center gap-4 mb-8">
        <Link href="/admin/imoveis" className="p-2 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-text-main hover:bg-gray-50 transition-colors shadow-sm">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-text-main">Cadastrar Novo Imóvel</h1>
          <p className="text-text-muted text-sm mt-1">Adicione uma nova propriedade à carteira global do sistema.</p>
        </div>
      </header>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Property Info */}
            <div className="space-y-4 md:col-span-2">
               <h3 className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2">
                 <Building size={14} /> Detalhes da Propriedade
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2 md:col-span-2">
                   <label className="text-sm font-bold text-text-main block ml-1">Título do Anúncio *</label>
                   <input 
                     required
                     type="text" 
                     placeholder="Ex: Loft Moderno no Centro"
                     className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                     value={formData.title}
                     onChange={e => setFormData({...formData, title: e.target.value})}
                   />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-text-main block ml-1">Tipo de Imóvel</label>
                    <select 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-text-main"
                      value={formData.type}
                      onChange={e => setFormData({...formData, type: e.target.value})}
                    >
                      <option>Apartamento</option>
                      <option>Casa</option>
                      <option>Studio</option>
                      <option>Terreno</option>
                      <option>Comercial</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-text-main block ml-1">Preço de Venda (R$)</label>
                   <div className="relative">
                     <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                     <input 
                       type="text" 
                       placeholder="850.000"
                       className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                       value={formData.price}
                       onChange={e => setFormData({...formData, price: e.target.value})}
                     />
                   </div>
                 </div>
               </div>
            </div>

            {/* Location & Broker */}
            <div className="space-y-4 md:col-span-2 pt-4 border-t border-gray-50">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-text-main block ml-1">Endereço Completo</label>
                   <div className="relative">
                     <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                     <input 
                       type="text" 
                       className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                       value={formData.address}
                       onChange={e => setFormData({...formData, address: e.target.value})}
                     />
                   </div>
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-text-main block ml-1">Atribuir ao Corretor</label>
                   <select 
                     className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-text-main"
                     value={formData.broker}
                     onChange={e => setFormData({...formData, broker: e.target.value})}
                   >
                     <option value="">Selecione um corretor...</option>
                     <option>Ricardo Mendes</option>
                     <option>Ana Paula</option>
                     <option>Fernanda Costa</option>
                   </select>
                 </div>
               </div>
            </div>

            {/* Characteristics */}
            <div className="space-y-4 md:col-span-2 pt-4 border-t border-gray-50">
               <h3 className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2">
                 <Layout size={14} /> Características
               </h3>
               <div className="grid grid-cols-3 gap-6">
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-text-main block">Quartos</label>
                   <input type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-text-main block">Banheiros</label>
                   <input type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-text-main block">Área (m²)</label>
                   <input type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent" />
                 </div>
               </div>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-gray-50 flex items-center justify-end gap-4">
            <Link href="/admin/imoveis" className="px-6 py-3 text-sm font-bold text-text-main bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
              <X size={18} /> Cancelar
            </Link>
            <button type="submit" className="px-8 py-3 text-sm font-bold text-white bg-primary rounded-xl hover:bg-primary-light transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
              <Save size={18} /> Cadastrar Imóvel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
