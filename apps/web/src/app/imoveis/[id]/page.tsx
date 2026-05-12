"use client";

import { ArrowLeft, MapPin, Bed, Bath, Car, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function DetalheImovel() {
  const params = useParams();
  const id = params.id;
  
  // mock data to simulate fetch
  const property = { 
    id, 
    title: "O Zenith Loft", 
    address: "Rua das Flores, 123 - Centro da Cidade", 
    price: "$825,000", 
    beds: 2, 
    baths: 2, 
    parking: 1, 
    sqft: "1.240", 
    type: "Apartamento", 
    status: "Destaque",
    description: "Excelente apartamento no coração da cidade com vista panorâmica. Possui acabamentos de luxo, varanda gourmet, e área de lazer completa no condomínio. Perfeito para quem busca conforto e praticidade no dia a dia. Com acesso a escolas, shoppings e hospitais. Uma oportunidade única de morar bem.",
    images: [
      "/placeholder1.jpg",
      "/placeholder2.jpg"
    ]
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
          <div className="bg-gray-200 rounded-2xl h-[400px] w-full relative overflow-hidden">
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-text-main text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wide shadow-sm">
              {property.status}
            </div>
            <div className="absolute bottom-4 right-4 bg-black/60 text-white font-bold px-4 py-2 rounded-lg backdrop-blur-sm shadow-sm text-lg">
              {property.price}
            </div>
          </div>
          
          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map((i) => (
              <div key={i} className="bg-gray-200 h-24 rounded-xl cursor-pointer hover:opacity-80 transition-opacity"></div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs text-accent font-bold uppercase tracking-wider">{property.type}</span>
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
                  <p className="text-lg font-bold text-text-main">{property.beds}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-50 rounded-xl text-gray-500"><Bath size={24} /></div>
                <div>
                  <p className="text-xs text-text-muted font-medium uppercase tracking-wide">Banheiros</p>
                  <p className="text-lg font-bold text-text-main">{property.baths}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-50 rounded-xl text-gray-500"><Car size={24} /></div>
                <div>
                  <p className="text-xs text-text-muted font-medium uppercase tracking-wide">Vagas</p>
                  <p className="text-lg font-bold text-text-main">{property.parking}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-50 rounded-xl text-gray-500"><span className="font-bold text-xl leading-none">m²</span></div>
                <div>
                  <p className="text-xs text-text-muted font-medium uppercase tracking-wide">Área</p>
                  <p className="text-lg font-bold text-text-main">{property.sqft}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-main mb-4">Descrição</h3>
              <p className="text-gray-600 leading-relaxed">
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
                DC
              </div>
              <div>
                <h4 className="font-bold text-text-main">David Chen</h4>
                <p className="text-sm text-text-muted">Especialista em Luxo</p>
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
            <p className="text-sm text-text-muted mb-4">12 leads visualizaram este imóvel nos últimos 7 dias.</p>
            <Link href="/leads" className="text-accent font-medium text-sm hover:underline">
              Ver leads compatíveis &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
