import { Link, useLocation, useSearch } from "wouter";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Building2,
  Briefcase,
  Clock,
  MessageSquare,
  Handshake,
  Heart,
  Mail,
  Linkedin,
  ClipboardList,
  ArrowRight,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/* =========================
   MAIN PAGE
========================= */

export default function JobsPage() {
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const currentTab = searchParams.get("tab") || "jobs";

  const [jobs, setJobs] = useState<any[]>([]);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [cultures, setCultures] = useState<any[]>([]);
  const [interviews, setInterviews] = useState<any[]>([]);
  const [hrFeedbacks, setHrFeedbacks] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================
     FETCH DATA
  ========================= */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          jobsRes,
          referralsRes,
          culturesRes,
          interviewsRes,
          hrRes,
        ] = await Promise.all([
          fetch("/api/jobs"),
          fetch("/api/referrals"),
          fetch("/api/cultures"),
          fetch("/api/interviews"),
          fetch("/api/hr-feedback"),
        ]);

        setJobs(await jobsRes.json());
        setReferrals(await referralsRes.json());
        setCultures(await culturesRes.json());
        setInterviews(await interviewsRes.json());
        setHrFeedbacks(await hrRes.json());
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
     LOADING
  ========================= */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading data...
      </div>
    );
  }

  /* =========================
     ERROR
  ========================= */

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  /* =========================
     UI
  ========================= */

  return (
    <div className="min-h-screen relative">
      <Navbar />

      <main className="container mx-auto py-20 px-4 max-w-7xl">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">
            Explore <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-muted-foreground">
            Jobs • Referrals • Interviews • Culture
          </p>
        </div>

        {/* TABS */}
        <Tabs
          value={currentTab}
          onValueChange={(val) => setLocation(`/jobs?tab=${val}`)}
        >
          <TabsList className="flex justify-center mb-8">
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="culture">Culture</TabsTrigger>
            <TabsTrigger value="hrfeedback">HR</TabsTrigger>
          </TabsList>

          {/* JOBS */}
          <TabsContent value="jobs">
            {jobs.length === 0 ? (
              <EmptyState link="/contribute?tab=job" />
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* REFERRALS */}
          <TabsContent value="referrals">
            {referrals.length === 0 ? (
              <EmptyState link="/contribute?tab=referral" />
            ) : (
              <div className="space-y-4">
                {referrals.map((r) => (
                  <Card key={r.id} title={r.company} desc={r.role} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* INTERVIEWS */}
          <TabsContent value="interviews">
            <div className="space-y-4">
              {interviews.map((i) => (
                <Card key={i.id} title={i.company} desc={i.role} />
              ))}
            </div>
          </TabsContent>

          {/* CULTURE */}
          <TabsContent value="culture">
            <div className="space-y-4">
              {cultures.map((c) => (
                <Card key={c.id} title={c.company} desc={c.pros} />
              ))}
            </div>
          </TabsContent>

          {/* HR */}
          <TabsContent value="hrfeedback">
            <div className="space-y-4">
              {hrFeedbacks.map((h) => (
                <Card key={h.id} title={h.company} desc={h.comments} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

/* =========================
   COMPONENTS
========================= */

function EmptyState({ link }: any) {
  return (
    <div className="text-center py-10">
      <p>No data available</p>
      <Link href={link}>
        <Button className="mt-4">Contribute</Button>
      </Link>
    </div>
  );
}

function JobCard({ job }: any) {
  return (
    <div className="border p-4 rounded-lg space-y-2">
      <h3 className="font-semibold text-lg">{job.title}</h3>

      <p className="text-sm flex items-center gap-2">
        <Building2 size={14} /> {job.company}
      </p>

      <p className="text-sm flex items-center gap-2">
        <MapPin size={14} /> {job.location}
      </p>

      {job.experienceRequired && (
        <p className="text-sm flex items-center gap-2">
          <Clock size={14} /> {job.experienceRequired}
        </p>
      )}

      <Button asChild className="mt-3 w-full">
        <a href={job.url || "#"} target="_blank">
          Apply <ArrowRight size={14} />
        </a>
      </Button>
    </div>
  );
}

function Card({ title, desc }: any) {
  return (
    <div className="border p-4 rounded-lg">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
