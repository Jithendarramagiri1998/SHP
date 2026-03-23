import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Briefcase, Menu, Users, LogIn, PlusCircle, Plus, ChevronDown, UserCircle, Handshake, Heart, MessageSquare, ClipboardList } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

export default function Navbar() {
  const [, setLocation] = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b-0 border-white/10">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col cursor-pointer group"
            >
              <span className="font-display text-2xl font-bold tracking-tight text-foreground gradient-text leading-none">
                SHP
              </span>
              <span className="text-[10px] font-medium text-foreground/60 tracking-widest mt-1">SoftwareHiringProcess</span>
            </motion.div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 font-medium rounded-full glass border-white/10 hover:bg-white/10 transition-all">
                  <Plus className="h-4 w-4" /> Contribute
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 glass-panel border-white/10 rounded-2xl p-2">
                <DropdownMenuLabel className="font-medium text-xs text-foreground/60 px-2 pt-2">Share Insight</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10 my-2" />
                <DropdownMenuItem className="cursor-pointer py-3 rounded-xl focus:bg-white/10 focus:text-foreground transition-all" onClick={() => setLocation('/contribute?tab=interview')}>
                  <MessageSquare className="mr-3 h-4 w-4" />
                  <span className="font-medium text-sm">Interview Experience</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer py-3 rounded-xl focus:bg-white/10 focus:text-foreground transition-all" onClick={() => setLocation('/contribute?tab=job')}>
                  <Briefcase className="mr-3 h-4 w-4" />
                  <span className="font-medium text-sm">Job / Walk-in</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer py-3 rounded-xl focus:bg-white/10 focus:text-foreground transition-all" onClick={() => setLocation('/contribute?tab=referral')}>
                  <Handshake className="mr-3 h-4 w-4" />
                  <span className="font-medium text-sm">Referral</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer py-3 rounded-xl focus:bg-white/10 focus:text-foreground transition-all" onClick={() => setLocation('/contribute?tab=culture')}>
                  <Heart className="mr-3 h-4 w-4" />
                  <span className="font-medium text-sm">Company Culture</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer py-3 rounded-xl focus:bg-white/10 focus:text-foreground transition-all" onClick={() => setLocation('/contribute?tab=hrfeedback')}>
                  <ClipboardList className="mr-3 h-4 w-4" />
                  <span className="font-medium text-sm">HR Feedback</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/profile">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 transition-all">
                <UserCircle className="h-5 w-5" />
              </Button>
            </Link>

            <Link href="/auth">
              <Button className="gap-2 rounded-full font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors">
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            </Link>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden rounded-xl glass border-white/10">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] glass-panel border-l border-white/10 rounded-none p-0">
              <div className="flex flex-col h-full p-6">
                <Link href="/">
                  <div className="border-b border-white/10 pb-6 mb-6 cursor-pointer">
                    <span className="font-display text-2xl font-bold gradient-text block">SHP</span>
                    <span className="text-[10px] font-medium text-foreground/60 tracking-widest mt-1 block">SoftwareHiringProcess</span>
                  </div>
                </Link>
                <div className="flex flex-col gap-4">
                  <Link href="/profile">
                    <Button variant="ghost" className="w-full justify-start gap-3 text-base font-medium rounded-xl hover:bg-white/10 h-12">
                      <UserCircle className="h-5 w-5" />
                      My Profile
                    </Button>
                  </Link>
                  <Button className="w-full justify-start gap-3 text-base font-medium rounded-xl h-12 bg-white/10 hover:bg-white/20 border border-white/5" onClick={() => {
                    setLocation('/contribute');
                  }}>
                    <PlusCircle className="h-5 w-5" /> Add Insight
                  </Button>
                </div>
                <div className="mt-auto">
                  <Link href="/auth">
                    <Button className="w-full justify-center gap-2 font-medium rounded-xl h-12 bg-foreground text-background hover:bg-foreground/90 transition-colors">
                      <LogIn className="h-5 w-5" /> Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}