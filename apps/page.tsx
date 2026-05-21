import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import ChatbotWidget from "@/components/ChatbotWidget";
import { Sparkles, MapPin, Building2, Wallet } from "lucide-react";

export default function Home() {
  const recommendedProperties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
      price: "R$ 1.250.000",
      address: "Rua das Flores, 123 - Jardins, São Paulo",
      beds: 3,
      baths: 2,
      parking: 2,
      type: "Venda" as const,
      matchPercentage: 98,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
      price: "R$ 4.500/mês",
      address: "Av. Paulista, 1000 - Bela Vista, São Paulo",
      beds: 2,
      baths: 1,
      parking: 1,
      type: "Aluguel" as const,
      matchPercentage: 92,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1600607687931-cebf10cbdbcb?auto=format&fit=crop&q=80&w=800",
      price: "R$ 850.000",
      address: "Rua Augusta, 500 - Consolação, São Paulo",
      beds: 1,
      baths: 1,
      parking: 1,
      type: "Venda" as const,
      matchPercentage: 88,
    },
  ];

  return (
    <main className="min-h-screen bg-background pb-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 w-full mt-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6 leading-tight">
            Encontre o imóvel ideal com <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">
              Inteligência Artificial
            </span>
          </h1>
          <p className="text-lg text-slate-300 text-center mb-12 max-w-2xl mx-auto">
            Nossa IA analisa seu perfil e encontra as melhores opções do mercado que dão match com o seu estilo de vida.
          </p>

          {/* Search Box */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-4">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
              <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-accent">
                <option>Comprar</option>
                <option>Alugar</option>
              </select>
              
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-700 focus:outline-none focus:border-accent appearance-none">
                  <option>Tipo de Imóvel</option>
                  <option>Casa</option>
                  <option>Apartamento</option>
                  <option>Terreno</option>
                </select>
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Localização"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-700 focus:outline-none focus:border-accent"
                />
              </div>

              <div className="relative">
                <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-700 focus:outline-none focus:border-accent appearance-none">
                  <option>Faixa de Preço</option>
                  <option>Até R$ 500k</option>
                  <option>R$ 500k a 1M</option>
                  <option>Acima de 1M</option>
                </select>
              </div>
            </div>

            <button className="bg-gradient-to-r from-accent to-sky-600 hover:from-sky-500 hover:to-sky-700 text-white font-semibold px-8 py-3 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] shadow-lg shadow-accent/30 whitespace-nowrap">
              <Sparkles className="w-5 h-5" />
              Pesquisar com IA
            </button>
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Recomendações da IA</h2>
            <p className="text-slate-500 mt-2">Imóveis selecionados especialmente para você</p>
          </div>
          <button className="text-accent font-semibold hover:text-sky-600 transition-colors">
            Ver todos os matches &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendedProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </section>

      <ChatbotWidget context="cliente" />
    </main>
  );
}
