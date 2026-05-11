export interface LogEvent {
    node_name: string;
    status: "running" | "completed" | "error";
    message: string;
    started_at?: string;
    ended_at?: string;
    duration?: number;
    output?: unknown;
    id: string;
  }
  
export interface RunHistory {
    id: string;
    topic: string;
    date: Date;
    events: LogEvent[];
    status: "running" | "completed" | "error";
    articleUrl?: string;
    articleContent?: string;
    articleTitle?: string;
  }

export interface StatsItemProps {
    label: string;
    value: number;
    color: "slate" | "amber" | "emerald" | "red";
}
