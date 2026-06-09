"use client";

import { ArrowLeft, MapPin, Bed, Bath, Car, Phone, Mail, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

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

export default function DetalheImovel() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProperty() {
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
          const found = data.data.find((p: any) => p.id === id);
          if (found) {
            setProperty(found);
          } else {
            setError("Imóvel não encontrado.");
          }
        } else {
          setError(data.message || "Erro ao carregar detalhes.");
        }
      } catch (err) {
        setError("Não foi possível conectar ao servidor.");
      } finally {
        setLoading(false);
      }
    }
    if (id) loadProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-background gap-4">
        <Loader2 className="w-10 h-10 text-accent animate-spin" />
        <p className="text-slate-500 font-semibold text-sm">Carregando detalhes do imóvel...</p>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-background gap-4">
        <AlertCircle className="w-10 h-10 text-red-500" />
        <p className="text-red-500 font-semibold text-sm">{error || "Imóvel não encontrado."}</p>
        <Link href="/imoveis" className="text-accent underline font-semibold">Voltar para Imóveis</Link>
      </div>
    );
  }

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
      <header className="flex items-center gap-4 mb-8">
        <Link href="/imoveis" className="p-2 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-text-main hover:bg-gray-50 transition-colors shadow-sm">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-text-main">Detalhes do Imóvel</h1>
          <p className="text-text-muted text-sm mt-1">ID da propriedade: #{property.id}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Image */}
          <div className="bg-gray-200 rounded-2xl h-[400px] w-full relative overflow-hidden flex items-center justify-center">
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-text-main text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wide shadow-sm">
              {getStatusLabel(property.status)}
            </div>
            <div className="absolute bottom-4 right-4 bg-black/60 text-white font-bold px-4 py-2 rounded-lg backdrop-blur-sm shadow-sm text-lg">
              {formatPrice(property.price)}
            </div>
            <MapPin className="text-gray-300 w-24 h-24" />
          </div>
          
          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map((i) => (
              <div key={i} className="bg-gray-100 h-24 rounded-xl border border-gray-200 flex items-center justify-center text-gray-300 hover:opacity-80 transition-opacity">
                <MapPin size={20} />
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs text-accent font-bold uppercase tracking-wider">{getPropertyTypeLabel(property.type)}</span>
                <h2 className="text-3xl font-bold text-text-main mt-1">{property.title}</h2>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-text-muted mb-8">
              <MapPin size={18} />
              <span>{property.address}</span>
            </div>

            <div className="flex items-center gap-8 py-6 border-y border-gray-100 mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-50 rounded-xl text-gray-500"><Bed size={24} /></div>
                <div>
                  <p className="text-xs text-text-muted font-medium uppercase tracking-wide">Quartos</p>
                  <p className="text-lg font-bold text-text-main">{property.bedrooms}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-50 rounded-xl text-gray-500"><Bath size={24} /></div>
                <div>
                  <p className="text-xs text-text-muted font-medium uppercase tracking-wide">Banheiros</p>
                  <p className="text-lg font-bold text-text-main">{property.bathrooms}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-50 rounded-xl text-gray-500"><Car size={24} /></div>
                <div>
                  <p className="text-xs text-text-muted font-medium uppercase tracking-wide">Vagas</p>
                  <p className="text-lg font-bold text-text-main">{property.parkingSpots}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-50 rounded-xl text-gray-500"><span className="font-bold text-xl leading-none">m²</span></div>
                <div>
                  <p className="text-xs text-text-muted font-medium uppercase tracking-wide">Área</p>
                  <p className="text-lg font-bold text-text-main">{property.area}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-main mb-4">Descrição</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {property.description}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-lg text-text-main mb-6">Corretor Responsável</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                C
              </div>
              <div>
                <h4 className="font-bold text-text-main">Seu Corretor</h4>
                <p className="text-sm text-text-muted">Corretor Responsável</p>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white py-3 rounded-xl font-medium transition-colors">
                <Phone size={18} />
                Ligar Agora
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-text-main py-3 rounded-xl font-medium transition-colors">
                <Mail size={18} />
                Enviar Mensagem
              </button>
            </div>
          </div>
          
          <div className="bg-accent-lighter/50 rounded-2xl p-6 border border-accent-lighter">
            <h3 className="font-bold text-lg text-text-main mb-2">Interesse de Leads</h3>
            <p className="text-sm text-text-muted mb-4">leads visualizaram este imóvel recentemente.</p>
            <Link href="/leads" className="text-accent font-medium text-sm hover:underline">
              Ver leads compatíveis &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
