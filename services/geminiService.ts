import { GoogleGenAI } from "@google/genai";
import { Resource, UserRole } from "../types";
import { CATEGORIES, RESOURCES } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Eres "NexusBot", un asistente virtual inteligente para el colegio "EduNexus".
Tu objetivo es ayudar a padres, alumnos y profesores a encontrar recursos educativos dentro de nuestra base de datos simulada.
Sé amable, profesional y educativo. Responde siempre en Español.

Tienes acceso al siguiente contexto de datos (Base de datos escolar):
Categorías: ${CATEGORIES.map(c => c.label).join(', ')}.
Recursos Disponibles: ${JSON.stringify(RESOURCES.map(r => ({ id: r.id, title: r.title, category: r.categoryId, description: r.description, tags: r.tags })))}

Cuando te pregunten, busca en este contexto. Si sugieres un recurso, menciona su título exacto.
Si te preguntan por algo que no está en la lista, sugiere recursos educativos generales apropiados para un colegio pero aclara que no está en la base de datos interna.
`;

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[],
  userRole: UserRole
): Promise<string> => {
  try {
    // Filter context based on role sensitivity if needed (simplified here)
    // In a real app, we might filter the system instruction context based on userRole

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION + `\n El usuario actual tiene el rol de: ${userRole}. Ajusta tu tono acorde.`,
        temperature: 0.7,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message });
    return result.text || "Lo siento, no pude generar una respuesta en este momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Hubo un error al conectar con el asistente inteligente. Por favor intenta más tarde.";
  }
};