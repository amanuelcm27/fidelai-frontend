"use client";

import { useParams, useRouter } from "next/navigation";
import { mockDatasets } from "@/features/buyer/data/mock-datasets";
import { DatasetDetails } from "@/features/buyer/components/dataset-details";
import { Button } from "@/components/ui";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function DatasetPage() {
  const { datasetId } = useParams();
  const router = useRouter();
  
  const dataset = mockDatasets.find((d) => d.id === datasetId);

  if (!dataset) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] space-y-4">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black">Dataset Not Found</h2>
          <p className="text-muted-foreground">The dataset your are looking for might have been removed or moved.</p>
        </div>
        <Link href="/buyer/marketplace">
          <Button variant="outline" className="font-bold gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/buyer/marketplace">
           <Button variant="ghost" size="sm" className="font-bold gap-2 transition-all hover:gap-3 group">
              <ArrowLeft className="w-4 h-4 text-primary" />
              <span className="group-hover:text-primary">Back to Market</span>
           </Button>
        </Link>
      </div>
      
      <DatasetDetails dataset={dataset} />
    </div>
  );
}
