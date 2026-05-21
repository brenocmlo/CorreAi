"use client";

import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NovoImovel() {
  const [formData, setFormData] = useState({
    titulo: "",
    endereco: "",
    preco: "",
    quartos: "",
    banheiros: "",
    vagas: "",
    metragem: "",
    descricao: "",
    tipo: "Apartamento",
    imagens: [] as File[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Imóvel cadastrado com sucesso!");
    // logic to save property
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-background">
      <header className="flex items-center gap-4 mb-8">
        <Link href="/imoveis" className="p-2 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-text-main hover:bg-gray-50 transition-colors shadow-sm">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-text-main">Adicionar Novo Imóvel</h1>
          <p className="text-text-muted text-sm mt-1">Cadastre uma nova propriedade em sua carteira.</p>
        </div>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-text-main block">Título do Imóvel *</label>
              <input 
                required
                type="text" 
                placeholder="Ex: Cobertura Duplex no Centro"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                value={formData.titulo}
                onChange={e => setFormData({...formData, titulo: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main block">Tipo</label>
              <select 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent text-text-main"
                value={formData.tipo}
                onChange={e => setFormData({...formData, tipo: e.target.value})}
              >
                <option value="Apartamento">Apartamento</option>
                <option value="Casa">Casa</option>
                <option value="Studio">Studio</option>
                <option value="Comercial">Comercial</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-text-main block">Endereço Completo</label>
              <input 
                type="text" 
                placeholder="Rua, Número, Bairro, Cidade"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                value={formData.endereco}
                onChange={e => setFormData({...formData, endereco: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main block">Preço</label>
              <input 
                type="text" 
                placeholder="R$ 0,00"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                value={formData.preco}
                onChange={e => setFormData({...formData, preco: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main block">Quartos</label>
              <input 
                type="number" 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                value={formData.quartos}
                onChange={e => setFormData({...formData, quartos: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main block">Banheiros</label>
              <input 
                type="number" 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                value={formData.banheiros}
                onChange={e => setFormData({...formData, banheiros: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main block">Vagas de Garagem</label>
              <input 
                type="number" 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                value={formData.vagas}
                onChange={e => setFormData({...formData, vagas: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main block">Metragem (m²)</label>
              <input 
                type="number" 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                value={formData.metragem}
                onChange={e => setFormData({...formData, metragem: e.target.value})}
              />
            </div>

            <div className="space-y-2 md:col-span-3">
              <label className="text-sm font-bold text-text-main block">Descrição</label>
              <textarea 
                rows={4}
                placeholder="Descreva os diferenciais do imóvel..."
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                value={formData.descricao}
                onChange={e => setFormData({...formData, descricao: e.target.value})}
              ></textarea>
            </div>

            <div className="space-y-2 md:col-span-3">
              <label className="text-sm font-bold text-text-main block">Imagens do Imóvel</label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10 hover:bg-gray-50 transition-colors">
                <div className="text-center">
                  <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 hover:text-primary-light"
                    >
                      <span>Faça upload de imagens</span>
                      <input id="file-upload" name="file-upload" type="file" multiple accept="image/*" className="sr-only" onChange={e => {
                        if (e.target.files) {
                          setFormData({...formData, imagens: [...formData.imagens, ...Array.from(e.target.files)]});
                        }
                      }} />
                    </label>
                    <p className="pl-1">ou arraste e solte</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-500">PNG, JPG, JPEG até 10MB</p>
                  {formData.imagens.length > 0 && (
                    <div className="mt-4 text-sm text-gray-600 text-left w-full max-w-sm mx-auto">
                      <p className="font-semibold mb-2">Arquivos selecionados:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        {formData.imagens.map((file, i) => (
                          <li key={i} className="truncate">{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-end gap-3">
            <Link href="/imoveis" className="px-5 py-2.5 text-sm font-medium text-text-main bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
              <X size={16} /> Cancelar
            </Link>
            <button type="submit" className="px-5 py-2.5 text-sm font-medium text-white bg-primary rounded-xl hover:bg-primary-light transition-colors flex items-center gap-2 shadow-sm">
              <Save size={16} /> Salvar Imóvel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
