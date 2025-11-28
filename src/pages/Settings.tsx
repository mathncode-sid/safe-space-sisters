import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/components/AppLayout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

const Settings = () => {
  const { toast } = useToast();
  const { language, setLanguage } = useLanguage();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data } = await supabase.from('user_settings').select('*').eq('user_id', session.user.id).single();
    if (data) {
      setTheme(data.theme);
      if (data.theme === 'dark') document.documentElement.classList.add('dark');
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
    
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await supabase.from('user_settings').update({ theme: newTheme }).eq('user_id', session.user.id);
    }
    toast({ title: "Theme updated" });
  };

  return (
    <AppLayout>
      <div className="container max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8">Settings</h1>
        
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label>Dark Mode</Label>
              <p className="text-sm text-muted-foreground">Toggle dark theme</p>
            </div>
            <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
          </div>

          <div className="flex items-center justify-between pt-6 border-t">
            <div>
              <Label>Language</Label>
              <p className="text-sm text-muted-foreground">Choose your preferred language</p>
            </div>
            <Select value={language} onValueChange={(value) => setLanguage(value as 'en' | 'sw')}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="sw">Kiswahili</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="pt-6 border-t">
            <Label className="text-destructive">Danger Zone</Label>
            <p className="text-sm text-muted-foreground mb-4">Permanently delete your account and all data</p>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Settings;