"use client";

import { Search, Plus, Filter, MapPin, Bed, Bath, Car } from "lucide-react";
import Link from "next/link";

export default function Imoveis() {
  const properties = [
    { id: 1, title: "O Zenith Loft", address: "Centro da Cidade", price: "$825,000", beds: 2, baths: 2, parking: 1, sqft: "1.240", type: "Apartamento", status: "Destaque" },
    { id: 2, title: "Azure Heights Interior", address: "Centro da Cidade", price: "$849,000", beds: 3, baths: 2, parking: 2, sqft: "1.450", type: "Apartamento", status: "Disponível" },
    { id: 3, title: "Villa Nova Retreat", address: "Bairro Sul", price: "$1,200,000", beds: 4, baths: 3, parking: 3, sqft: "2.800", type: "Casa", status: "Novo" },
    { id: 4, title: "Sunset Boulevard Studio", address: "Zona Oeste", price: "$450,000", beds: 1, baths: 1, parking: 1, sqft: "650", type: "Studio", status: "Reservado" },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-background">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Gerenciamento de Imóveis</h1>
          <p className="text-text-muted text-sm mt-1">Visualize e edite a sua carteira de propriedades.</p>
        </div>
        <Link href="/imoveis/novo" className="bg-primary hover:bg-primary-light text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium transition-colors shadow-sm">
          <Plus size={18} />
          Adicionar Imóvel
        </Link>
      </header>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-wrap items-center gap-4 mb-8">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Pesquisar por nome ou ID..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-text-main hover:bg-gray-50">
          <Filter size={16} /> Filtros Avançados
        </button>
        <select className="border border-gray-200 rounded-lg px-4 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-accent bg-transparent">
          <option>Todos os Status</option>
          <option>Disponível</option>
          <option>Vendido</option>
          <option>Reservado</option>
        </select>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map((prop) => (
          <Link href={`/imoveis/${prop.id}`} key={prop.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group block">
            {/* Image Placeholder */}
            <div className="h-48 bg-gray-200 relative">
               <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-text-main text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                 {prop.status}
               </div>
               <div className="absolute bottom-3 right-3 bg-black/60 text-white font-bold px-3 py-1.5 rounded-lg backdrop-blur-sm shadow-sm">
                 {prop.price}
               </div>
            </div>
            
            {/* Content */}
            <div className="p-5">
              <div className="mb-4">
                <span className="text-[10px] text-accent font-bold uppercase tracking-wider">{prop.type}</span>
                <h3 className="text-lg font-bold text-text-main mt-1 truncate">{prop.title}</h3>
                <div className="flex items-center gap-1 text-text-muted mt-1.5">
                  <MapPin size={14} />
                  <span className="text-sm truncate">{prop.address}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-text-muted">
                <div className="flex items-center gap-1.5" title="Quartos">
                  <Bed size={16} />
                  <span className="text-sm font-medium">{prop.beds}</span>
                </div>
                <div className="flex items-center gap-1.5" title="Banheiros">
                  <Bath size={16} />
                  <span className="text-sm font-medium">{prop.baths}</span>
                </div>
                <div className="flex items-center gap-1.5" title="Vagas">
                  <Car size={16} />
                  <span className="text-sm font-medium">{prop.parking}</span>
                </div>
                <div className="flex items-center gap-1" title="Área">
                  <span className="text-sm font-bold">{prop.sqft}</span>
                  <span className="text-[10px] uppercase">m²</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
