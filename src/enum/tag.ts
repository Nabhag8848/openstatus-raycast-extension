interface Tag {
  color: string;
  value: string;
}

export enum Status {
  INVESTIGATING = "investigating",
  MONITORING = "monitoring",
  IDENTIFIED = "identified",
  RESOLVED = "resolved",
}

export const tags: Record<Status, Tag> = {
  [Status.INVESTIGATING]: { value: "Investigating", color: "#F43F5E" },
  [Status.MONITORING]: { value: "Monitoring", color: "#3B82F6" },
  [Status.IDENTIFIED]: { value: "  Identified", color: "#F59E0B" },
  [Status.RESOLVED]: { value: "Resolved", color: "#22C55E" },
};
