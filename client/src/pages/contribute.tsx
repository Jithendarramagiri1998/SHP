import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Sparkles, CheckCircle2, MessageSquare, Handshake, Heart, ClipboardList, TrendingUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation, useSearch } from "wouter";
import { useStore } from "@/lib/store";
import { motion } from "framer-motion";

export default function ContributePage() {
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const currentTab = searchParams.get('tab') || "interview";

  const { profile } = useStore();
  const [submitted, setSubmitted] = useState(false);

  /* =========================
     INTERVIEW
  ========================= */
  const handleInterviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await fetch("/api/interview", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        company: formData.get("company"),
        role: formData.get("role"),
        difficulty: formData.get("difficulty"),
        level: formData.get("level"),
        outcome: formData.get("outcome"),
        experience: formData.get("experience"),
        process: formData.get("process"),
        questions: formData.get("questions"),
      }),
    });

    setSubmitted(true);
  };

  /* =========================
     JOB
  ========================= */
  const handleJobSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await fetch("/api/job", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        title: formData.get("title"),
        company: formData.get("company"),
        location: formData.get("location"),
        experienceRequired: formData.get("experienceRequired"),
        description: formData.get("description"),
        url: formData.get("url"),
      }),
    });

    setSubmitted(true);
  };

  /* =========================
     REFERRAL
  ========================= */
  const handleReferralSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await fetch("/api/referral", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        company: formData.get("company"),
        role: formData.get("role"),
        location: formData.get("location"),
        experienceRequired: formData.get("experienceRequired"),
        instructions: formData.get("instructions"),
        contactEmail: formData.get("contactEmail"),
        contactLinkedin: formData.get("contactLinkedin"),
      }),
    });

    setSubmitted(true);
  };

  /* =========================
     CULTURE
  ========================= */
  const handleCultureSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await fetch("/api/culture", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        company: formData.get("company"),
        rating: Number(formData.get("rating")),
        pros: formData.get("pros"),
        cons: formData.get("cons"),
        workLifeBalance: formData.get("workLifeBalance"),
        management: formData.get("management"),
      }),
    });

    setSubmitted(true);
  };

  /* =========================
     HR FEEDBACK
  ========================= */
  const handleHrFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await fetch("/api/hr-feedback", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        company: formData.get("company"),
        hrName: formData.get("hrName"),
        hrEmail: formData.get("hrEmail"),
        hrLinkedin: formData.get("hrLinkedin"),
        comments: formData.get("comments"),
      }),
    });

    setSubmitted(true);
  };

  /* =========================
     SALARY
  ========================= */
  const handleSalarySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await fetch("/api/salary", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        company: formData.get("company"),
        location: formData.get("location"),
        title: formData.get("title"),
        yoe: Number(formData.get("yoe")),
        base: Number(formData.get("base")),
        bonus: Number(formData.get("bonus")),
        stock: Number(formData.get("stock")),
      }),
    });

    setSubmitted(true);
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
    <div>
      <Navbar />

      <Tabs value={currentTab} onValueChange={(val) => setLocation(`/contribute?tab=${val}`)}>
        
        <TabsList>
          <TabsTrigger value="interview">Interview</TabsTrigger>
          <TabsTrigger value="job">Job</TabsTrigger>
          <TabsTrigger value="referral">Referral</TabsTrigger>
          <TabsTrigger value="culture">Culture</TabsTrigger>
          <TabsTrigger value="hrfeedback">HR</TabsTrigger>
          <TabsTrigger value="salary">Salary</TabsTrigger>
        </TabsList>

        <TabsContent value="interview">
          <form onSubmit={handleInterviewSubmit}>
            <Input name="company" placeholder="Company" required />
            <Input name="role" placeholder="Role" required />
            <Textarea name="process" placeholder="Process" required />
            <Textarea name="questions" placeholder="Questions" required />
            <Button type="submit">Submit</Button>
          </form>
        </TabsContent>

        <TabsContent value="job">
          <form onSubmit={handleJobSubmit}>
            <Input name="title" placeholder="Job Title" required />
            <Input name="company" placeholder="Company" required />
            <Button type="submit">Submit</Button>
          </form>
        </TabsContent>

        <TabsContent value="referral">
          <form onSubmit={handleReferralSubmit}>
            <Input name="company" placeholder="Company" required />
            <Input name="role" placeholder="Role" required />
            <Button type="submit">Submit</Button>
          </form>
        </TabsContent>

        <TabsContent value="culture">
          <form onSubmit={handleCultureSubmit}>
            <Input name="company" placeholder="Company" required />
            <Button type="submit">Submit</Button>
          </form>
        </TabsContent>

        <TabsContent value="hrfeedback">
          <form onSubmit={handleHrFeedbackSubmit}>
            <Input name="company" placeholder="Company" required />
            <Button type="submit">Submit</Button>
          </form>
        </TabsContent>

        <TabsContent value="salary">
          <form onSubmit={handleSalarySubmit}>
            <Input name="company" placeholder="Company" required />
            <Button type="submit">Submit</Button>
          </form>
        </TabsContent>

      </Tabs>
    </div>
  );
}
