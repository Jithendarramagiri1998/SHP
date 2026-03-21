import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Briefcase, Search, Menu, Building2, TrendingUp, Users, LogIn } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [location] = useLocation();

  const navLinks = [
    { name: "Jobs", href: "/jobs", icon: Briefcase },
    { name: "Companies", href: "/companies", icon: Building2 },
    { name: "Salaries", href: "/salaries", icon: TrendingUp },
    { name: "Interviews", href: "/interviews", icon: Users },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/">
            <span className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-primary cursor-pointer">
              CareerDoor
            </span>
          </Link>
          
          <div className="hidden md:flex gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.startsWith(link.href);
              return (
                <Link key={link.name} href={link.href}>
                  <Button 
                    variant={isActive ? "secondary" : "ghost"} 
                    size="sm" 
                    className={`gap-2 ${isActive ? 'font-semibold text-primary' : 'text-muted-foreground'}`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.name}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Link href="/auth">
              <Button variant="outline" className="gap-2 border-primary/20 hover:bg-primary/5">
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            </Link>
            <Link href="/auth">
              <Button className="gap-2 shadow-sm">
                Join CareerDoor
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
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link key={link.name} href={link.href}>
                        <Button variant="ghost" className="w-full justify-start gap-3 text-lg font-medium">
                          <Icon className="h-5 w-5" />
                          {link.name}
                        </Button>
                      </Link>
                    );
                  })}
                </div>
                <hr className="border-border" />
                <div className="flex flex-col gap-3 mt-4">
                  <Link href="/auth">
                    <Button variant="outline" className="w-full justify-start">Sign In</Button>
                  </Link>
                  <Link href="/auth">
                    <Button className="w-full justify-start">Join CareerDoor</Button>
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