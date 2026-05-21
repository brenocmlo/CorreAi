"use client";

import { useState } from "react";
import { 
  Home, 
  Search, 
  Filter, 
  MoreVertical, 
  MapPin, 
  User, 
  DollarSign, 
  Bed, 
  Bath, 
  Maximize2,
  Building 
} from "lucide-react";
import Link from "next/link";

export default function AdminImoveis() {
  const [properties, setProperties] = useState([
    { id: 1, title: "O Zenith Loft", address: "Centro da Cidade", price: "R$ 825.000", broker: "Ricardo Mendes", type: "Apartamento", status: "Destaque", beds: 2, baths: 2, area: 120 },
    { id: 2, title: "Azure Heights Interior", address: "Centro da Cidade", price: "R$ 849.000", broker: "Ana Paula", type: "Apartamento", status: "Disponível", beds: 3, baths: 2, area: 145 },
    { id: 3, title: "Villa Nova Retreat", address: "Bairro Sul", price: "R$ 1.200.000", broker: "Fernanda Costa", type: "Casa", status: "Novo", beds: 4, baths: 3, area: 280 },
    { id: 4, title: "Sunset Boulevard Studio", address: "Zona Oeste", price: "R$ 450.000", broker: "Ricardo Mendes", type: "Studio", status: "Reservado", beds: 1, baths: 1, area: 65 },
  ]);

  const [showFilter, setShowFilter] = useState(false);
  const [filterType, setFilterType] = useState("Todos os Tipos");

  const filteredProperties = filterType === "Todos os Tipos" 
    ? properties 
    : properties.filter(p => p.type === filterType);

  return (
    <div className="flex-1 overflow-y-auto bg-[#f8fafc] p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-main flex items-center gap-2">
            <Home className="text-primary" />
            Carteira Global de Imóveis
          </h1>
          <p className="text-text-muted text-sm mt-1">Gerencie todo o inventário de propriedades dos seus corretores.</p>
        </div>
        <Link href="/admin/imoveis/novo" className="bg-primary hover:bg-primary-light text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold transition-all shadow-lg shadow-primary/20">
          <Building size={18} />
          Adicionar Imóvel
        </Link>
      </header>

      {/* Control Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar imóveis por título, endereço ou proprietário..." 
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
          />
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 px-5 py-3 border border-gray-100 rounded-xl text-sm font-bold text-text-main hover:bg-gray-50 transition-colors bg-white shadow-sm"
          >
            <Filter size={18} /> {filterType}
          </button>

          {showFilter && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-20">
              {["Todos os Tipos", "Apartamento", "Casa", "Studio", "Terreno"].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setFilterType(type);
                    setShowFilter(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 ${
                    filterType === type ? "text-accent font-bold" : "text-text-muted"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid of properties */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredProperties.map((prop) => (
          <div key={prop.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 flex gap-6 hover:shadow-md transition-shadow group">
            <div className="w-48 h-40 bg-gray-100 rounded-2xl overflow-hidden relative shrink-0">
               <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[9px] font-black text-primary px-2 py-1 rounded-md uppercase tracking-wider">
                 {prop.status}
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black text-accent uppercase tracking-widest">{prop.type}</span>
                    <h3 className="text-lg font-bold text-text-main mt-1 group-hover:text-primary transition-colors">{prop.title}</h3>
                    <p className="text-sm text-text-muted flex items-center gap-1 mt-1">
                      <MapPin size={14} className="text-gray-300" />
                      {prop.address}
                    </p>
                  </div>
                  <button className="text-gray-300 hover:text-primary transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-1 text-xs text-text-muted font-medium">
                    <Bed size={14} className="text-gray-400" /> {prop.beds} Qts
                  </div>
                  <div className="flex items-center gap-1 text-xs text-text-muted font-medium">
                    <Bath size={14} className="text-gray-400" /> {prop.baths} Ban
                  </div>
                  <div className="flex items-center gap-1 text-xs text-text-muted font-medium">
                    <Maximize2 size={14} className="text-gray-400" /> {prop.area}m²
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">
                    {prop.broker.charAt(0)}
                  </div>
                  <span className="text-xs font-bold text-text-main">{prop.broker}</span>
                </div>
                <div className="text-lg font-black text-primary flex items-center gap-1">
                  <span className="text-xs font-medium text-text-muted italic">R$</span>
                  {prop.price.replace("R$ ", "")}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
