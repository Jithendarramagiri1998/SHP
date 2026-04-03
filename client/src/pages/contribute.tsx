import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2 } from "lucide-react";
import { useLocation, useSearch } from "wouter";

/* =========================
   AUTH HEADER
========================= */
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export default function ContributePage() {
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const currentTab = searchParams.get("tab") || "interview";

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  /* =========================
     COMMON SUBMIT FUNCTION
  ========================= */
  const submitData = async (url: string, payload: any) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      setLocation("/auth");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(url, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      setSubmitted(true);
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     HANDLERS
  ========================= */

  const handleInterview = (e: any) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);

    submitData("/api/interview", {
      company: f.get("company"),
      role: f.get("role"),
      process: f.get("process"),
      questions: f.get("questions"),
    });
  };

  const handleJob = (e: any) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);

    submitData("/api/job", {
      title: f.get("title"),
      company: f.get("company"),
      location: f.get("location"),
    });
  };

  const handleReferral = (e: any) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);

    submitData("/api/referral", {
      company: f.get("company"),
      role: f.get("role"),
    });
  };

  const handleCulture = (e: any) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);

    submitData("/api/culture", {
      company: f.get("company"),
    });
  };

  const handleHR = (e: any) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);

    submitData("/api/hr-feedback", {
      company: f.get("company"),
    });
  };

  const handleSalary = (e: any) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);

    submitData("/api/salary", {
      company: f.get("company"),
    });
  };

  /* =========================
     SUCCESS UI
  ========================= */
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <CheckCircle2 className="mx-auto text-green-500" size={60} />
          <h2 className="text-2xl mt-4">Submitted Successfully</h2>
          <Button onClick={() => setSubmitted(false)} className="mt-4">
            Submit Another
          </Button>
        </div>
      </div>
    );
  }

  /* =========================
     MAIN UI
  ========================= */
  return (
    <div className="min-h-screen">
      <Navbar />

      <Tabs
        value={currentTab}
        onValueChange={(val) => setLocation(`/contribute?tab=${val}`)}
      >
        <TabsList>
          <TabsTrigger value="interview">Interview</TabsTrigger>
          <TabsTrigger value="job">Job</TabsTrigger>
          <TabsTrigger value="referral">Referral</TabsTrigger>
          <TabsTrigger value="culture">Culture</TabsTrigger>
          <TabsTrigger value="hrfeedback">HR</TabsTrigger>
          <TabsTrigger value="salary">Salary</TabsTrigger>
        </TabsList>

        {/* INTERVIEW */}
        <TabsContent value="interview">
          <form onSubmit={handleInterview} className="space-y-3">
            <Input name="company" placeholder="Company" required />
            <Input name="role" placeholder="Role" required />
            <Input name="process" placeholder="Process" required />
            <Input name="questions" placeholder="Questions" required />
            <Button disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </TabsContent>

        {/* JOB */}
        <TabsContent value="job">
          <form onSubmit={handleJob} className="space-y-3">
            <Input name="title" placeholder="Job Title" required />
            <Input name="company" placeholder="Company" required />
            <Input name="location" placeholder="Location" />
            <Button disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </TabsContent>

        {/* REFERRAL */}
        <TabsContent value="referral">
          <form onSubmit={handleReferral} className="space-y-3">
            <Input name="company" placeholder="Company" required />
            <Input name="role" placeholder="Role" required />
            <Button disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </TabsContent>

        {/* CULTURE */}
        <TabsContent value="culture">
          <form onSubmit={handleCulture} className="space-y-3">
            <Input name="company" placeholder="Company" required />
            <Button disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </TabsContent>

        {/* HR */}
        <TabsContent value="hrfeedback">
          <form onSubmit={handleHR} className="space-y-3">
            <Input name="company" placeholder="Company" required />
            <Button disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </TabsContent>

        {/* SALARY */}
        <TabsContent value="salary">
          <form onSubmit={handleSalary} className="space-y-3">
            <Input name="company" placeholder="Company" required />
            <Button disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
