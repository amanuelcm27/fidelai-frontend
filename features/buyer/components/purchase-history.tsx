"use client";

import { 
  Badge, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui";
import { 
  History, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2,
  FileText,
  Search
} from "lucide-react";
import { motion } from "framer-motion";

const mockHistory = [
  { id: "TX-9021", name: "Legal Proceedings Archive", date: "2024-03-22", price: 1200.00, license: "Academic", status: "Completed" },
  { id: "TX-8842", name: "Amharic News Corpus 2024", date: "2024-03-15", price: 450.00, license: "Commercial", status: "Completed" },
  { id: "TX-8710", name: "Historical Amharic Texts", date: "2024-02-28", price: 800.00, license: "CC-BY-4.0", status: "Completed" },
];

export function PurchaseHistory() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <History className="w-5 h-5 text-primary" />
          Order History
        </h3>
        <div className="relative w-full sm:w-64">
           <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
           <input 
            placeholder="Search orders..." 
            className="w-full h-10 pl-9 pr-4 rounded-xl border bg-card text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
           />
        </div>
      </div>

      <div className="border rounded-2xl overflow-hidden bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 text-muted-foreground font-bold border-b text-left">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Dataset Name</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">License</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {mockHistory.map((item, idx) => (
                <motion.tr 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-muted/30 transition-colors group cursor-default"
                >
                  <td className="px-6 py-4">
                     <span className="font-mono text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors">
                       {item.id}
                     </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-black">
                      <FileText className="w-4 h-4 text-primary opacity-40" />
                      {item.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground font-medium">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 font-black text-primary">
                    ETB {item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="font-mono font-bold text-[10px] uppercase">
                      {item.license}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-bold text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" />
                      {item.status}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 bg-muted/20 border-t flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-widest">
           <span>Total Expenditures</span>
           <span className="text-primary text-sm font-black tracking-normal">ETB 2,450.00</span>
        </div>
      </div>
    </div>
  );
}
