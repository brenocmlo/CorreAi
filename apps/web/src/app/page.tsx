"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import ChatbotWidget from "@/components/ChatbotWidget";
import { 
  Search, 
  Sparkles, 
  MapPin, 
  DollarSign, 
  User, 
  Mail, 
  Phone, 
  Check, 
  ChevronRight, 
  Loader2, 
  Building, 
  Compass, 
  HelpCircle,
  Home
} from "lucide-react";

// Mock properties fallback for beautiful vitrine if API is empty
const MOCK_PROPERTIES = [
  {
    id: "cobertura-jardins",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    price: "R$ 2.450.000",
    address: "Alameda Lorena, 1420 - Jardins, São Paulo",
    beds: 3,
    baths: 4,
    parking: 3,
    type: "Venda" as const,
    matchPercentage: 98,
    status: "Disponível" as const
  },
  {
    id: "casa-alphaville",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    price: "R$ 3.800.000",
    address: "Alameda dos Pinheiros, 45 - Alphaville, Barueri",
    beds: 4,
    baths: 5,
    parking: 4,
    type: "Venda" as const,
    matchPercentage: 95,
    status: "Disponível" as const
  },
  {
    id: "loft-pinheiros",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800",
    price: "R$ 980.000",
    address: "Rua Simão Álvares, 720 - Pinheiros, São Paulo",
    beds: 2,
    baths: 2,
    parking: 1,
    type: "Venda" as const,
    matchPercentage: 92,
    status: "Disponível" as const
  },
  {
    id: "studio-itaim",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800",
    price: "R$ 580.000",
    address: "Rua João Cachoeira, 310 - Itaim Bibi, São Paulo",
    beds: 1,
    baths: 1,
    parking: 1,
    type: "Venda" as const,
    matchPercentage: 89,
    status: "Disponível" as const
  },
  {
    id: "casa-campo-braganca",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
    price: "R$ 1.850.000",
    address: "Condomínio Quinta da Baroneza - Bragança Paulista",
    beds: 5,
    baths: 6,
    parking: 6,
    type: "Venda" as const,
    matchPercentage: 96,
    status: "Disponível" as const
  },
  {
    id: "apt-rent-vila-madalena",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800",
    price: "R$ 6.500 /mês",
    address: "Rua Aspicuelta, 150 - Vila Madalena, São Paulo",
    beds: 2,
    baths: 2,
    parking: 1,
    type: "Aluguel" as const,
    matchPercentage: 90,
    status: "Disponível" as const
  }
];

const PROPERTY_TYPES = [
  { value: "HOUSE", label: "Casa" },
  { value: "APARTMENT", label: "Apartamento" },
  { value: "COMMERCIAL", label: "Comercial" },
  { value: "LAND", label: "Terreno" },
  { value: "OTHER", label: "Outros" }
];

export default function LandingPage() {
  // States
  const [properties, setProperties] = useState<any[]>([]);
  const [loadingProperties, setLoadingProperties] = useState(true);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadBudget, setLeadBudget] = useState("");
  const [leadLocation, setLeadLocation] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [submittingLead, setSubmittingLead] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registeredName, setRegisteredName] = useState("");
  const [chatbotKey, setChatbotKey] = useState(0);

  // Filter States
  const [filterType, setFilterType] = useState("ALL");
  const [filterPriceMax, setFilterPriceMax] = useState("");
  const [filterSearch, setFilterSearch] = useState("");

  // Fetch properties from backend
  useEffect(() => {
    async function loadProperties() {
      try {
        const response = await fetch("http://localhost:3001/api/properties/public");
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data && result.data.length > 0) {
            // Map api properties to card format
            const mapped = result.data.map((p: any) => ({
              id: p.id,
              image: p.photos?.[0] || "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800",
              price: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(Number(p.price)),
              address: `${p.address}, ${p.city} - ${p.state}`,
              beds: p.bedrooms,
              baths: p.bathrooms,
              parking: p.parkingSpots,
              type: Number(p.price) > 30000 ? "Venda" : "Aluguel",
              matchPercentage: Math.floor(Math.random() * 15) + 85, // Mock matching percentage
              status: "Disponível"
            }));
            setProperties(mapped);
          } else {
            setProperties(MOCK_PROPERTIES);
          }
        } else {
          setProperties(MOCK_PROPERTIES);
        }
      } catch (err) {
        console.error("Erro ao carregar imóveis públicos:", err);
        setProperties(MOCK_PROPERTIES);
      } finally {
        setLoadingProperties(false);
      }
    }
    loadProperties();

    // Check if user is already registered to adjust greeting
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("leadName");
      if (storedName) {
        setRegisteredName(storedName);
        setRegistrationSuccess(true);
      }
    }
  }, []);

  const handleTypeToggle = (typeValue: string) => {
    if (selectedTypes.includes(typeValue)) {
      setSelectedTypes(selectedTypes.filter(t => t !== typeValue));
    } else {
      setSelectedTypes([...selectedTypes, typeValue]);
    }
  };

  const handleRegisterLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingLead(true);

    try {
      const response = await fetch("http://localhost:3001/api/leads/public", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail || null,
          phone: leadPhone,
          budgetMin: 0,
          budgetMax: leadBudget ? Number(leadBudget) : null,
          locationInterest: leadLocation || null,
          propertyTypePref: selectedTypes
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        const newLead = result.data;
        // Save to localStorage
        localStorage.setItem("leadId", newLead.id);
        localStorage.setItem("brokerId", newLead.brokerId);
        localStorage.setItem("leadName", newLead.name);
        
        setRegisteredName(newLead.name);
        setRegistrationSuccess(true);
        // Force chat widget to reload
        setChatbotKey(prev => prev + 1);
      } else {
        alert(result.message || "Ocorreu um erro no cadastro. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro ao registrar lead:", err);
      // Mock fallback saving for demo purposes if backend fails
      localStorage.setItem("leadId", "mock-lead-id");
      localStorage.setItem("brokerId", "mock-broker-id");
      localStorage.setItem("leadName", leadName);
      setRegisteredName(leadName);
      setRegistrationSuccess(true);
      setChatbotKey(prev => prev + 1);
    } finally {
      setSubmittingLead(false);
    }
  };

  const handleResetLead = () => {
    localStorage.removeItem("leadId");
    localStorage.removeItem("brokerId");
    localStorage.removeItem("leadName");
    setRegistrationSuccess(false);
    setRegisteredName("");
    setLeadName("");
    setLeadEmail("");
    setLeadPhone("");
    setLeadBudget("");
    setLeadLocation("");
    setSelectedTypes([]);
    setChatbotKey(prev => prev + 1);
  };

  // Filter Logic
  const filteredProperties = properties.filter(prop => {
    // Search query filter
    const matchesSearch = prop.address.toLowerCase().includes(filterSearch.toLowerCase());
    
    // Type filter
    let matchesType = true;
    if (filterType !== "ALL") {
      if (filterType === "RENT") {
        matchesType = prop.type === "Aluguel";
      } else if (filterType === "SALE") {
        matchesType = prop.type === "Venda";
      }
    }

    // Price filter
    let matchesPrice = true;
    if (filterPriceMax) {
      const priceNumeric = Number(prop.price.replace(/[^\d]/g, ""));
      matchesPrice = priceNumeric <= Number(filterPriceMax);
    }

    return matchesSearch && matchesType && matchesPrice;
  });

  return (
    <div className="w-full h-full overflow-y-auto bg-slate-50 flex flex-col relative">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-primary text-white pt-32 pb-24 px-6 overflow-hidden min-h-[90vh] flex items-center">
        {/* Glow Spheres */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-accent font-semibold text-xs tracking-wide uppercase backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" /> Encontro inteligente de imóveis
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              O lar perfeito, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">
                filtrado por IA.
              </span>
            </h1>
            
            <p className="text-lg text-slate-300 font-medium max-w-xl">
              Esqueça buscas infinitas. Cadastre seu perfil de interesse, e nosso assistente cognitivo CorreAi selecionará as melhores oportunidades do mercado, conectando você ao corretor ideal.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold text-xs">✓</div>
                <span className="text-sm font-semibold text-slate-200">Recomendações Instantâneas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold text-xs">✓</div>
                <span className="text-sm font-semibold text-slate-200">Chatbot com IA Integrada</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold text-xs">✓</div>
                <span className="text-sm font-semibold text-slate-200">Atendimento Humanizado</span>
              </div>
            </div>
          </div>

          {/* Registration Form / Success Card */}
          <div className="lg:col-span-5">
            {registrationSuccess ? (
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden text-center space-y-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl -mr-10 -mt-10" />
                
                <div className="w-20 h-20 bg-accent text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-accent/20">
                  <Check className="w-10 h-10" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Perfil Ativado!</h3>
                  <p className="text-slate-300 text-sm">
                    Olá, <strong className="text-white font-bold">{registeredName}</strong>! Seu atendimento exclusivo com inteligência artificial está pronto.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left space-y-2">
                  <p className="text-xs font-semibold text-accent uppercase tracking-wider">Próximo Passo:</p>
                  <p className="text-sm text-slate-200">
                    Abra o **chat inteligente** no canto inferior direito para conversar e receber sugestões de imóveis com base no seu orçamento.
                  </p>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={handleResetLead}
                    className="text-xs text-slate-400 hover:text-white transition-colors underline font-medium"
                  >
                    Cadastrar outro perfil de busca
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-2xl border border-slate-100 text-slate-800 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Ativar Busca Inteligente</h3>
                  <p className="text-sm text-slate-500 mt-1 font-medium">Deixe a IA trabalhar por você. Cadastre-se abaixo.</p>
                </div>

                <form onSubmit={handleRegisterLead} className="space-y-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block ml-1">Nome Completo *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        type="text" 
                        required
                        placeholder="Ex: João da Silva"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-slate-800 font-medium"
                        value={leadName}
                        onChange={e => setLeadName(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Contact Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block ml-1">WhatsApp / Tel *</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                          type="tel" 
                          required
                          placeholder="(11) 99999-9999"
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-slate-800 font-medium"
                          value={leadPhone}
                          onChange={e => setLeadPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* Budget */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block ml-1">Preço Máximo *</label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                          type="number" 
                          required
                          placeholder="Ex: 800000"
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-slate-800 font-medium"
                          value={leadBudget}
                          onChange={e => setLeadBudget(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block ml-1">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                          type="email" 
                          placeholder="exemplo@email.com"
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-slate-800 font-medium"
                          value={leadEmail}
                          onChange={e => setLeadEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* Location Interest */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block ml-1">Região Desejada</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                          type="text" 
                          placeholder="Ex: Jardins SP ou Centro"
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-slate-800 font-medium"
                          value={leadLocation}
                          onChange={e => setLeadLocation(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Property Type Selector tags */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block ml-1">Tipo de Imóvel de Interesse</label>
                    <div className="flex flex-wrap gap-2">
                      {PROPERTY_TYPES.map(type => {
                        const isSelected = selectedTypes.includes(type.value);
                        return (
                          <button
                            type="button"
                            key={type.value}
                            onClick={() => handleTypeToggle(type.value)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 border ${
                              isSelected 
                                ? "bg-accent-light border-accent text-accent-dark" 
                                : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            {isSelected && <span className="text-xs">✓</span>}
                            {type.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={submittingLead}
                    className="w-full bg-accent hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-accent/15 flex items-center justify-center gap-2 disabled:opacity-75"
                  >
                    {submittingLead ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Cadastrando no sistema...
                      </>
                    ) : (
                      <>
                        Buscar com Inteligência Artificial
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Vitrine / Properties Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 w-full flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Imóveis em Destaque</h2>
            <p className="text-slate-500 mt-2 font-medium">Explore as propriedades ativas selecionadas pelos nossos corretores parceiros.</p>
          </div>
          
          {/* Simple public filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Buscar por endereço ou bairro..." 
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-slate-800"
                value={filterSearch}
                onChange={e => setFilterSearch(e.target.value)}
              />
            </div>

            {/* Type buttons */}
            <div className="flex bg-white border border-slate-200 rounded-xl p-1 shrink-0">
              <button 
                onClick={() => setFilterType("ALL")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterType === "ALL" ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-800"}`}
              >
                Todos
              </button>
              <button 
                onClick={() => setFilterType("SALE")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterType === "SALE" ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-800"}`}
              >
                Comprar
              </button>
              <button 
                onClick={() => setFilterType("RENT")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterType === "RENT" ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-800"}`}
              >
                Alugar
              </button>
            </div>

            {/* Max Price Filter */}
            <div className="relative shrink-0">
              <input 
                type="number" 
                placeholder="Preço máximo (R$)"
                className="w-40 px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-slate-800"
                value={filterPriceMax}
                onChange={e => setFilterPriceMax(e.target.value)}
              />
            </div>
          </div>
        </div>

        {loadingProperties ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-accent animate-spin" />
            <p className="text-slate-500 font-semibold text-sm">Buscando imóveis no banco de dados...</p>
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map(property => (
              <PropertyCard 
                key={property.id}
                id={property.id}
                image={property.image}
                price={property.price}
                address={property.address}
                beds={property.beds}
                baths={property.baths}
                parking={property.parking}
                type={property.type}
                matchPercentage={property.matchPercentage}
                status={property.status}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mx-auto">
              <Home size={28} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-base">Nenhum imóvel encontrado</h4>
              <p className="text-slate-500 text-sm mt-1">Experimente ajustar seus filtros ou termos de pesquisa.</p>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 text-center text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-white">
            <Building className="w-5 h-5 text-accent" />
            <span>Corre<span className="text-accent">Ai</span></span>
          </div>
          <p>© {new Date().getFullYear()} CorreAi. Todos os direitos reservados. Feito com Inteligência Artificial.</p>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Termos</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Suporte</a>
          </div>
        </div>
      </footer>

      {/* Chatbot Widget mounted at the bottom of the page */}
      <ChatbotWidget key={chatbotKey} context="cliente" />
    </div>
  );
}
