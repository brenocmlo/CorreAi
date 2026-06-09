"use client";

import { Search, Plus, Filter, MapPin, Bed, Bath, Car, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Property {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  price: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  parkingSpots: number;
  address: string;
  city: string;
  state: string;
}

export default function Imoveis() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Todos os Status");

  const fetchProperties = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch("http://localhost:3001/api/properties", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (data.success) {
        setProperties(data.data);
      } else {
        setError(data.message || "Erro ao carregar imóveis.");
      }
    } catch (err) {
      setError("Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter((prop) => {
    const matchesSearch = 
      prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = 
      filterStatus === "Todos os Status" || 
      (filterStatus === "Disponível" && prop.status === "AVAILABLE") ||
      (filterStatus === "Vendido" && prop.status === "SOLD") ||
      (filterStatus === "Reservado" && prop.status === "RESERVED");

    return matchesSearch && matchesStatus;
  });

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "AVAILABLE": return "Disponível";
      case "SOLD": return "Vendido";
      case "RESERVED": return "Reservado";
      case "RENTED": return "Alugado";
      case "INACTIVE": return "Inativo";
      default: return status;
    }
  };

  const getPropertyTypeLabel = (type: string) => {
    switch (type) {
      case "HOUSE": return "Casa";
      case "APARTMENT": return "Apartamento";
      case "COMMERCIAL": return "Comercial";
      case "LAND": return "Terreno";
      default: return "Outro";
    }
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(Number(price));
  };

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
            placeholder="Pesquisar por nome ou endereço..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-accent bg-transparent"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="Todos os Status">Todos os Status</option>
          <option value="Disponível">Disponível</option>
          <option value="Vendido">Vendido</option>
          <option value="Reservado">Reservado</option>
        </select>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-10 h-10 text-accent animate-spin" />
          <p className="text-slate-500 font-semibold text-sm">Buscando imóveis no banco de dados...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <AlertCircle className="w-10 h-10 text-red-500" />
          <p className="text-red-500 font-semibold text-sm">{error}</p>
        </div>
      ) : filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map((prop) => (
            <Link href={`/imoveis/${prop.id}`} key={prop.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group block">
              {/* Image Placeholder */}
              <div className="h-48 bg-gray-100 relative flex items-center justify-center border-b border-gray-50">
                 <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-text-main text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                   {getStatusLabel(prop.status)}
                 </div>
                 <div className="absolute bottom-3 right-3 bg-black/60 text-white font-bold px-3 py-1.5 rounded-lg backdrop-blur-sm shadow-sm text-sm">
                   {formatPrice(prop.price)}
                 </div>
                 <MapPin className="text-gray-300 w-12 h-12" />
              </div>
              
              {/* Content */}
              <div className="p-5">
                <div className="mb-4">
                  <span className="text-[10px] text-accent font-bold uppercase tracking-wider">{getPropertyTypeLabel(prop.type)}</span>
                  <h3 className="text-lg font-bold text-text-main mt-1 truncate">{prop.title}</h3>
                  <div className="flex items-center gap-1 text-text-muted mt-1.5">
                    <MapPin size={14} />
                    <span className="text-sm truncate">{prop.address}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-text-muted">
                  <div className="flex items-center gap-1.5" title="Quartos">
                    <Bed size={16} />
                    <span className="text-sm font-medium">{prop.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Banheiros">
                    <Bath size={16} />
                    <span className="text-sm font-medium">{prop.bathrooms}</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Vagas">
                    <Car size={16} />
                    <span className="text-sm font-medium">{prop.parkingSpots}</span>
                  </div>
                  <div className="flex items-center gap-1" title="Área">
                    <span className="text-sm font-bold">{prop.area}</span>
                    <span className="text-[10px] uppercase">m²</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mx-auto">
            <Plus size={28} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-base">Nenhum imóvel encontrado</h4>
            <p className="text-slate-500 text-sm mt-1">Cadastre um imóvel ou ajuste os seus filtros.</p>
          </div>
        </div>
      )}
    </div>
  );
}
