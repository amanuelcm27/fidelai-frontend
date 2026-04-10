"use client";

import { useState } from "react";
import { 
  Modal, 
  Button, 
  Input, 
  Select 
} from "@/components/ui";
import { 
  Building2, 
  CreditCard, 
  User, 
  Banknote,
  AlertCircle
} from "lucide-react";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const banks = [
  "Commercial Bank of Ethiopia (CBE)",
  "Dashen Bank",
  "Awash Bank",
  "Abyssinia Bank",
  "Hibret Bank",
  "NIB International Bank",
  "TeleBirr",
];

export function WithdrawModal({ isOpen, onClose }: WithdrawModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock processing delay
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Withdraw Earnings">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 flex gap-3">
          <Banknote className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-bold">Available Balance</p>
            <p className="text-2xl font-black text-primary">ETB 4,250.00</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Bank / Payment Provider</label>
            <Select required>
              <option value="">Select a provider</option>
              {banks.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Account Number</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9" placeholder="1000..." required />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Account Holder Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9" placeholder="Full Name" required />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Amount to Withdraw (ETB)</label>
            <Input 
              type="number" 
              placeholder="Min. 500 ETB" 
              min="500" 
              max="4250"
              required 
              className="text-lg font-bold"
            />
          </div>
        </div>

        <div className="p-3 bg-muted rounded-lg flex gap-2 items-start">
          <AlertCircle className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-[10px] text-muted-foreground">
            Withdrawals are processed within 24-48 business hours. Ensure your account details are correct to avoid delays.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="min-w-[140px]"
          >
            {isSubmitting ? "Processing..." : "Submit Request"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
