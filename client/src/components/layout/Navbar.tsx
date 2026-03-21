import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Briefcase, Menu, Building2, TrendingUp, Users, LogIn, PlusCircle, Plus, ChevronDown, UserCircle } from "lucide-react";
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
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/">
            <span className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-primary cursor-pointer">
              CareerDoor
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="gap-2 shadow-sm font-semibold">
                  <Plus className="h-4 w-4" /> Add
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Contribute</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => setLocation('/contribute?tab=job')}>
                  <Briefcase className="mr-2 h-4 w-4" />
                  <span>Job Opening / Referral</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => setLocation('/contribute?tab=salary')}>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  <span>Salary Insight</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => setLocation('/contribute?tab=interview')}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Interview Experience</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/profile">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <UserCircle className="h-5 w-5" />
              </Button>
            </Link>

            <Link href="/auth">
              <Button variant="outline" className="gap-2 border-primary/20 hover:bg-primary/5">
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            </Link>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 py-6">
                <Link href="/">
                  <span className="font-display text-2xl font-bold text-primary">CareerDoor</span>
                </Link>
                <div className="flex flex-col gap-2">
                  <Link href="/profile">
                    <Button variant="ghost" className="w-full justify-start gap-3 text-lg font-medium">
                      <UserCircle className="h-5 w-5" />
                      My Profile
                    </Button>
                  </Link>
                </div>
                <hr className="border-border" />
                <div className="flex flex-col gap-3 mt-4">
                  <Button className="w-full justify-start gap-2" onClick={() => {
                    setLocation('/contribute');
                  }}>
                    <PlusCircle className="h-4 w-4" /> Add Contribution
                  </Button>
                  <Link href="/auth">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <LogIn className="h-4 w-4" /> Sign In
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