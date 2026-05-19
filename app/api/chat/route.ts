import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const { history, context } = await request.json();

    if (!history || !Array.isArray(history)) {
      return NextResponse.json({ error: "Histórico ausente ou inválido" }, { status: 400 });
    }

    // Define a personalidade do CorreAI dependendo de quem está usando
    const systemInstruction =
      context === "corretor"
        ? "Você é o assistente IA do CorreAi na área interna do Corretor. Seu foco é ajudar o corretor a fechar negócios, criar descrições persuasivas de imóveis, otimizar vendas, gerenciar leads e dar dicas de conversão. Seja proativo, corporativo e focado em produtividade."
        : "Você é o assistente IA do CorreAi focado no Cliente final. Seu papel é ajudá-lo a encontrar o imóvel ideal, entender suas necessidades (bairro, orçamento, tamanho), tirar dúvidas sobre financiamento e sugerir agendamentos de visitas. Seja amigável, acolhedor e consultivo.";

    // Extrai a última mensagem enviada pelo usuário (que está no fim do array)
    const lastMessage = history[history.length - 1];

    // Formata o histórico anterior para o padrão que o Gemini aceita (caso queira expandir para chatSession depois)
    // Para simplificar e evitar erros de sincronização de estados no streaming, passamos como conteúdos estruturados:
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        ...history.map((msg: any) => ({
          role: msg.role,
          parts: [{ text: msg.parts[0].text }],
        })),
      ],
      config: {
        systemInstruction: systemInstruction,
      },
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Erro no Gemini Backend:", error);
    return NextResponse.json({ error: "Falha ao gerar resposta" }, { status: 500 });
  }
}