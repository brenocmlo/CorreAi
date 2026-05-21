import Navbar from "@/components/Navbar";
import ChatbotWidget from "@/components/ChatbotWidget";
import FavoriteButton from "@/components/FavoriteButton";
import { MapPin, Bed, Bath, Car, Maximize, CheckCircle2, Phone, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function PropertyDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  // Mock do primeiro anúncio
  const property = {
    id: resolvedParams.id,
    title: "Casa de Alto Padrão com Piscina",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1920",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600607687931-cebf10cbdbcb?auto=format&fit=crop&q=80&w=800"
    ],
    price: "R$ 1.250.000",
    address: "Rua das Flores, 123 - Jardins, São Paulo",
    description: "Excelente residência de alto padrão localizada em um dos bairros mais nobres da cidade. O imóvel conta com acabamentos de primeira linha, ampla área de lazer com piscina aquecida, espaço gourmet integrado, e um projeto de iluminação que valoriza cada ambiente. Ideal para quem busca conforto e sofisticação para a família.",
    beds: 3,
    baths: 2,
    parking: 2,
    area: "180",
    type: "Venda",
    amenities: [
      "Piscina Aquecida", "Espaço Gourmet", "Ar Condicionado", 
      "Segurança 24h", "Móveis Planejados", "Churrasqueira"
    ]
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* O Navbar padrão foi feito com absolute e texto branco, então para essa página com fundo branco, precisamos usar uma barra escura ou ajustar.
          Como é uma página interna, vamos criar um Header simples. */}
      <div className="bg-primary px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-white flex items-center gap-2 hover:text-accent transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar para busca</span>
          </Link>
          <span className="text-xl font-bold text-white tracking-tight">
            Corre<span className="text-accent">Ai</span>
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        {/* Title & Price */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-accent/10 text-accent font-semibold px-3 py-1 rounded-full text-sm">
                {property.type}
              </span>
              <span className="bg-emerald-100 text-emerald-700 font-semibold px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Verificado
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">{property.title}</h1>
            <p className="text-slate-500 flex items-center gap-2 mt-2">
              <MapPin className="w-4 h-4" /> {property.address}
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-left md:text-right flex items-center md:items-end gap-6">
            <div>
              <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Valor</p>
              <h2 className="text-4xl font-bold text-accent">{property.price}</h2>
            </div>
            <FavoriteButton />
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 h-[400px] md:h-[500px]">
          <div className="md:col-span-2 h-full rounded-2xl overflow-hidden relative group">
            <img src={property.images[0]} alt="Principal" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="hidden md:flex flex-col gap-4 h-full">
            <div className="flex-1 rounded-2xl overflow-hidden relative group">
              <img src={property.images[1]} alt="Interior 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="flex-1 rounded-2xl overflow-hidden relative group">
              <img src={property.images[2]} alt="Interior 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-primary/40 flex items-center justify-center cursor-pointer hover:bg-primary/50 transition-colors">
                <span className="text-white font-semibold flex items-center gap-2">
                  Ver todas as fotos
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* Main Features */}
            <div className="flex flex-wrap items-center gap-8 py-6 border-y border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-slate-100 rounded-xl text-slate-600"><Bed className="w-6 h-6" /></div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{property.beds}</p>
                  <p className="text-sm text-slate-500">Quartos</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-slate-100 rounded-xl text-slate-600"><Bath className="w-6 h-6" /></div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{property.baths}</p>
                  <p className="text-sm text-slate-500">Banheiros</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-slate-100 rounded-xl text-slate-600"><Car className="w-6 h-6" /></div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{property.parking}</p>
                  <p className="text-sm text-slate-500">Vagas</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-slate-100 rounded-xl text-slate-600"><Maximize className="w-6 h-6" /></div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{property.area} <span className="text-lg">m²</span></p>
                  <p className="text-sm text-slate-500">Área útil</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Sobre o Imóvel</h3>
              <p className="text-slate-600 leading-relaxed text-lg">{property.description}</p>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Diferenciais</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="relative">
            <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Gostou deste imóvel?</h3>
              <p className="text-slate-500 text-sm mb-6">Entre em contato com o corretor responsável para agendar uma visita.</p>
              
              <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold border border-accent/20">
                  JC
                </div>
                <div>
                  <p className="font-semibold text-slate-800">João Corretor</p>
                  <p className="text-xs text-slate-500">Especialista em Alto Padrão</p>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-accent hover:bg-sky-600 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  <Phone className="w-5 h-5" />
                  Ver Telefone
                </button>
                <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  <Calendar className="w-5 h-5" />
                  Agendar Visita
                </button>
              </div>

              <div className="mt-6 text-center text-xs text-slate-400">
                Código do anúncio: CA-10293
              </div>
            </div>
          </div>
        </div>
      </div>

      <ChatbotWidget context="cliente" />
    </main>
  );
}
