import { useState } from "react";
import { HeadsetPrefix } from "@/types/headset";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Headphones, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface AddHeadsetFormProps {
  onAdd: (prefix: HeadsetPrefix, number: string, assignedTo: string) => void;
}

const AddHeadsetForm = ({ onAdd }: AddHeadsetFormProps) => {
  const [prefix, setPrefix] = useState<HeadsetPrefix>("PR-HS");
  const [number, setNumber] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!number.trim()) return;
    onAdd(prefix, number.trim().padStart(4, "0"), assignedTo.trim());
    setNumber("");
    setAssignedTo("");
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="rounded-lg border bg-card p-6 shadow-sm"
    >
      <div className="mb-5 flex items-center gap-2">
        <Headphones className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold font-display text-card-foreground">
          Register Headset
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_1fr_2fr_auto]">
        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs uppercase tracking-wider font-mono">
            Prefix
          </Label>
          <Select
            value={prefix}
            onValueChange={(v) => setPrefix(v as HeadsetPrefix)}
          >
            <SelectTrigger className="font-mono font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PR-HS" className="font-mono">PR-HS</SelectItem>
              <SelectItem value="GL-HS" className="font-mono">GL-HS</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs uppercase tracking-wider font-mono">
            Number
          </Label>
          <Input
            placeholder="0001"
            value={number}
            onChange={(e) => setNumber(e.target.value.replace(/\D/g, "").slice(0, 4))}
            className="font-mono"
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs uppercase tracking-wider font-mono">
            Assigned To
          </Label>
          <Input
            placeholder="Name of user (optional)"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            maxLength={100}
          />
        </div>

        <div className="flex items-end">
          <Button type="submit" className="gap-1.5">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </motion.form>
  );
};

export default AddHeadsetForm;
