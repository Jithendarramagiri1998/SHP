import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const [jobs, setJobs] = useState<any[]>([]);
  const [salaries, setSalaries] = useState<any[]>([]);
  const [interviews, setInterviews] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH DATA
  ========================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsRes, salRes, intRes] = await Promise.all([
          fetch("/api/jobs"),
          fetch("/api/salaries"),
          fetch("/api/interviews"),
        ]);

        setJobs(await jobsRes.json());
        setSalaries(await salRes.json());
        setInterviews(await intRes.json());
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* =========================
     AGGREGATE DATA
  ========================= */

  const companiesMap = new Map();

  const addCompany = (name: string, location: string) => {
    if (!name) return;

    if (!companiesMap.has(name)) {
      companiesMap.set(name, {
        name,
        locations: new Set(),
        jobs: 0,
        salaries: 0,
        interviews: 0,
        total: 0,
      });
    }

    const comp = companiesMap.get(name);

    if (location) comp.locations.add(location);
    comp.total++;

    return comp;
  };

  jobs.forEach(j => {
    const c = addCompany(j.company, j.location);
    if (c) c.jobs++;
  });

  salaries.forEach(s => {
    const c = addCompany(s.company, s.location);
    if (c) c.salaries++;
  });

  interviews.forEach(i => {
    const c = addCompany(i.company, "");
    if (c) c.interviews++;
  });

  const companies = Array.from(companiesMap.values()).filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* =========================
     UI
  ========================= */

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />

      <main className="container mx-auto py-8 px-4">

        <h1 className="text-3xl font-bold mb-6">Companies</h1>

        <div className="mb-6">
          <Input
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : companies.length === 0 ? (
          <p>No companies found</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
[O
            {companies.map((c: any, i: number) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>{c.name}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-2">

                  {c.locations.size > 0 && (
                    <p className="flex items-center gap-2 text-sm">
                      <MapPin size={14} />
                      {Array.from(c.locations).join(", ")}
                    </p>
                  )}

                  <div className="flex gap-2 flex-wrap">
                    {c.jobs > 0 && <Badge>{c.jobs} Jobs</Badge>}
                    {c.salaries > 0 && <Badge>{c.salaries} Salaries</Badge>}
                    {c.interviews > 0 && <Badge>{c.interviews} Interviews</Badge>}
                  </div>

                </CardContent>
              </Card>
            ))}

          </div>
        )}

      </main>
    </div>
  );
}
