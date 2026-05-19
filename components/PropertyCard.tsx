import { Home, Bed, Bath, Car, Sparkles } from "lucide-react";
import Link from "next/link";

interface PropertyCardProps {
  id: string | number;
  image: string;
  price: string;
  address: string;
  beds: number;
  baths: number;
  parking: number;
  type: "Venda" | "Aluguel";
  matchPercentage?: number;
  status?: "Disponível" | "Reservado" | "Vendido"; // Para visão do corretor
}

export default function PropertyCard({
  id,
  image,
  price,
  address,
  beds,
  baths,
  parking,
  type,
  matchPercentage,
  status,
}: PropertyCardProps) {
  return (
    <Link href={`/imovel/${id}`} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow block">
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={image}
          alt="Imagem do imóvel"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges do Topo */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-semibold px-3 py-1 rounded-full">
            {type}
          </span>
          {status && (
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full text-white ${
                status === "Disponível"
                  ? "bg-success"
                  : status === "Reservado"
                  ? "bg-amber-500"
                  : "bg-red-500"
              }`}
            >
              {status}
            </span>
          )}
        </div>

        {/* AI Match Badge */}
        {matchPercentage && (
          <div className="absolute top-4 right-4">
            <span className="bg-gradient-to-r from-accent to-sky-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Match: {matchPercentage}%
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-2xl font-bold text-slate-800 mb-1">{price}</h3>
        <p className="text-slate-500 text-sm mb-4 line-clamp-1">{address}</p>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-1 text-slate-600 text-sm">
            <Bed className="w-4 h-4 text-slate-400" />
            <span>{beds}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-600 text-sm">
            <Bath className="w-4 h-4 text-slate-400" />
            <span>{baths}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-600 text-sm">
            <Car className="w-4 h-4 text-slate-400" />
            <span>{parking}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-600 text-sm">
            <Home className="w-4 h-4 text-slate-400" />
            <span>120m²</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
