import { useState, useEffect } from "react";
import { Headset, HeadsetPrefix } from "@/types/headset";
import AddHeadsetForm from "@/components/AddHeadsetForm";
import HeadsetTable from "@/components/HeadsetTable";
import { Headphones, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import * as XLSX from "xlsx";

const STORAGE_KEY = "headset-tracker";

const loadHeadsets = (): Headset[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const Index = () => {
  const [headsets, setHeadsets] = useState<Headset[]>(loadHeadsets);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(headsets));
  }, [headsets]);

  const handleAdd = (prefix: HeadsetPrefix, number: string, assignedTo: string) => {
    const fullId = `${prefix}-${number}`;
    if (headsets.some((h) => `${h.prefix}-${h.number}` === fullId)) {
      toast.error(`Headset ${fullId} already exists`);
      return;
    }
    const newHeadset: Headset = {
      id: crypto.randomUUID(),
      prefix,
      number,
      assignedTo,
      dateAdded: new Date().toISOString(),
      status: "in-use",
    };
    setHeadsets((prev) => [newHeadset, ...prev]);
    toast.success(`Headset ${fullId} registered to ${assignedTo}`);
  };

  const handleDelete = (id: string) => {
    setHeadsets((prev) => prev.filter((h) => h.id !== id));
    toast.info("Headset removed");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container flex items-center gap-3 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Headphones className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display text-card-foreground">
              Headset Tracker
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage fixed headsets &amp; assignments
            </p>
          </div>
          <div className="ml-auto font-mono text-sm text-muted-foreground">
            {headsets.length} registered
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-6">
        <AddHeadsetForm onAdd={handleAdd} />
        <HeadsetTable headsets={headsets} onDelete={handleDelete} />
      </main>
    </div>
  );
};

export default Index;
