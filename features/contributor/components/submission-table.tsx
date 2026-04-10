"use client";

import { 
  Badge, 
  Button 
} from "@/components/ui";
import { 
  Eye, 
  Download, 
  Trash2, 
  MoreVertical,
  Search,
  Filter
} from "lucide-react";
import { motion } from "framer-motion";

interface Submission {
  id: string;
  title: string;
  domain: string;
  status: 'Pending AI QC' | 'Pending Validation' | 'Rejected' | 'Approved';
  score: number;
  date: string;
}

const mockSubmissions: Submission[] = [
  {
    id: "1",
    title: "Amharic News Dataset v1",
    domain: "News",
    status: "Approved",
    score: 94,
    date: "2024-03-20",
  },
  {
    id: "2",
    title: "Legal Proceedings Corpus",
    domain: "Law",
    status: "Pending Validation",
    score: 0,
    date: "2024-03-22",
  },
  {
    id: "3",
    title: "Health Diagnostic Texts",
    domain: "Health",
    status: "Pending AI QC",
    score: 0,
    date: "2024-03-24",
  },
  {
    id: "4",
    title: "Old Amharic Literature",
    domain: "General",
    status: "Rejected",
    score: 42,
    date: "2024-03-15",
  },
];

export function SubmissionTable() {
  const getStatusVariant = (status: Submission['status']) => {
    switch (status) {
      case 'Approved': return 'success';
      case 'Pending AI QC': return 'info';
      case 'Pending Validation': return 'warning';
      case 'Rejected': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-4">
      {/* Table Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/30 p-4 rounded-xl border">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input 
            placeholder="Search submissions..." 
            className="w-full bg-background border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="gap-2 shrink-0">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <div className="text-xs text-muted-foreground ml-auto sm:ml-0">
            Showing {mockSubmissions.length} datasets
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-xl overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 text-muted-foreground font-medium border-b text-left">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Domain</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4">Upload Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {mockSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <Search className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">No submissions found.</p>
                      <Button variant="outline" size="sm">Clear Filters</Button>
                    </div>
                  </td>
                </tr>
              ) : (
                mockSubmissions.map((s, idx) => (
                  <motion.tr 
                    key={s.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-muted/30 transition-colors group"
                  >
                    <td className="px-6 py-4 font-medium">{s.title}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="font-normal capitalize">
                        {s.domain}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={getStatusVariant(s.status)}>
                        {s.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold">
                      {s.score > 0 ? `${s.score}%` : "—"}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{s.date}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
