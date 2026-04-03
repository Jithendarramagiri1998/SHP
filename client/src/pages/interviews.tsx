import Navbar from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  MessageSquare,
  ThumbsUp,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Link } from "wouter";

/* =========================
   TYPES
========================= */
type Interview = {
  id: string;
  company: string;
  role: string;
  level?: string;
  difficulty?: string;
  outcome?: string;
  process?: string;
  questions?: string;
  createdAt: string;
};

/* =========================
   PAGE
========================= */
export default function InterviewsPage() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================
     FETCH DATA
  ========================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/interviews");

        if (!res.ok) {
          throw new Error("Failed to fetch interviews");
        }

        const data = await res.json();
        setInterviews(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* =========================
     FILTER
  ========================= */
  const filtered = interviews.filter((i) =>
    [i.company, i.role, i.questions]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  /* =========================
     UI
  ========================= */
  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />

      <main className="container mx-auto py-8 px-4 md:px-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Interview Insights</h1>
            <p className="text-muted-foreground mt-1">
              Real interview experiences from top companies.
            </p>
          </div>

          <Link href="/contribute?tab=interview">
            <Button>Add Experience</Button>
          </Link>
        </div>

        {/* SEARCH */}
        <Card className="mb-8">
          <CardContent className="p-4 flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4" />
              <Input
                placeholder="Search..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-10">Loading...</div>
        )}

        {/* ERROR */}
        {error && (
          <div className="text-center text-red-500">{error}</div>
        )}

        {/* EMPTY */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-10">
            No interviews found
          </div>
        )}

        {/* LIST */}
        <div className="space-y-6">
          {filtered.map((i) => (
            <Card key={i.id}>

              {/* HEADER */}
              <div className="flex justify-between p-4 border-b">
                <div>
                  <h3 className="font-semibold">
                    {i.company} – {i.role}
                  </h3>

                  <p className="text-sm text-muted-foreground flex gap-2">
                    <Calendar size={14} />
                    {new Date(i.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <Badge>{i.outcome}</Badge>
              </div>

              {/* BODY */}
              <CardContent className="space-y-4">

                <div>
                  <h4 className="font-semibold flex gap-2">
                    <AlertCircle size={14} />
                    Process
                  </h4>
                  <p className="text-sm">{i.process}</p>
                </div>

                <div className="bg-muted p-3 rounded">
                  <h4 className="font-semibold flex gap-2">
                    <MessageSquare size={14} />
                    Questions
                  </h4>
                  <p className="text-sm">{i.questions}</p>
                </div>

                <Button variant="ghost" size="sm">
                  <ThumbsUp size={14} /> Helpful
                </Button>

              </CardContent>
            </Card>
          ))}
        </div>

      </main>
    </div>
  );
}
