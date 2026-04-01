export type HeadsetPrefix = "PR-HS" | "GL-HS";

export interface Headset {
  id: string;
  prefix: HeadsetPrefix;
  number: string; // e.g. "0001"
  assignedTo: string;
  dateAdded: string;
  status: "available" | "in-use";
}
