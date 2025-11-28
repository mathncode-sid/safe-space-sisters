import { useState, useEffect } from "react";
import { Shield, Sparkles, AlertTriangle, CheckCircle2, Loader2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { supabase } from "@/integrations/supabase/client";
import AppLayout from "@/components/AppLayout";

interface AnalysisResult {
  toxicityScore: number;
  categories: string[];
  highlightedWords: string[];
  severity: string;
  explanation: string;
  modelUsed?: string;
}

const Scanner = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [text, setText] = useState("");
  const [model, setModel] = useState("gemini");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [saferVersion, setSaferVersion] = useState<string>("");
  const [advice, setAdvice] = useState<string>("");
  const [isGeneratingSafer, setIsGeneratingSafer] = useState(false);
  const [isGeneratingAdvice, setIsGeneratingAdvice] = useState(false);
  const [showDemoPanel, setShowDemoPanel] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter some text to analyze",
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysis(null);
    setSaferVersion("");
    setAdvice("");

    try {
      const data = await api.analyzeToxicity(text, model);
      // adapt legacy responses
      const normalized = {
        toxicityScore: (data.toxicityScore ?? data.toxicity_score ?? data.toxicity) || 0,
        categories: data.categories ?? data.category ?? [],
        highlightedWords: data.highlightedWords ?? data.highlighted_words ?? [],
        severity: data.severity ?? 'low',
        explanation: data.explanation ?? data.reason ?? '',
        modelUsed: data.modelUsed ?? data.model_used ?? model,
      } as AnalysisResult;

      setAnalysis(normalized);

      if (normalized.toxicityScore > 30) {
        toast({
          title: "Analysis Complete",
          description: `Toxicity detected (${normalized.severity} severity)`,
        });
      } else {
        toast({
          title: "Analysis Complete",
          description: "Message appears safe",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: error.message || "Please try again",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // prefill sample message when ?sample=1
  const location = useLocation();
  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      if (params.get('sample') === '1') {
        setText("Hey, I saw your profile and you're so annoying - stop posting like that!");
      }
    } catch (e) {
      // ignore
    }
  }, [location.search]);

  const handleGenerateSaferVersion = async () => {
    setIsGeneratingSafer(true);
    try {
      const data = await api.generateSaferVersion(text, model);
  const safer = (data.saferVersion ?? data.safer_version ?? data.safer) || '';
      setSaferVersion(safer);
      toast({
        title: "Safer version generated",
        description: "Review the alternative message below",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to generate safer version",
        description: error.message,
      });
    } finally {
      setIsGeneratingSafer(false);
    }
  };

  const handleGenerateAdvice = async () => {
    if (!analysis) return;
    
    setIsGeneratingAdvice(true);
    try {
      const data = await api.generateAdvice(text, analysis.categories, analysis.severity, model);
      const adv = data.advice ?? data.result ?? '';
      setAdvice(adv);
      toast({
        title: "Safety advice generated",
        description: "Review recommendations below",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to generate advice",
        description: error.message,
      });
    } finally {
      setIsGeneratingAdvice(false);
    }
  };

  const loadDemoScenario = async (level: 'low' | 'medium' | 'high', autoAnalyze = true) => {
    let sample = '';
    if (level === 'low') sample = 'Thanks for your comment! I appreciate your perspective.';
    if (level === 'medium') sample = "Your post is frustrating and makes me uncomfortable. Please stop.";
    if (level === 'high') sample = "You are so stupid and should disappear. Nobody wants you here.";
    setText(sample);
    if (autoAnalyze) {
      // small delay so the UI updates
      setTimeout(() => handleAnalyze(), 150);
    }
  };

  const handleSaveToHistory = async () => {
    if (!analysis) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          variant: "destructive",
          title: "Please log in",
          description: "You need to be logged in to save history",
        });
        navigate("/login");
        return;
      }

      const { error } = await supabase.from('message_analysis').insert({
        user_id: session.user.id,
        original_text: text,
        toxicity_score: analysis.toxicityScore,
        categories: analysis.categories,
        highlighted_words: analysis.highlightedWords,
        safer_version: saferVersion || null,
        advice: advice || null,
        model_used: model
      });

      if (error) throw error;

      toast({
        title: "Saved to history",
        description: "You can view this analysis in your history page",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to save",
        description: error.message,
      });
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-muted';
    }
  };

  return (
    <AppLayout>
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Toxicity Scanner</h1>
          <p className="text-muted-foreground">
            Analyze messages for harmful content using AI-powered detection
          </p>
        </div>

        <Card className="p-6 mb-6 shadow-soft">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Enter message to analyze</label>
              <Textarea
                placeholder="Paste the message you want to analyze here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[150px] text-base"
              />
              <div className="mt-2 flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setText("Hey, I saw your profile and you're so annoying - stop posting like that!")}>Load example</Button>
                <Button variant="outline" size="sm" onClick={() => { setText(''); setAnalysis(null); setSaferVersion(''); setAdvice(''); }}>Clear</Button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">AI Model</label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gemini">Google Gemini (Recommended)</SelectItem>
                    <SelectItem value="gpt">OpenAI GPT-5</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setShowDemoPanel(!showDemoPanel)}>Demo Scenarios</Button>
                  <Button 
                    size="lg" 
                    onClick={handleAnalyze} 
                    disabled={isAnalyzing || !text.trim()}
                    className="mt-6"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        Analyze Message
                      </>
                    )}
                  </Button>
                </div>

                {showDemoPanel && (
                  <div className="mt-2 p-3 bg-muted rounded-md w-full">
                    <div className="text-sm font-medium mb-2">Load demo scenario</div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => loadDemoScenario('low')}>Low</Button>
                      <Button size="sm" variant="outline" onClick={() => loadDemoScenario('medium')}>Medium</Button>
                      <Button size="sm" variant="destructive" onClick={() => loadDemoScenario('high')}>High</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {analysis && (
          <div className="space-y-6">
            {/* How it works: small explainer for demos */}
            <Card className="p-4 mb-4">
              <h3 className="text-sm font-semibold mb-2">How it works</h3>
              <p className="text-sm text-muted-foreground">Paste a message, click Analyze — our AI detects toxicity, highlights problematic words, suggests safer rewrites, and gives safety advice you can copy or save as evidence.</p>
            </Card>
            {/* Results Card */}
            <Card className="p-6 shadow-medium">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Analysis Results</h2>
                  <Badge className={getSeverityColor(analysis.severity)}>
                    {analysis.severity.toUpperCase()} SEVERITY
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">{analysis.toxicityScore}</div>
                  <div className="text-sm text-muted-foreground">Toxicity Score</div>
                </div>
              </div>

              {analysis.explanation && (
                <div className="mb-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm">{analysis.explanation}</p>
                </div>
              )}

              {/* Show original text with highlighted problematic words */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">Original Message (highlighted)</h3>
                <div className="p-4 bg-background rounded-lg prose max-w-none">
                  {analysis.highlightedWords.length === 0 ? (
                    <p className="whitespace-pre-wrap">{text}</p>
                  ) : (
                    <p className="whitespace-pre-wrap">
                      {text.split(/(\s+)/).map((w, i) => {
                        const cleaned = w.replace(/\W/g, '').toLowerCase();
                        const match = analysis.highlightedWords.find(h => h.toLowerCase() === cleaned);
                        if (match) {
                          return (
                            <span key={i} className="px-1 rounded bg-destructive/20 text-destructive">{w}</span>
                          );
                        }
                        return <span key={i}>{w}</span>;
                      })}
                    </p>
                  )}
                </div>
              </div>

              {analysis.categories.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold mb-2">Detected Categories:</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.categories.map((category) => (
                      <Badge key={category} variant="outline">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        {category.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {analysis.highlightedWords.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold mb-2">Problematic Words/Phrases:</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.highlightedWords.map((word, idx) => (
                      <Badge key={idx} variant="destructive">
                        {word}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3 mt-6">
                <Button
                  onClick={handleGenerateSaferVersion}
                  disabled={isGeneratingSafer}
                  variant="secondary"
                >
                  {isGeneratingSafer ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Rewrite Safely
                </Button>
                
                <Button
                  onClick={handleGenerateAdvice}
                  disabled={isGeneratingAdvice}
                  variant="secondary"
                >
                  {isGeneratingAdvice ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <BookOpen className="mr-2 h-4 w-4" />
                  )}
                  Get Safety Advice
                </Button>
                
                <Button
                  onClick={handleSaveToHistory}
                  variant="outline"
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Save to History
                </Button>
              </div>
            </Card>

            {isAnalyzing && !analysis ? (
              <Card className="p-6">
                <Skeleton className="h-6 mb-4 w-1/3" />
                <Skeleton className="h-40" />
              </Card>
            ) : null}

            {saferVersion && (
              <Card className="p-6 shadow-soft border-green-500/20">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Safer Alternative
                </h3>
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-foreground whitespace-pre-wrap">{saferVersion}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <Button size="sm" variant="ghost" onClick={() => navigator.clipboard.writeText(saferVersion)}>
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {advice && (
              <Card className="p-6 shadow-soft border-blue-500/20">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Safety Advice
                </h3>
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg prose prose-sm dark:prose-invert max-w-none">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="whitespace-pre-wrap">{advice}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <Button size="sm" variant="ghost" onClick={() => navigator.clipboard.writeText(advice)}>
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Scanner;