Multi-Agent Blog Writer — LangGraph Workflow

A real-time workflow execution dashboard for visualizing LangGraph multi-agent pipelines using React, TypeScript, Server-Sent Events (SSE), and React Flow.

This component streams live node execution updates from the backend and renders:

* Real-time execution progress
* Node status cards
* Worker tracking
* Timeline visualization
* Graph execution flow
* Metrics dashboard
* Output previews
* CSV export
* WebSocket fallback support
* Dark/light mode

⸻

Features

Real-Time Streaming

* Live updates using Server-Sent Events (SSE)
* Automatic WebSocket fallback
* Real-time node execution tracking

⸻

Execution Visualization

Workflow Progress Bar

* Shows completed vs total nodes
* Displays total elapsed execution time
* Color-coded execution states:
    * 🔵 Running
    * 🟢 Completed

⸻

Node Status Cards

Each node displays:

* Node name
* Execution status
* Start time
* End time
* Duration
* Loading spinner while running
* Expandable output preview

⸻

Worker Tracking

Special worker monitoring section:

3/9 workers active

Displays:

Worker #1 → Research AI Trends
Worker #2 → Gather Sources
Worker #3 → Draft Introduction

⸻

Output Preview

Collapsible execution outputs with syntax highlighting.

Plan Output

{
  "blog_title": "Future of AI Agents",
  "tasks": 9
}

Sections Output

{
  "sections": [
    {
      "title": "Introduction",
      "word_count": 450
    }
  ]
}

Evidence Output

{
  "evidence_items": 24
}

⸻

Timeline View

Vertical execution timeline showing:

* Execution order
* Node transitions
* Timestamps
* Active node highlighting
* Connected workflow visualization

⸻

Graph Visualization

Interactive graph using React Flow.

Features:

* Node connections
* Execution state colors
* Animated edges
* Zoom/pan controls
* Live graph updates

⸻

Metrics Dashboard

Top-level statistics panel:

Metric	Description
Total Nodes	Total workflow nodes
Completed Nodes	Finished nodes
Running Nodes	Currently active nodes
Evidence Items	Collected evidence
Sections Generated	Generated sections
Total Duration	Total execution time
Avg Duration	Average node runtime
Slowest Node	Longest-running task

⸻

Search & Filtering

* Search nodes/workers
* Filter by:
    * Running
    * Completed
    * Workers only

⸻

Dark / Light Mode

Theme toggle with persistent preference.

⸻

Sound Notifications

Optional audio alerts for:

* Workflow completed
* Critical node completion
* Worker completion

⸻

Minimized Dashboard Mode

Compact embeddable version displaying only:

* Progress
* Running status
* Metrics summary

Useful for admin dashboards.

⸻

CSV Export

Export execution history for analytics.

node_name,status,duration
router,completed,1.2
research,completed,4.9

⸻

Tech Stack

Technology	Purpose
React	UI
TypeScript	Type Safety
TailwindCSS	Styling
React Flow	Graph Visualization
react-syntax-highlighter	JSON highlighting
Lucide React	Icons
SSE	Real-time streaming
WebSocket	Fallback streaming
Framer Motion	Animations

⸻

Installation

Install dependencies:

npm install reactflow react-syntax-highlighter lucide-react framer-motion

or

yarn add reactflow react-syntax-highlighter lucide-react framer-motion

⸻

Backend SSE Format

The backend streams events in this format:

event: message
data: {
  "node_name": "router",
  "status": "running",
  "started_at": "2026-05-09 18:46:00.236036",
  "message": "router started"
}

⸻

Message Schema

interface NodeExecution {
  node_name: string;
  status: "running" | "completed";
  started_at: string;
  ended_at?: string;
  duration?: number;
  message: string;
  output?: any;
}

⸻

Folder Structure

src/
├── components/
│   ├── WorkflowVisualizer.tsx
│   ├── ProgressBar.tsx
│   ├── NodeCard.tsx
│   ├── WorkerTracker.tsx
│   ├── Timeline.tsx
│   ├── MetricsDashboard.tsx
│   ├── OutputPreview.tsx
│   ├── GraphView.tsx
│   └── MinimizedView.tsx
│
├── hooks/
│   ├── useWorkflowStream.ts
│   ├── useWebSocketFallback.ts
│   └── useTheme.ts
│
├── utils/
│   ├── metrics.ts
│   ├── exportCsv.ts
│   └── graph.ts
│
└── types/
    └── workflow.ts

⸻

Custom SSE Hook

useWorkflowStream.ts

import { useEffect } from "react";
export const useWorkflowStream = (
  url: string,
  onMessage: (data: any) => void
) => {
  useEffect(() => {
    const eventSource = new EventSource(url);
    eventSource.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      onMessage(parsed);
    };
    eventSource.onerror = () => {
      console.error("SSE connection failed");
      eventSource.close();
    };
    return () => {
      eventSource.close();
    };
  }, [url, onMessage]);
};

⸻

WebSocket Fallback

const socket = new WebSocket("ws://localhost:8000/ws");
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
};

⸻

React Flow Graph Example

<ReactFlow
  nodes={nodes}
  edges={edges}
  fitView
>
  <MiniMap />
  <Controls />
  <Background />
</ReactFlow>

⸻

State Management

const [executions, setExecutions] = useState<NodeExecution[]>([]);
const [metrics, setMetrics] = useState({
  total: 0,
  completed: 0,
  running: 0,
  workers: {
    active: 0,
    total: 0,
  },
});

⸻

Metrics Calculation Example

const completed = executions.filter(
  (e) => e.status === "completed"
).length;
const running = executions.filter(
  (e) => e.status === "running"
).length;

⸻

Performance Optimizations

* React.memo
* useMemo
* useCallback
* Virtualized lists for large timelines
* Lazy-loaded graph visualization

⸻

Error Handling

Includes:

* Error boundaries
* SSE reconnect strategy
* WebSocket reconnect
* Graceful fallback UI

⸻

Recommended Enhancements

Future Improvements

* Redis-backed event replay
* Workflow playback mode
* Agent grouping
* Multi-session monitoring
* AI-generated execution summaries
* Heatmap performance visualization
* OpenTelemetry integration

⸻

Example Usage

<WorkflowVisualizer
  sseUrl="http://localhost:8000/stream"
/>

⸻

Environment Variables

NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws

⸻

Screens Overview

Main Dashboard

* Metrics
* Progress
* Graph
* Timeline
* Workers

⸻

Embedded Mini View

Compact mode for dashboards.

<MinimizedWorkflowView />

⸻

Accessibility

* Keyboard navigation
* Screen reader labels
* Reduced motion support
* High contrast themes

⸻

Recommended Libraries

Library	Use
React Flow	Graph Visualization
Framer Motion	Animations
Zustand	Optional global state
date-fns	Time formatting
react-window	Timeline virtualization

⸻

Example Workflow

Router
   ↓
Planner
   ↓
Workers (parallel)
   ↓
Evidence Collection
   ↓
Section Generation
   ↓
Final Assembly

⸻

Development Notes

This visualizer is designed specifically for:

* LangGraph
* Multi-agent orchestration systems
* AI pipeline execution monitoring
* Real-time workflow analytics

⸻

License

MIT License

⸻

Author

Built for real-time LangGraph execution monitoring in the Multi-Agent Blog Writer project.