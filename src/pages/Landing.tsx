import { Shield, Sparkles, Clock, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Safe-Space Sisters</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button onClick={() => navigate("/signup")}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">PowerHacks 2025: Build Safe. Build Bold.</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            Protect Yourself. Reclaim Your Voice.
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            AI-powered safety tool that detects toxic messages, suggests safer responses, and empowers women and girls to reclaim their voice online.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/scanner")} className="text-lg h-14 px-10 bg-gradient-to-r from-primary to-accent-foreground text-primary-foreground shadow-lg hover:scale-[1.02] transition-transform">
              Start Scanning Messages
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/safety-tips")} className="text-lg h-12 px-8">
              Learn Safety Tips
            </Button>
            <div className="flex items-center gap-2">
              <Button size="lg" variant="ghost" onClick={() => navigate('/scanner?sample=1')} className="text-lg h-12 px-8">
                Quick Demo
              </Button>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary/10 text-secondary">
                Demo-ready
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How Safe-Space Sisters Protects You</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 shadow-soft hover:shadow-medium transition-smooth">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Toxicity Detection</h3>
              <p className="text-muted-foreground">
                Advanced AI analyzes messages for harassment, hate speech, bullying, and threats with detailed scoring.
              </p>
            </Card>

            <Card className="p-6 shadow-soft hover:shadow-medium transition-smooth">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safer Rewrites</h3>
              <p className="text-muted-foreground">
                Get AI-generated safer alternatives to problematic messages, helping you respond with confidence.
              </p>
            </Card>

            <Card className="p-6 shadow-soft hover:shadow-medium transition-smooth">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">History Tracking</h3>
              <p className="text-muted-foreground">
                Save and review your scans, track patterns, and export reports for documentation purposes.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 16 Days of Activism Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 gradient-card shadow-medium">
            <div className="flex items-start gap-4 mb-6">
              <Users className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h2 className="text-3xl font-bold mb-4">16 Days of Activism Against Gender-Based Violence</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Digital harassment is a form of gender-based violence. This tool stands in solidarity with the global movement to end violence against women and girls, online and offline.
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">Document evidence of digital harassment and abuse</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">Access resources and support networks across Africa</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">Empower yourself with knowledge and tools to stay safe</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Start Protecting Yourself Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of women and girls taking control of their digital safety.
          </p>
          <Button size="lg" variant="secondary" onClick={() => navigate("/signup")} className="text-lg h-12 px-8">
            Create Free Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 Safe-Space Sisters. Building safer digital spaces for women and girls.</p>
          <p className="mt-2">Part of PowerHacks 2025: Build Safe. Build Bold.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;