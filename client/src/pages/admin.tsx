import Navbar from "@/components/layout/Navbar";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { apiFetch } from "@/lib/api";
import { isAdmin, isLoggedIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* =========================
   ADMIN PAGE
========================= */

export default function AdminPage() {
  const [, setLocation] = useLocation();

  const [jobs, setJobs] = useState<any[]>([]);
  const [interviews, setInterviews] = useState<any[]>([]);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     PROTECT ROUTE
  ========================= */
  useEffect(() => {
    if (!isLoggedIn()) {
      setLocation("/auth");
      return;
    }

    if (!isAdmin()) {
      setLocation("/");
      return;
    }

    fetchData();
  }, []);

  /* =========================
     FETCH DATA
  ========================= */
  const fetchData = async () => {
    try {
      const [jobsRes, intRes, refRes] = await Promise.all([
        apiFetch("/api/jobs"),
        apiFetch("/api/interviews"),
        apiFetch("/api/referrals"),
      ]);

      setJobs(await jobsRes.json());
      setInterviews(await intRes.json());
      setReferrals(await refRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     DELETE
  ========================= */
  const deleteItem = async (type: string, id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      await apiFetch(`/api/${type}/${id}`, {
        method: "DELETE",
      });

      fetchData();
    } catch {
      alert("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading admin panel...
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto py-10 px-4">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-6">
          Admin Dashboard 👑
        </h1>

        {/* TABS */}
        <Tabs defaultValue="jobs">

          <TabsList>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
          </TabsList>

          {/* JOBS */}
          <TabsContent value="jobs">
            {jobs.map((j) => (
              <Card
                key={j.id}
                item={j}
                onDelete={() => deleteItem("job", j.id)}
              />
            ))}
          </TabsContent>

          {/* INTERVIEWS */}
          <TabsContent value="interviews">
            {interviews.map((i) => (
              <Card
                key={i.id}
                item={i}
                onDelete={() => deleteItem("interview", i.id)}
              />
            ))}
          </TabsContent>

          {/* REFERRALS */}
          <TabsContent value="referrals">
            {referrals.map((r) => (
              <Card
                key={r.id}
                item={r}
                onDelete={() => deleteItem("referral", r.id)}
              />
            ))}
          </TabsContent>

        </Tabs>

      </div>
    </div>
  );
}

/* =========================
   CARD COMPONENT
========================= */

function Card({ item, onDelete }: any) {
  return (
    <div className="border p-4 rounded flex justify-between items-center mb-3">
      <div>
        <h3 className="font-semibold">
          {item.title || item.company}
        </h3>
        <p className="text-sm text-gray-500">
          {item.role || item.location}
        </p>
      </div>

      <Button
        variant="destructive"
        size="sm"
        onClick={onDelete}
      >
        <Trash2 size={14} />
      </Button>
    </div>
  );
}
