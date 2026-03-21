import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Linkedin, Mail, Phone, Upload, CheckCircle2 } from "lucide-react";

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<"initial" | "verify" | "linkedin">("initial");
  
  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("verify");
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("linkedin");
  };

  const handleComplete = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/">
          <span className="flex items-center justify-center gap-2 font-display text-2xl font-bold tracking-tight text-primary mb-8 cursor-pointer">
            CareerDoor
          </span>
        </Link>

        {step === "initial" && (
          <Card className="shadow-lg border-border/60">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <CardDescription>
                Sign in to your account or create a new one
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="phone">Phone</TabsTrigger>
                </TabsList>
                
                <TabsContent value="email">
                  <form onSubmit={handleInitialSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="email" type="email" placeholder="name@example.com" className="pl-9" required />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">Continue</Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="phone">
                  <form onSubmit={handleInitialSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Mobile number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="pl-9" required />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">Continue</Button>
                  </form>
                </TabsContent>
              </Tabs>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <Button variant="outline" type="button" className="w-full" onClick={() => setStep("linkedin")}>
                <Linkedin className="mr-2 h-4 w-4 text-[#0A66C2]" />
                LinkedIn
              </Button>
            </CardContent>
          </Card>
        )}

        {step === "verify" && (
          <Card className="shadow-lg border-border/60 animate-in fade-in slide-in-from-bottom-4">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Check your inbox</CardTitle>
              <CardDescription>
                We've sent a 6-digit verification code to your email/phone
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerifySubmit} className="space-y-6">
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Input 
                      key={i} 
                      className="w-12 h-14 text-center text-lg font-bold" 
                      maxLength={1}
                      required
                    />
                  ))}
                </div>
                <Button type="submit" className="w-full">Verify & Continue</Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="link" className="text-sm text-muted-foreground" onClick={() => setStep("initial")}>
                Didn't receive a code? Resend
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === "linkedin" && (
          <Card className="shadow-lg border-border/60 animate-in fade-in slide-in-from-bottom-4">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Complete your profile</CardTitle>
              <CardDescription>
                Upload your LinkedIn details to unlock all features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center space-y-4 hover:bg-muted/50 transition-colors cursor-pointer group">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Upload LinkedIn PDF</p>
                  <p className="text-sm text-muted-foreground">Save your profile as PDF and upload here</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or paste URL
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin-url">LinkedIn Profile URL</Label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="linkedin-url" placeholder="https://linkedin.com/in/username" className="pl-9" />
                </div>
              </div>

              <Button className="w-full gap-2" onClick={handleComplete}>
                <CheckCircle2 className="h-4 w-4" />
                Complete Registration
              </Button>
              
              <Button variant="ghost" className="w-full" onClick={handleComplete}>
                Skip for now
              </Button>

            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
}