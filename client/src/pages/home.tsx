import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Search } from "lucide-react";

/* =========================
   HOME PAGE
========================= */

export default function Home() {

  /* =========================
     STATE
  ========================= */

  const [jobs, setJobs] = useState<any[]>([]);
  const [interviews, setInterviews] = useState<any[]>([]);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [salaries, setSalaries] = useState<any[]>([]);
  const [cultures, setCultures] = useState<any[]>([]);
  const [hrFeedbacks, setHrFeedbacks] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  /* =========================
     FETCH DATA
  ========================= */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          jobsRes,
          interviewsRes,
          referralsRes,
          salariesRes,
          culturesRes,
          hrRes,
        ] = await Promise.all([
          fetch("/api/jobs"),
          fetch("/api/interviews"),
          fetch("/api/referrals"),
          fetch("/api/salaries"),
          fetch("/api/cultures"),
          fetch("/api/hr-feedback"),
        ]);

        setJobs(await jobsRes.json());
        setInterviews(await interviewsRes.json());
        setReferrals(await referralsRes.json());
        setSalaries(await salariesRes.json());
        setCultures(await culturesRes.json());
        setHrFeedbacks(await hrRes.json());

      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* =========================
     SEARCH FILTER
  ========================= */

  const filterData = (data: any[]) => {
    return data.filter((item) =>
      (item.company || item.title || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  };

  const recentJobs = useMemo(() => filterData(jobs).slice(0, 5), [jobs, search]);
  const recentInterviews = useMemo(() => filterData(interviews).slice(0, 5), [interviews, search]);
  const recentReferrals = useMemo(() => filterData(referrals).slice(0, 5), [referrals, search]);

  /* =========================
     LOADING UI
  ========================= */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading data...</p>
      </div>
    );
  }

  /* =========================
     UI
  ========================= */

[O  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto py-10 px-4">

        {/* HERO */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">
            Real Tech Insights 🚀
          </h1>
          <p className="text-gray-500">
            Jobs • Interviews • Salaries • Referrals
          </p>
        </div>

        {/* SEARCH */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4" />
            <Input
              placeholder="Search company..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* JOBS */}
        <section className="mb-10">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Latest Jobs</h2>
            <Link href="/jobs">
              <Button variant="ghost">View All</Button>
            </Link>
          </div>

          {recentJobs.length === 0 ? (
            <p>No jobs found</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentJobs.map((job) => (
                <div key={job.id} className="border p-4 rounded">
                  <h3 className="font-semibold">{job.title}</h3>
                  <p className="text-sm">{job.company}</p>
                  <Badge>{job.location}</Badge>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* INTERVIEWS */}
        <section className="mb-10">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Interview Experiences</h2>
          </div>

          {recentInterviews.length === 0 ? (
[I            <p>No interviews found</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {recentInterviews.map((i) => (
                <div key={i.id} className="border p-4 rounded">
                  <h3>{i.company}</h3>
                  <p className="text-sm">{i.role}</p>
                  <p className="text-xs">{i.process}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* REFERRALS */}
        <section>
          <h2 className="text-xl font-bold mb-4">Referrals</h2>

          {recentReferrals.length === 0 ? (
            <p>No referrals found</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {recentReferrals.map((r) => (
                <div key={r.id} className="border p-4 rounded">
                  <h3>{r.company}</h3>
                  <p className="text-sm">{r.role}</p>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
