import { supabase } from "@/integrations/supabase/client";

const handleInvoke = async (fn: string, body: any) => {
  try {
    const { data, error } = await supabase.functions.invoke(fn, { body });
    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    return data;
  } catch (err: any) {
    // If demo mode is enabled, return canned responses to allow offline demos
    try {
      const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
      const demo = params?.get('demo') === '1' || (typeof localStorage !== 'undefined' && localStorage.getItem('demoMode') === '1');
      if (demo) {
        // small simulated delay
        await new Promise((r) => setTimeout(r, 600));
        if (fn === 'analyze-toxicity') {
          return {
            toxicityScore: 72,
            categories: ['harassment', 'profanity'],
            highlightedWords: ['annoying'],
            severity: 'high',
            explanation: 'Contains insulting language and harassment towards the recipient.'
          };
        }
        if (fn === 'generate-safer-version') {
          return { saferVersion: 'I disagree with your post and would prefer if we kept the conversation respectful.' };
        }
        if (fn === 'generate-advice') {
          return { advice: 'Document the message, block the sender, and avoid engaging. If threats continue, report to platform and local authorities.' };
        }
      }
    } catch (e) {
      // ignore demo fallback errors
    }

    // normalize
    throw new Error(err?.message || 'API invocation failed');
  }
};

export const analyzeToxicity = (text: string, model = 'gemini') =>
  handleInvoke('analyze-toxicity', { text, model });

export const generateSaferVersion = (text: string, model = 'gemini') =>
  handleInvoke('generate-safer-version', { text, model });

export const generateAdvice = (text: string, categories: string[], severity: string, model = 'gemini') =>
  handleInvoke('generate-advice', { text, categories, severity, model });

export default {
  analyzeToxicity,
  generateSaferVersion,
  generateAdvice,
};
