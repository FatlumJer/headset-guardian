import { useState } from "react";
import { Headset } from "@/types/headset";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Pencil, Check, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HeadsetTableProps {
  headsets: Headset[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Pick<Headset, "assignedTo" | "status">>) => void;
}

const HeadsetTable = ({ headsets, onDelete, onUpdate }: HeadsetTableProps) => {
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const filtered = headsets.filter((hs) => {
    const q = search.toLowerCase();
    return (
      `${hs.prefix}-${hs.number}`.toLowerCase().includes(q) ||
      hs.assignedTo.toLowerCase().includes(q)
    );
  });

  const startEdit = (hs: Headset) => {
    setEditingId(hs.id);
    setEditValue(hs.assignedTo);
  };

  const saveEdit = (id: string) => {
    onUpdate(id, { assignedTo: editValue.trim() });
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  const statusOptions = [
    { value: "deployable", label: "Deployable", color: "bg-accent/15 text-accent" },
    { value: "in-use", label: "In Use", color: "bg-primary/15 text-primary" },
    { value: "available", label: "Available", color: "bg-emerald-500/15 text-emerald-600" },
    { value: "broken", label: "Broken", color: "bg-destructive/15 text-destructive" },
    { value: "retired", label: "Retired", color: "bg-muted-foreground/15 text-muted-foreground" },
  ] as const;

  const getStatusStyle = (status: string) =>
    statusOptions.find((s) => s.value === status)?.color ?? "bg-muted text-muted-foreground";

  const getStatusLabel = (status: string) =>
    statusOptions.find((s) => s.value === status)?.label ?? status;

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by headset ID or user name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border bg-card p-12 text-center">
          <p className="text-muted-foreground font-mono text-sm">
            {headsets.length === 0
              ? "No headsets registered yet. Add one above."
              : "No headsets match your search."}
          </p>
        </div>
      ) : (
        <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Headset ID
                </TableHead>
                <TableHead className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Assigned To
                </TableHead>
                <TableHead className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Date Added
                </TableHead>
                <TableHead className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="w-[100px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {filtered.map((hs) => (
                  <motion.tr
                    key={hs.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="border-b transition-colors hover:bg-muted/50"
                  >
                    <TableCell className="font-mono font-semibold text-foreground">
                      {hs.prefix}-{hs.number}
                    </TableCell>
                    <TableCell className="text-foreground">
                      {editingId === hs.id ? (
                        <div className="flex items-center gap-1.5">
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="h-7 text-sm"
                            maxLength={100}
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === "Enter") saveEdit(hs.id);
                              if (e.key === "Escape") cancelEdit();
                            }}
                          />
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-accent" onClick={() => saveEdit(hs.id)}>
                            <Check className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" onClick={cancelEdit}>
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ) : (
                        <span className={hs.assignedTo ? "" : "text-muted-foreground italic"}>
                          {hs.assignedTo || "Unassigned"}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {new Date(hs.dateAdded).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={hs.status}
                        onValueChange={(val) => onUpdate(hs.id, { status: val as Headset["status"] })}
                      >
                        <SelectTrigger className={`h-7 w-[130px] border-none text-xs font-medium rounded-full ${getStatusStyle(hs.status)}`}>
                          <SelectValue>{getStatusLabel(hs.status)}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value} className="text-xs">
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-0.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => startEdit(hs)}
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(hs.id)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default HeadsetTable;
