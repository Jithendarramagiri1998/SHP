import Navbar from "@/components/layout/Navbar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";

/* =========================
   AUTH HEADER
========================= */
const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export default function ProfilePage() {
  const [, setLocation] = useLocation();

  const [user, setUser] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [interviews, setInterviews] = useState<any[]>([]);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH DATA
  ========================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLocation("/auth");
      return;
    }

    const fetchData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");

        setUser(userData);

        const [jobsRes, intRes, refRes] = await Promise.all([
          fetch("/api/jobs"),
          fetch("/api/interviews"),
          fetch("/api/referrals"),
        ]);

        const jobsData = await jobsRes.json();
        const intData = await intRes.json();
        const refData = await refRes.json();

        // filter by userId
        setJobs(jobsData.filter((j: any) => j.userId === userData.id));
        setInterviews(intData.filter((i: any) => i.userId === userData.id));
        setReferrals(refData.filter((r: any) => r.userId === userData.id));

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* =========================
     DELETE
  ========================= */
  const deleteItem = async (type: string, id: string) => {
    try {
      await fetch(`/api/${type}/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      // refresh UI
      window.location.reload();
    } catch {
      alert("Delete failed");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto py-10 px-4">

        {/* USER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold">{user?.username}</h1>
          <p className="text-gray-500">{user?.email}</p>
        </div>

        {/* TABS */}
        <Tabs defaultValue="jobs">

          <TabsList>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
          </TabsList>

          {/* JOBS */}
          <TabsContent value="jobs">
            {jobs.length === 0 ? (
              <p>No jobs</p>
            ) : (
              jobs.map((j) => (
                <Card key={j.id} item={j} onDelete={() => deleteItem("job", j.id)} />
              ))
            )}
          </TabsContent>

          {/* INTERVIEWS */}
          <TabsContent value="interviews">
            {interviews.map((i) => (
              <Card key={i.id} item={i} onDelete={() => deleteItem("interview", i.id)} />
            ))}
          </TabsContent>

          {/* REFERRALS */}
          <TabsContent value="referrals">
            {referrals.map((r) => (
              <Card key={r.id} item={r} onDelete={() => deleteItem("referral", r.id)} />
            ))}
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}

/* =========================
   CARD
========================= */
function Card({ item, onDelete }: any) {
  return (
    <div className="border p-4 rounded flex justify-between items-center mb-3">
      <div>
        <h3 className="font-semibold">{item.title || item.company}</h3>
        <p className="text-sm text-gray-500">{item.role}</p>
      </div>

      <Button variant="destructive" size="sm" onClick={onDelete}>
        <Trash2 size={14} />
      </Button>
    </div>
  );
}
