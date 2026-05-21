"use client";

import { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  PieChart,
  Activity,
  Target
} from "lucide-react";

export default function AdminRelatorios() {
  const [stats] = useState([
    { label: "Crescimento de Leads", value: "+24%", trend: "up", color: "text-accent" },
    { label: "Taxa de Conversão", value: "8.2%", trend: "up", color: "text-accent" },
    { label: "Tempo Médio de Fechamento", value: "12 dias", trend: "down", color: "text-red-500" },
    { label: "Ticket Médio", value: "R$ 1.2M", trend: "up", color: "text-accent" },
  ]);

  return (
    <div className="flex-1 overflow-y-auto bg-[#f8fafc] p-8">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-bold text-text-main flex items-center gap-2">
            <BarChart3 className="text-primary" />
            Relatórios e Analytics
          </h1>
          <p className="text-text-muted text-sm mt-1">Análise profunda de desempenho, conversão e métricas do sistema.</p>
        </div>
        <div className="bg-white border border-gray-100 p-1.5 rounded-2xl flex gap-1 shadow-sm">
           <button className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl transition-all">Mensal</button>
           <button className="px-4 py-2 text-text-muted text-xs font-bold rounded-xl hover:bg-gray-50 transition-all">Trimestral</button>
           <button className="px-4 py-2 text-text-muted text-xs font-bold rounded-xl hover:bg-gray-50 transition-all">Anual</button>
        </div>
      </header>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h2 className="text-2xl font-black text-text-main italic">{stat.value}</h2>
              <div className={`flex items-center gap-1 ${stat.color} text-xs font-bold`}>
                {stat.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {stat.trend === 'up' ? 'Melhorando' : 'Atenção'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mock Chart Area 1 */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-text-main flex items-center gap-2 uppercase tracking-tighter">
              <TrendingUp size={18} className="text-accent" />
              Volume de Leads por Canal
            </h3>
            <div className="flex gap-4">
               <div className="flex items-center gap-2 text-[10px] font-bold text-text-muted">
                 <span className="w-2 h-2 rounded-full bg-primary" /> WhatsApp
               </div>
               <div className="flex items-center gap-2 text-[10px] font-bold text-text-muted">
                 <span className="w-2 h-2 rounded-full bg-accent" /> Instagram
               </div>
            </div>
          </div>
          <div className="flex-1 flex items-end gap-3 px-4">
             {[40, 60, 45, 90, 65, 80, 55, 70, 85, 40, 75, 95].map((h, i) => (
               <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                 <div className="w-full bg-gray-50 rounded-t-lg relative overflow-hidden flex flex-col justify-end h-full">
                    <div className="bg-primary/20 w-full rounded-t-lg transition-all group-hover:bg-primary/40" style={{ height: `${h}%` }} />
                    <div className="bg-primary w-full rounded-t-lg transition-all absolute bottom-0" style={{ height: `${h * 0.6}%` }} />
                 </div>
                 <span className="text-[10px] font-bold text-text-muted uppercase">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Mock Chart Area 2 */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 h-[400px] flex flex-col">
           <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-text-main flex items-center gap-2 uppercase tracking-tighter">
                <Target size={18} className="text-purple-500" />
                Funil de Conversão Global
              </h3>
           </div>
           <div className="flex-1 flex flex-col justify-center gap-4">
              <FunnelStep label="Visitantes" value="12.450" percent={100} color="bg-primary" />
              <FunnelStep label="Leads Qualificados" value="3.120" percent={25} color="bg-primary/80" />
              <FunnelStep label="Visitas Agendadas" value="840" percent={7} color="bg-primary/60" />
              <FunnelStep label="Vendas" value="156" percent={1.2} color="bg-accent" />
           </div>
        </div>
      </div>
    </div>
  );
}

function FunnelStep({ label, value, percent, color }: any) {
  return (
    <div className="space-y-1.5">
       <div className="flex justify-between text-xs font-bold">
         <span className="text-text-muted uppercase tracking-wider">{label}</span>
         <span className="text-text-main">{value} ({percent}%)</span>
       </div>
       <div className="w-full h-3 bg-gray-50 rounded-full overflow-hidden">
          <div className={`${color} h-full rounded-full transition-all duration-1000`} style={{ width: `${Math.max(percent, 5)}%` }} />
       </div>
    </div>
  );
}
