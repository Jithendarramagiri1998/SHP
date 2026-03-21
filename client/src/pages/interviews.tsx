import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Building, MessageSquare, ThumbsUp, Calendar, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const INTERVIEWS = [
  { 
    id: 1, 
    company: "Google", 
    role: "Frontend Engineer", 
    difficulty: "Hard", 
    outcome: "Offer",
    date: "2 weeks ago",
    experience: "Positive",
    process: "1 Phone screen, 1 Take-home assignment, 4 Onsite rounds (Algorithms, System Design, 2x Frontend specific).",
    question: "Design and implement a generic debounce function in JavaScript. Then use it to optimize a search input component in React that fetches data from an API."
  },
  { 
    id: 2, 
    company: "Amazon", 
    role: "Product Manager", 
    difficulty: "Medium", 
    outcome: "No Offer",
    date: "1 month ago",
    experience: "Neutral",
    process: "Recruiter screen -> Hiring Manager -> Writing Exercise -> Loop (5 interviews focusing heavily on Leadership Principles).",
    question: "Tell me about a time you had to make a decision without enough data. How did you handle the ambiguity and what was the result?"
  }
];

export default function InterviewsPage() {
  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Interview Insights</h1>
            <p className="text-muted-foreground mt-1">Read real interview experiences, processes, and questions asked by top companies.</p>
          </div>
          <Button>Add Interview Experience</Button>
        </div>

        <Card className="mb-8 border-border/60 shadow-sm">
          <CardContent className="p-4 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search companies, roles, or questions..." className="pl-9" />
            </div>
            <Button className="md:w-32">Search</Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {INTERVIEWS.map(interview => (
            <Card key={interview.id} className="border-border/60 shadow-sm overflow-hidden">
              <div className="flex flex-col md:flex-row border-b border-border/50 bg-secondary/20 p-4 gap-4 items-start md:items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-background rounded-lg shadow-sm flex items-center justify-center font-bold text-xl text-primary border border-border/50">
                    {interview.company.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      {interview.company} <span className="text-muted-foreground font-normal text-sm">for {interview.role}</span>
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {interview.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">Experience: <span className="font-medium text-foreground">{interview.experience}</span></span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant={interview.difficulty === "Hard" ? "destructive" : "secondary"}>
                    {interview.difficulty}
                  </Badge>
                  <Badge variant={interview.outcome === "Offer" ? "default" : "outline"} className={interview.outcome === "Offer" ? "bg-green-600 hover:bg-green-700" : ""}>
                    {interview.outcome}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-6">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    Interview Process
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{interview.process}</p>
                </div>

                <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2 text-primary">
                    <MessageSquare className="h-4 w-4" />
                    Question Asked
                  </h4>
                  <p className="text-sm font-medium leading-relaxed">"{interview.question}"</p>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                    <ThumbsUp className="h-4 w-4" /> Helpful (24)
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}