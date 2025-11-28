import { Shield, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AppLayout from "@/components/AppLayout";

const BrowserExtension = () => {
  return (
    <AppLayout>
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Browser Extension Concept</h1>
          <p className="text-lg text-muted-foreground">
            A preview of how AI Digital Shield could protect you while browsing
          </p>
        </div>

        <div className="grid gap-8">
          {/* Feature Overview */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <Eye className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-2">Automatic Detection</h3>
                <p className="text-sm text-muted-foreground">
                  Scans messages in real-time across social media platforms
                </p>
              </div>
              <div className="text-center p-4">
                <EyeOff className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-2">Instant Protection</h3>
                <p className="text-sm text-muted-foreground">
                  Blurs harmful content before you see it
                </p>
              </div>
              <div className="text-center p-4">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-2">Risk Warnings</h3>
                <p className="text-sm text-muted-foreground">
                  Provides context and safety advice
                </p>
              </div>
            </div>
          </Card>

          {/* Social Media Mock */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Example: Social Media Protection</h2>
            
            <div className="space-y-4 max-w-2xl mx-auto">
              {/* Normal Message */}
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm mb-1">@friend_user</p>
                    <p className="text-sm">Hey! How are you doing today? 😊</p>
                  </div>
                </div>
              </div>

              {/* Harmful Message - Blurred */}
              <div className="bg-destructive/10 border-2 border-destructive/20 rounded-lg p-4 relative">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-destructive/20" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-destructive" />
                      <Badge variant="destructive" className="text-xs">
                        Harmful Content Detected
                      </Badge>
                    </div>
                    <p className="font-semibold text-sm mb-2">@suspicious_user</p>
                    
                    {/* Blurred Content */}
                    <div className="relative">
                      <div className="blur-md select-none bg-muted p-3 rounded">
                        <p className="text-sm">
                          [This message contains threatening language and has been blurred for your safety]
                        </p>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button size="sm" variant="outline" className="shadow-lg">
                          <EyeOff className="h-4 w-4 mr-2" />
                          Show Content
                        </Button>
                      </div>
                    </div>

                    {/* Warning Info */}
                    <div className="mt-3 p-3 bg-background rounded border">
                      <p className="text-xs font-semibold mb-1">⚠️ Risk Analysis:</p>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• Toxicity Score: 87/100 (Critical)</li>
                        <li>• Categories: Threats, Harassment</li>
                        <li>• Recommendation: Report and block this user</li>
                      </ul>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="destructive" className="text-xs">
                          Report User
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          Get Advice
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Another Normal Message */}
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm mb-1">@another_friend</p>
                    <p className="text-sm">Looking forward to our meetup this weekend! 🎉</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Coming Soon */}
          <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-secondary/5">
            <h2 className="text-2xl font-bold mb-3">Coming Soon</h2>
            <p className="text-muted-foreground mb-4">
              The AI Digital Shield browser extension is currently in development.
              <br />
              It will support Chrome, Firefox, and Edge browsers.
            </p>
            <Button disabled>
              Join Waitlist
            </Button>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default BrowserExtension;