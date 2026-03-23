import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/lib/store";
import { motion } from "framer-motion";

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

  const GlassInput = ({ id, name, type="text", placeholder, label, required=false }: any) => (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-xs font-medium text-foreground/60 uppercase tracking-widest ml-1">{label} {required && "*"}</Label>
      <Input 
        id={id} 
        name={name} 
        type={type}
        placeholder={placeholder} 
        className="h-12 bg-white/[0.03] border-white/10 rounded-xl focus-visible:ring-1 focus-visible:ring-white/20 focus-visible:border-white/20 transition-all font-medium placeholder:text-foreground/20" 
        required={required} 
      />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none translate-x-1/2 translate-y-1/2" />

      <div className="w-full max-w-xl relative z-10">
        <Link href="/">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center mb-12 cursor-pointer group"
          >
            <span className="font-display text-5xl font-bold tracking-tight text-foreground gradient-text leading-none">
              SHP
            </span>
            <span className="text-xs font-medium text-foreground/50 tracking-widest mt-2 uppercase">SoftwareHiringProcess</span>
          </motion.div>
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-panel rounded-3xl p-8 md:p-10 shadow-2xl"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold tracking-tight mb-2">Join the Network</h2>
            <p className="text-sm font-medium text-foreground/50">Enter your professional details to access insights.</p>
          </div>
          
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassInput id="name" name="name" label="Full Name" placeholder="John Doe" required />
              <GlassInput id="email" name="email" type="email" label="Email Address" placeholder="john@example.com" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassInput id="company" name="company" label="Company" placeholder="e.g. Google" required />
              <GlassInput id="role" name="role" label="Current Role" placeholder="e.g. Software Engineer" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassInput id="experience" name="experience" label="Experience" placeholder="e.g. 5 Years" required />
              <GlassInput id="linkedin" name="linkedin" type="url" label="LinkedIn URL" placeholder="https://linkedin.com/in/..." required />
            </div>

            <GlassInput id="skills" name="skills" label="Skill Set" placeholder="React, Node.js, Python (comma separated)" required />

            <div className="pt-6">
              <Button type="submit" className="w-full h-14 rounded-xl font-medium text-base bg-foreground text-background hover:bg-foreground/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Access SHP
              </Button>
            </div>

          </form>
        </motion.div>

      </div>
    </div>
  );
}