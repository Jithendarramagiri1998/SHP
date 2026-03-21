import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Building, MessageSquare, ThumbsUp, Calendar, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useStore, Interview } from "@/lib/store";
import { useState } from "react";
import { Link } from "wouter";

export default function InterviewsPage() {
  const { interviews } = useStore();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInterviews = interviews.filter(i => {
    return i.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
           i.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
           i.questions.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Interview Insights</h1>
            <p className="text-muted-foreground mt-1">Read real interview experiences, processes, and questions asked by top companies.</p>
          </div>
          <Link href="/contribute?tab=interview">
            <Button>Add Interview Experience</Button>
          </Link>
        </div>

        <Card className="mb-8 border-border/60 shadow-sm">
          <CardContent className="p-4 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search companies, roles, or questions..." 
                className="pl-9" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {filteredInterviews.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground bg-card border border-border/60 rounded-xl shadow-sm">
              <p>No interview experiences found.</p>
              <p className="mt-2 text-sm">Be the first to share your experience!</p>
            </div>
          ) : (
            filteredInterviews.map((interview: Interview) => (
              <Card key={interview.id} className="border-border/60 shadow-sm overflow-hidden">
                <div className="flex flex-col md:flex-row border-b border-border/50 bg-secondary/20 p-4 gap-4 items-start md:items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-background rounded-lg shadow-sm flex items-center justify-center font-bold text-xl text-primary border border-border/50">
                      {interview.company.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        {interview.company} <span className="text-muted-foreground font-normal text-sm">for {interview.role} ({interview.level})</span>
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {interview.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">Difficulty: <span className="font-medium text-foreground">{interview.difficulty}</span></span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
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
                    <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">{interview.process}</p>
                  </div>

                  <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-primary">
                      <MessageSquare className="h-4 w-4" />
                      Questions Asked & Suggestions
                    </h4>
                    <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{interview.questions}</p>
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                      <ThumbsUp className="h-4 w-4" /> Helpful
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}