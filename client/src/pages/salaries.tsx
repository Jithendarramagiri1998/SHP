import Navbar from "@/components/layout/Navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, MapPin } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useMemo, useEffect } from "react";

export default function SalariesPage() {
  const [salaries, setSalaries] = useState<any[]>([]);
  const [roleTerm, setRoleTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================
     FETCH DATA
  ========================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/salaries");

        if (!res.ok) throw new Error("API error");

        const data = await res.json();
        setSalaries(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load salaries");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* =========================
     FILTER
  ========================= */
  const filtered = salaries.filter((s) => {
    return (
      (s.title || "").toLowerCase().includes(roleTerm.toLowerCase()) &&
      (s.location || "").toLowerCase().includes(locationTerm.toLowerCase())
    );
  });

  /* =========================
     STATS
  ========================= */
  const avgBase =
    filtered.length > 0
      ? Math.round(filtered.reduce((a, b) => a + b.base, 0) / filtered.length)
      : 0;

  const lowBase =
    filtered.length > 0 ? Math.min(...filtered.map((s) => s.base)) : 0;

  const highBase =
    filtered.length > 0 ? Math.max(...filtered.map((s) => s.base)) : 0;

  /* =========================
     CHART DATA
  ========================= */
  const chartData = useMemo(() => {
    const buckets: any = {
      "0-2": [],
      "3-5": [],
      "6-8": [],
      "9+": [],
    };

    filtered.forEach((s) => {
      if (s.yoe <= 2) buckets["0-2"].push(s.base);
      else if (s.yoe <= 5) buckets["3-5"].push(s.base);
      else if (s.yoe <= 8) buckets["6-8"].push(s.base);
      else buckets["9+"].push(s.base);
    });

    return Object.entries(buckets).map(([k, v]: any) => ({
      name: k,
      avg: v.length
        ? Math.round(v.reduce((a: number, b: number) => a + b, 0) / v.length)
        : 0,
    }));
  }, [filtered]);

  /* =========================
     LOADING
  ========================= */
  if (loading) {
[O    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading salaries...
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
    <div className="min-h-screen bg-muted/20">
      <Navbar />

      <main className="container mx-auto py-10 px-4">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-6">
          Salary Insights 💰
[I        </h1>

        {/* FILTER */}
        <Card className="mb-6">
          <CardContent className="p-4 grid md:grid-cols-2 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4" />
              <Input
                placeholder="Search Role"
                className="pl-9"
                value={roleTerm}
                onChange={(e) => setRoleTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4" />
              <Input
                placeholder="Search Location"
                className="pl-9"
                value={locationTerm}
                onChange={(e) => setLocationTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* STATS */}
        <Card className="mb-6">
          <CardContent className="p-6 text-center">
            <h2 className="text-4xl font-bold text-primary">
              ${avgBase.toLocaleString()}
            </h2>
            <p className="text-sm text-muted-foreground">
              Average Salary
            </p>

            <div className="mt-3 text-sm text-muted-foreground">
              Low: ${lowBase.toLocaleString()} | High: ${highBase.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        {/* CHART */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={18} />
              Salary by Experience
            </CardTitle>
          </CardHeader>

          <CardContent>
            {chartData.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No data for selected filters
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="avg" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

      </main>
    </div>
  );
}
