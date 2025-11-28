import { useEffect, useState } from "react";
import { Shield, TrendingUp, AlertCircle, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AppLayout from "@/components/AppLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const [recentScans, setRecentScans] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, thisWeek: 0, avgScore: 0 });
  const [loadingDemo, setLoadingDemo] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data: scans } = await supabase
      .from('message_analysis')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (scans) {
      setRecentScans(scans);
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const weekScans = scans.filter(s => new Date(s.created_at) > weekAgo);
      setStats({
        total: scans.length,
        thisWeek: weekScans.length,
        avgScore: scans.length ? Math.round(scans.reduce((a, b) => a + b.toxicity_score, 0) / scans.length) : 0
      });
    }
  };

  const handleExport = async () => {
    if (recentScans.length === 0) return;
    const { default: exportScansToPdf } = await import('@/lib/export');
    const blob = await exportScansToPdf(recentScans);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scans-report.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  const chartData = recentScans.slice(0, 7).reverse().map((scan, idx) => ({
    name: `Scan ${idx + 1}`,
    score: scan.toxicity_score
  }));

  return (
    <AppLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your digital safety activity</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Scans</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-3xl font-bold">{stats.thisWeek}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Toxicity</p>
                <p className="text-3xl font-bold">{stats.avgScore}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-500" />
            </div>
          </Card>
        </div>

        {chartData.length > 0 && (
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Recent Toxicity Scores</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        )}

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Recent Scans</h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => navigate("/history")}>
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={handleExport}>Export</Button>
            <Button variant="secondary" onClick={async () => {
              setLoadingDemo(true);
              // load demo data
              setTimeout(() => {
                const sample = [
                  { id: '1', created_at: new Date().toISOString(), original_text: 'You are annoying and nobody likes you', toxicity_score: 78, categories: ['harassment'], highlighted_words: ['annoying'] },
                  { id: '2', created_at: new Date(Date.now() - 86400000).toISOString(), original_text: 'Stop posting this nonsense', toxicity_score: 55, categories: ['harassment'], highlighted_words: ['nonsense'] }
                ];
                setRecentScans(sample as any[]);
                setStats({ total: 2, thisWeek: 2, avgScore: 66 });
                setLoadingDemo(false);
              }, 700);
            }}>Load demo data</Button>
          </div>
        </div>

        <div className="space-y-4">
          {loadingDemo ? (
            <div className="grid gap-4">
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
            </div>
          ) : recentScans.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground mb-4">No scans yet. Start analyzing messages to see them here.</p>
              <Button onClick={() => navigate("/scanner")}>Start Scanning</Button>
            </Card>
          ) : (
            recentScans.slice(0, 5).map((scan) => (
              <Card key={scan.id} className="p-4 hover:shadow-md transition-smooth">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">
                      {new Date(scan.created_at).toLocaleDateString()}
                    </p>
                    <p className="line-clamp-2 mb-2">{scan.original_text}</p>
                    <div className="flex gap-2">
                      {scan.categories.map((cat: string) => (
                        <span key={cat} className="text-xs px-2 py-1 bg-secondary rounded">{cat}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-primary">{scan.toxicity_score}</div>
                    <div className="text-xs text-muted-foreground">Score</div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;