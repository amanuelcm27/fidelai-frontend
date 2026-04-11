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
  UserCircle, 
  FileText, 
  CheckCircle2, 
  XSquare, 
  Eye,
  Briefcase
} from "lucide-react";
import { mockRoleApplications } from "../data/mock-admin-data";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";

export function RoleApprovals() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState<{name: string, url: string, type: string}[]>([]);

  const handlePreview = (docs: {name: string, url: string, type: string}[]) => {
    setSelectedDocs(docs);
    setIsPreviewOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-black flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          Pending Role Applications
        </h3>
      </div>

      <div className="grid gap-4">
        {mockRoleApplications.map((app) => (
          <Card key={app.id} className="border-border/50 shadow-sm overflow-hidden bg-card/50">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="flex-1 p-6 flex flex-col md:flex-row md:items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                    <UserCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <p className="font-black text-lg">{app.userName}</p>
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 scale-90">
                        {app.roleApplied}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">Applied on {app.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-muted/40 border-t md:border-t-0 md:border-l border-border/50 shrink-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="font-bold gap-2 bg-background shadow-sm"
                    onClick={() => handlePreview(app.documents)}
                  >
                    <Eye className="h-4 w-4" />
                    Review Docs
                  </Button>
                  <div className="h-8 w-px bg-border/50" />
                  <div className="flex items-center gap-2">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 font-bold gap-2 shadow-lg shadow-emerald-500/20">
                       <CheckCircle2 className="h-4 w-4" />
                       Approve
                    </Button>
                    <Button size="sm" variant="ghost" className="text-rose-500 hover:bg-rose-500/10 font-bold gap-2">
                       <XSquare className="h-4 w-4" />
                       Reject
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)}
        title="Supporting Documents Preview"
      >
        <div className="space-y-4 pt-4">
          <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-xl border italic">
            Visual preview of official documents and certifications.
          </p>
          <div className="grid gap-3">
            {selectedDocs.map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl border bg-background group hover:border-primary transition-all">
                <div className="flex items-center gap-3">
                   <FileText className="h-5 w-5 text-primary" />
                   <div>
                      <p className="text-sm font-bold">{doc.name}</p>
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{doc.type}</p>
                   </div>
                </div>
                <Button size="sm" className="gap-2 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="h-3 w-3" />
                  View Original
                </Button>
              </div>
            ))}
          </div>
          <div className="flex justify-end pt-4 gap-3">
             <Button variant="ghost" onClick={() => setIsPreviewOpen(false)}>Close</Button>
             <Button className="font-bold shadow-lg shadow-primary/20">Verify & Approve</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
