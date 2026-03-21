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

export default function Navbar() {
  const [, setLocation] = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b-4 border-foreground bg-background">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/">
            <span className="flex items-center gap-2 font-display text-2xl font-black tracking-tighter uppercase text-foreground cursor-pointer hover:bg-foreground hover:text-background transition-colors px-2 py-1">softwaretruth</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="gap-2 font-bold uppercase tracking-widest rounded-none border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <Plus className="h-4 w-4" /> Contribute
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 rounded-none border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <DropdownMenuLabel className="font-bold uppercase tracking-wider text-xs">Share Insight</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-foreground" />
                <DropdownMenuItem className="cursor-pointer py-3 rounded-none focus:bg-foreground focus:text-background" onClick={() => setLocation('/contribute?tab=interview')}>
                  <MessageSquare className="mr-3 h-4 w-4" />
                  <span className="font-bold uppercase tracking-wider text-sm">Interview</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer py-3 rounded-none focus:bg-foreground focus:text-background" onClick={() => setLocation('/contribute?tab=job')}>
                  <Briefcase className="mr-3 h-4 w-4" />
                  <span className="font-bold uppercase tracking-wider text-sm">Job / Walk-in</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer py-3 rounded-none focus:bg-foreground focus:text-background" onClick={() => setLocation('/contribute?tab=referral')}>
                  <Handshake className="mr-3 h-4 w-4" />
                  <span className="font-bold uppercase tracking-wider text-sm">Referral</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer py-3 rounded-none focus:bg-foreground focus:text-background" onClick={() => setLocation('/contribute?tab=culture')}>
                  <Heart className="mr-3 h-4 w-4" />
                  <span className="font-bold uppercase tracking-wider text-sm">Culture</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer py-3 rounded-none focus:bg-foreground focus:text-background" onClick={() => setLocation('/contribute?tab=hrfeedback')}>
                  <ClipboardList className="mr-3 h-4 w-4" />
                  <span className="font-bold uppercase tracking-wider text-sm">HR Feedback</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/profile">
              <Button variant="ghost" size="icon" className="rounded-none border-2 border-transparent hover:border-foreground transition-all">
                <UserCircle className="h-6 w-6" />
              </Button>
            </Link>

            <Link href="/auth">
              <Button variant="outline" className="gap-2 rounded-none border-2 border-foreground font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors">
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            </Link>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden rounded-none border-2 border-foreground">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-4 border-foreground rounded-none p-0">
              <div className="flex flex-col h-full bg-background p-6">
                <Link href="/">
                  <span className="font-display text-3xl font-black uppercase tracking-tighter border-b-4 border-foreground pb-6 mb-6 block">CareerDoor</span>
                </Link>
                <div className="flex flex-col gap-4">
                  <Link href="/profile">
                    <Button variant="outline" className="w-full justify-start gap-3 text-lg font-bold uppercase tracking-wider rounded-none border-2 border-foreground h-14">
                      <UserCircle className="h-5 w-5" />
                      My Profile
                    </Button>
                  </Link>
                  <Button className="w-full justify-start gap-3 text-lg font-bold uppercase tracking-wider rounded-none border-2 border-foreground h-14 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" onClick={() => {
                    setLocation('/contribute');
                  }}>
                    <PlusCircle className="h-5 w-5" /> Add Insight
                  </Button>
                </div>
                <div className="mt-auto">
                  <Link href="/auth">
                    <Button variant="outline" className="w-full justify-center gap-2 font-bold uppercase tracking-widest rounded-none border-2 border-foreground h-14 bg-foreground text-background hover:bg-background hover:text-foreground transition-colors">
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