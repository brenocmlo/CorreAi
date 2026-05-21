import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import PropertyCard from "@/components/PropertyCard";
import ChatbotWidget from "@/components/ChatbotWidget";
import { Users, Eye, TrendingUp, DollarSign, Sparkles, ArrowRight } from "lucide-react";

export default function BrokerDashboard() {
  const metrics = [
    { label: "Leads Cadastrados", value: "1,284", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Visitas Agendadas", value: "32", icon: Eye, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Taxa de Conversão", value: "12.5%", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Faturamento Previsto", value: "R$ 4.5M", icon: DollarSign, color: "text-amber-500", bg: "bg-amber-50" },
  ];

  const brokerProperties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
      price: "R$ 1.250.000",
      address: "Rua das Flores, 123 - Jardins",
      beds: 3,
      baths: 2,
      parking: 2,
      type: "Venda" as const,
      status: "Disponível" as const,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
      price: "R$ 4.500/mês",
      address: "Av. Paulista, 1000 - Bela Vista",
      beds: 2,
      baths: 1,
      parking: 1,
      type: "Aluguel" as const,
      status: "Reservado" as const,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1600607687931-cebf10cbdbcb?auto=format&fit=crop&q=80&w=800",
      price: "R$ 850.000",
      address: "Rua Augusta, 500 - Consolação",
      beds: 1,
      baths: 1,
      parking: 1,
      type: "Venda" as const,
      status: "Vendido" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Fixed */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />

        <main className="p-8 flex-1 overflow-y-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Visão Geral</h1>
            <p className="text-slate-500">Acompanhe seus resultados e a performance da IA hoje.</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all">
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">{metric.label}</p>
                    <h3 className="text-2xl font-bold text-slate-800">{metric.value}</h3>
                    <div className="flex items-center gap-1 text-emerald-500 text-xs font-medium mt-2">
                      <TrendingUp className="w-3 h-3" />
                      <span>+2.4% hoje</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${metric.bg} ${metric.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI Banner */}
          <div className="bg-gradient-to-r from-accent to-blue-600 rounded-2xl p-8 text-white mb-8 flex flex-col md:flex-row items-center justify-between shadow-lg relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

            <div className="relative z-10 flex items-center gap-4 mb-4 md:mb-0">
              <div className="w-14 h-14 bg-white/20 rounded-xl backdrop-blur-sm flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Gerar Descrições Automáticas</h3>
                <p className="text-white/80 mt-1 max-w-xl">Deixe que a IA do CorreAi crie descrições altamente persuasivas para seus novos imóveis em segundos.</p>
              </div>
            </div>

            <button className="relative z-10 bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105 flex items-center gap-2">
              Testar Agora <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Properties Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Meus Imóveis Recentes</h2>
              <button className="text-sm font-semibold text-accent hover:text-sky-600">Ver todos</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brokerProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </div>
        </main>
      </div>

      <ChatbotWidget context="corretor" />
    </div>
  );
}
