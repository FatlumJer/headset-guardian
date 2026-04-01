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
import { Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HeadsetTableProps {
  headsets: Headset[];
  onDelete: (id: string) => void;
}

const HeadsetTable = ({ headsets, onDelete }: HeadsetTableProps) => {
  if (headsets.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-12 text-center">
        <p className="text-muted-foreground font-mono text-sm">
          No headsets registered yet. Add one above.
        </p>
      </div>
    );
  }

  return (
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
            <TableHead className="w-[60px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {headsets.map((hs) => (
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
                <TableCell className="text-foreground">{hs.assignedTo}</TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {new Date(hs.dateAdded).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      hs.status === "available"
                        ? "bg-accent/15 text-accent"
                        : "bg-primary/15 text-primary"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        hs.status === "available" ? "bg-accent" : "bg-primary"
                      }`}
                    />
                    {hs.status === "available" ? "Available" : "In Use"}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(hs.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  );
};

export default HeadsetTable;
