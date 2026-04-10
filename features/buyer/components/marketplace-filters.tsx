"use client";

import { 
  Input, 
  Select, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Button
} from "@/components/ui";
import { 
  Search, 
  Filter, 
  RotateCcw,
  SlidersHorizontal,
  LayoutGrid,
  SortAsc
} from "lucide-react";

export function MarketplaceFilters() {
  return (
    <Card className="h-fit sticky top-24 border-border/50 shadow-sm">
      <CardHeader className="pb-4 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-primary" />
            Filters
          </CardTitle>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-[10px] uppercase font-bold text-muted-foreground gap-1 hover:text-primary">
            <RotateCcw className="w-3 h-3" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-muted-foreground uppercase">Search Keywords</label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="News, Law, Health..." className="pl-9 h-10 text-sm" />
          </div>
        </div>

        {/* Domain Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-muted-foreground uppercase">Domain</label>
          <Select className="text-sm">
            <option value="">All Domains</option>
            <option value="news">News & Media</option>
            <option value="law">Legal & Government</option>
            <option value="health">Healthcare</option>
            <option value="education">Education</option>
            <option value="general">General Corpus</option>
          </Select>
        </div>

        {/* Year Filter */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-muted-foreground uppercase">Created Year</label>
          <Select className="text-sm">
            <option value="">All Years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </Select>
        </div>

        {/* Dataset Size */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-muted-foreground uppercase">Dataset Size</label>
          <Select className="text-sm">
            <option value="">Any Size</option>
            <option value="small">Small (&lt; 500MB)</option>
            <option value="medium">Medium (500MB - 2GB)</option>
            <option value="large">Large (&gt; 2GB)</option>
          </Select>
        </div>

        {/* QC Score */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-muted-foreground uppercase">Quality Score (QC)</label>
          <Select className="text-sm">
            <option value="">Any Score</option>
            <option value="90+">Excellent (90%+)</option>
            <option value="80+">Good (80%+)</option>
            <option value="70+">Fair (70%+)</option>
          </Select>
        </div>

        {/* License */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-muted-foreground uppercase">License Type</label>
          <Select className="text-sm">
            <option value="">Any License</option>
            <option value="mit">MIT</option>
            <option value="cc">Creative Commons</option>
            <option value="comm">Commercial Use</option>
            <option value="acad">Academic Only</option>
          </Select>
        </div>

        {/* Sort Order */}
        <div className="pt-4 border-t space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2">
              <SortAsc className="w-3.5 h-3.5" />
              Sort By
            </label>
            <Select className="text-sm">
              <option value="newest">Newest First</option>
              <option value="qc">Highest QC Score</option>
              <option value="size">Largest Dataset</option>
              <option value="price-low">Lowest Price</option>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
