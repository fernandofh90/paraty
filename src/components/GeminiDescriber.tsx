import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Loader2 } from 'lucide-react';

interface GeminiDescriberProps {
  initialName: string;
  category: string;
  onDescriptionGenerated: (desc: string) => void;
}

export const GeminiDescriber: React.FC<GeminiDescriberProps> = ({ initialName, category, onDescriptionGenerated }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!process.env.API_KEY) {
      setError("Chave de API não configurada.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Crie uma descrição atraente, curta e convidativa (máximo de 300 caracteres) em Português para um estabelecimento turístico em Paraty chamado "${initialName}" que é da categoria "${category}". Foque na experiência do visitante.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      if (response.text) {
        onDescriptionGenerated(response.text.trim());
      }
    } catch (err) {
      console.error(err);
      setError("Falha ao gerar descrição. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={handleGenerate}
        disabled={loading || !initialName}
        className="flex items-center gap-2 text-sm text-purple-600 font-semibold hover:text-purple-800 disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        {loading ? "Criando mágica..." : "Gerar descrição com IA"}
      </button>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};
