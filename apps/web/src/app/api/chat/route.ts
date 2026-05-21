import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    const { history, context } = await request.json();

    if (!history || !Array.isArray(history)) {
      return NextResponse.json({ error: "Histórico ausente ou inválido" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.warn("⚠️ GEMINI_API_KEY is not defined in the environment. Falling back to mock response.");
      
      const lastMessage = history[history.length - 1];
      const userText = lastMessage?.parts?.[0]?.text || "";
      
      const reply = context === "corretor"
        ? `Olá Corretor! Sou o assistente de IA do CorreAi. No momento, a chave GEMINI_API_KEY não está configurada nas variáveis de ambiente, então estou funcionando em modo de demonstração. Recebi sua mensagem: "${userText}". Como posso te ajudar hoje?`
        : `Olá! Sou o assistente virtual do CorreAi. Recebi a sua mensagem: "${userText}". No momento, o Gemini AI está aguardando a configuração da chave de API (GEMINI_API_KEY) nas variáveis de ambiente. Cadastre-se na página inicial para ativarmos seu atendimento personalizado com o corretor!`;

      return NextResponse.json({ text: reply });
    }

    // Define a personalidade do CorreAI dependendo de quem está usando
    const systemInstruction =
      context === "corretor"
        ? "Você é o assistente IA do CorreAi na área interna do Corretor. Seu foco é ajudar o corretor a fechar negócios, criar descrições persuasivas de imóveis, otimizar vendas, gerenciar leads e dar dicas de conversão. Seja proativo, corporativo e focado em produtividade."
        : "Você é o assistente IA do CorreAi focado no Cliente final. Seu papel é ajudá-lo a encontrar o imóvel ideal, entender suas necessidades (bairro, orçamento, tamanho), tirar dúvidas sobre financiamento e sugerir agendamentos de visitas. Seja amigável, acolhedor e consultivo.";

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // Formata o histórico anterior para o padrão que o Gemini aceita
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
