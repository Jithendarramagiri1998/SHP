import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/lib/store";

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { updateProfile } = useStore();
  
  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const skillsStr = formData.get('skills') as string;
    const skills = skillsStr ? skillsStr.split(',').map(s => s.trim()).filter(Boolean) : [];

    updateProfile({
      id: "user_" + Date.now().toString(),
      name: formData.get('name') as string,
      company: formData.get('company') as string,
      experience: formData.get('experience') as string,
      role: formData.get('role') as string,
      email: formData.get('email') as string,
      linkedin: formData.get('linkedin') as string,
      skills: skills,
      location: "Not Specified" // Defaults as per mockup
    });

    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <Link href="/">
          <div className="flex flex-col items-center justify-center mb-8 cursor-pointer group">
            <span className="font-display text-5xl font-black tracking-tighter uppercase text-foreground group-hover:text-background group-hover:bg-foreground transition-all px-4 py-2 leading-none">
              SHP
            </span>
            <span className="text-xs font-bold uppercase tracking-widest mt-2">SoftwareHiringProcess</span>
          </div>
        </Link>

        <Card className="shadow-none border-2 border-border rounded-none">
          <CardHeader className="space-y-1 text-center bg-muted/20 border-b-2 border-border">
            <CardTitle className="text-2xl font-bold uppercase tracking-wider">Join Community</CardTitle>
            <CardDescription className="text-foreground font-medium uppercase text-xs tracking-widest">
              Please enter your professional details
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-xs uppercase tracking-widest font-bold">Full Name *</Label>
                  <Input id="name" name="name" placeholder="John Doe" className="rounded-none border-2 h-12 focus-visible:ring-0 focus-visible:border-foreground" required />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-xs uppercase tracking-widest font-bold">Email Address *</Label>
                  <Input id="email" name="email" type="email" placeholder="john@example.com" className="rounded-none border-2 h-12 focus-visible:ring-0 focus-visible:border-foreground" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="company" className="text-xs uppercase tracking-widest font-bold">Company Name *</Label>
                  <Input id="company" name="company" placeholder="e.g. Google, Startup Inc." className="rounded-none border-2 h-12 focus-visible:ring-0 focus-visible:border-foreground" required />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="role" className="text-xs uppercase tracking-widest font-bold">Current Role *</Label>
                  <Input id="role" name="role" placeholder="e.g. Software Engineer" className="rounded-none border-2 h-12 focus-visible:ring-0 focus-visible:border-foreground" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="experience" className="text-xs uppercase tracking-widest font-bold">Experience *</Label>
                  <Input id="experience" name="experience" placeholder="e.g. 5 Years" className="rounded-none border-2 h-12 focus-visible:ring-0 focus-visible:border-foreground" required />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="linkedin" className="text-xs uppercase tracking-widest font-bold">LinkedIn URL *</Label>
                  <Input id="linkedin" name="linkedin" type="url" placeholder="https://linkedin.com/in/..." className="rounded-none border-2 h-12 focus-visible:ring-0 focus-visible:border-foreground" required />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="skills" className="text-xs uppercase tracking-widest font-bold">Skill Set *</Label>
                <Input id="skills" name="skills" placeholder="React, Node.js, Python (comma separated)" className="rounded-none border-2 h-12 focus-visible:ring-0 focus-visible:border-foreground" required />
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full rounded-none h-14 text-sm font-bold uppercase tracking-widest border-2 border-transparent hover:border-foreground hover:bg-transparent hover:text-foreground transition-all">
                  Access SHP
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
