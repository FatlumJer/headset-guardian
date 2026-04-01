export type HeadsetPrefix = "PR-HS" | "GL-HS";

export interface Headset {
  id: string;
  prefix: HeadsetPrefix;
  number: string; // e.g. "0001"
  assignedTo: string;
  dateAdded: string;
  status: "deployable" | "in-use" | "available" | "broken" | "retired";
}
