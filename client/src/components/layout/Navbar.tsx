import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Menu,
  LogIn,
  Plus,
  UserCircle,
  LogOut,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [, setLocation] = useLocation();

  const [user, setUser] = useState<any>(null);

  /* =========================
     LOAD USER FROM STORAGE
  ========================= */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /* =========================
     LOGOUT
  ========================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    setUser(null);
    setLocation("/auth");
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-white/10">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">

        {/* LOGO */}
        <Link href="/">
          <motion.div className="flex flex-col cursor-pointer">
            <span className="font-display text-2xl font-bold gradient-text">
              SHP
            </span>
          </motion.div>
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-4">

            <Button
              variant="outline"
              className="gap-2 rounded-full"
              onClick={() => setLocation("/contribute")}
            >
              <Plus className="h-4 w-4" /> Contribute
            </Button>

            {/* ✅ IF LOGGED IN */}
            {user ? (
              <>
                <Link href="/profile">
                  <Button variant="ghost" size="icon">
                    <UserCircle className="h-5 w-5" />
                  </Button>
                </Link>

                <Button
                  onClick={handleLogout}
                  className="gap-2 bg-red-500 text-white"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </Button>
              </>
            ) : (
              /* ❌ NOT LOGGED IN */
              <Link href="/auth">
                <Button className="gap-2 bg-black text-white">
                  <LogIn className="h-4 w-4" /> Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* MOBILE */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="p-6">

              <div className="flex flex-col gap-4">

                <Link href="/profile">
                  <Button className="w-full">Profile</Button>
                </Link>

                <Button
                  className="w-full"
                  onClick={() => setLocation("/contribute")}
                >
                  Add Insight
                </Button>

                {user ? (
                  <Button
                    className="w-full bg-red-500 text-white"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                ) : (
                  <Link href="/auth">
                    <Button className="w-full">Sign In</Button>
                  </Link>
                )}
              </div>

            </SheetContent>
          </Sheet>

        </div>
      </div>
    </nav>
  );
}
