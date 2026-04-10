"use client";

import { 
  Badge, 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui";
import { 
  Library, 
  Download, 
  FileJson, 
  FileText, 
  Table, 
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  ExternalLink,
  History as HistoryIcon
} from "lucide-react";
import { motion } from "framer-motion";
import { PurchaseHistory } from "@/features/buyer/components/purchase-history";
import { Tabs } from "@/components/ui/tabs";

const purchasedDatasets = [
  { 
    id: "ds-1", 
    title: "Amharic News Corpus 2024", 
    domain: "News", 
    purchaseDate: "2024-03-15", 
    license: "Commercial", 
    status: "Latest Version",
    formats: [
      { type: "JSONL", size: "245 MB" },
      { type: "CSV", size: "190 MB" },
      { type: "Metadata", size: "1.2 MB" }
    ]
  },
  { 
    id: "ds-2", 
    title: "Legal Proceedings Archive", 
    domain: "Law", 
    purchaseDate: "2024-03-22", 
    license: "Academic", 
    status: "Latest Version",
    formats: [
      { type: "JSONL", size: "180 MB" },
      { type: "TXT", size: "120 MB" }
    ]
  },
];

export default function BuyerLibraryPage() {
  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-[0.2em]">
            <Library className="w-4 h-4" />
            My Assets
          </div>
          <h1 className="text-4xl font-black tracking-tight">Dataset Library</h1>
          <p className="text-muted-foreground font-medium">
            Access and manage your purchased datasets and license history.
          </p>
        </div>
      </div>

      <Tabs 
        defaultValue="inventory" 
        className="space-y-8"
        tabs={[
          {
            id: "inventory",
            label: "Inventory",
            icon: <Library className="w-4 h-4" />,
            content: (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {purchasedDatasets.length === 0 ? (
                  <div className="h-[400px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center text-center p-8 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <Library className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-black">Your Library is Empty</h3>
                      <p className="text-muted-foreground max-w-xs">Start browsing the marketplace to build your research collection.</p>
                    </div>
                    <Button className="font-bold">Browse Marketplace</Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {purchasedDatasets.map((ds) => (
                      <Card key={ds.id} className="border-border/50 shadow-sm hover:shadow-md transition-all group overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col lg:flex-row lg:items-center">
                            {/* Left Info Section */}
                            <div className="flex-1 p-6 space-y-4">
                              <div className="flex items-start justify-between gap-4">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-3 mb-1">
                                    <Badge variant="outline" className="text-[10px] uppercase font-black tracking-widest bg-primary/5 border-primary/20 text-primary">
                                      {ds.domain}
                                    </Badge>
                                    <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                                      <CheckCircle2 className="w-3.5 h-3.5" />
                                      {ds.status}
                                    </span>
                                  </div>
                                  <h3 className="text-xl font-black group-hover:text-primary transition-colors">{ds.title}</h3>
                                </div>
                              </div>

                              <div className="flex flex-wrap items-center gap-6 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Calendar className="w-4 h-4 text-primary" />
                                  <span className="font-bold">Purchased:</span>
                                  {ds.purchaseDate}
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground border-l pl-6">
                                  <ShieldCheck className="w-4 h-4 text-primary" />
                                  <span className="font-bold">License:</span>
                                  <Badge variant="ghost" className="rounded-md font-mono font-bold text-[11px] h-6 border">
                                    {ds.license}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            {/* Right Download Section */}
                            <div className="lg:w-[450px] bg-muted/30 p-6 border-t lg:border-t-0 lg:border-l space-y-4">
                              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Download Formats</h4>
                              <div className="grid grid-cols-3 gap-3">
                                {ds.formats.map((f) => (
                                  <button 
                                    key={f.type} 
                                    className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-card border border-border/50 hover:border-primary hover:shadow-lg transition-all group/btn relative overflow-hidden"
                                  >
                                    <Download className="w-4 h-4 text-primary group-hover/btn:translate-y-0.5 transition-transform" />
                                    <span className="text-xs font-black">{f.type}</span>
                                    <span className="text-[10px] text-muted-foreground">{f.size}</span>
                                  </button>
                                ))}
                              </div>
                              <div className="flex items-center gap-2 pt-2">
                                <Button variant="outline" size="sm" className="w-full text-[10px] uppercase font-bold gap-2 bg-card">
                                  <ExternalLink className="w-3.5 h-3.5" />
                                  License Key
                                </Button>
                                <Button variant="outline" size="sm" className="w-full text-[10px] uppercase font-bold gap-2 bg-card text-destructive hover:bg-destructive/10">
                                  <Trash2 className="w-3.5 h-3.5" />
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )
          },
          {
            id: "history",
            label: "Purchase History",
            icon: <HistoryIcon className="w-4 h-4" />,
            content: (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <PurchaseHistory />
              </div>
            )
          }
        ]}
      />
    </div>
  );
}
