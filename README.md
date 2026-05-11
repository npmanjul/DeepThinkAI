# Multi-Agent Blog Writer — LangGraph Workflow 

A real-time workflow execution dashboard for visualizing LangGraph multi-agent pipelines using **React**, **TypeScript**, **Server-Sent Events (SSE)**, and **React Flow**.

This component streams live node execution updates from the backend and renders:

- Real-time execution progress
- Node status cards
- Worker tracking
- Timeline visualization
- Graph execution flow
- Metrics dashboard
- Output previews
- CSV export
- WebSocket fallback support
- Dark/light mode

---

# Features

## Real-Time Streaming

- Live updates using **Server-Sent Events (SSE)**
- Automatic **WebSocket fallback**
- Real-time node execution tracking

---

# Execution Visualization

## Workflow Progress Bar

- Shows completed vs total nodes
- Displays total elapsed execution time
- Color-coded execution states:
  - 🔵 Running
  - 🟢 Completed

---

## Node Status Cards

Each node displays:

- Node name
- Execution status
- Start time
- End time
- Duration
- Loading spinner while running
- Expandable output preview

---

## Worker Tracking

Special worker monitoring section:

```txt
3/9 workers active
```

Displays:

```txt
Worker #1 → Research AI Trends
Worker #2 → Gather Sources
Worker #3 → Draft Introduction
```

---

## Output Preview

Collapsible execution outputs with syntax highlighting.

### Plan Output

```json
{
  "blog_title": "Future of AI Agents",
  "tasks": 9
}
```

### Sections Output

```json
{
  "sections": [
    {
      "title": "Introduction",
      "word_count": 450
    }
  ]
}
```

### Evidence Output

```json
{
  "evidence_items": 24
}
```

---

# Timeline View

Vertical execution timeline showing:

- Execution order
- Node transitions
- Timestamps
- Active node highlighting
- Connected workflow visualization

---

# Graph Visualization

Interactive graph using **React Flow**.

Features:

- Node connections
- Execution state colors
- Animated edges
- Zoom/pan controls
- Live graph updates

---

# Metrics Dashboard

Top-level statistics panel:

| Metric | Description |
|---|---|
| Total Nodes | Total workflow nodes |
| Completed Nodes | Finished nodes |
| Running Nodes | Currently active nodes |
| Evidence Items | Collected evidence |
| Sections Generated | Generated sections |
| Total Duration | Total execution time |
| Avg Duration | Average node runtime |
| Slowest Node | Longest-running task |

---

# Search & Filtering

- Search nodes/workers
- Filter by:
  - Running
  - Completed
  - Workers only

---

# Dark / Light Mode

Theme toggle with persistent preference.

---

# Sound Notifications

Optional audio alerts for:

- Workflow completed
- Critical node completion
- Worker completion

---

# Minimized Dashboard Mode

Compact embeddable version displaying only:

- Progress
- Running status
- Metrics summary

Useful for admin dashboards.

---

# CSV Export

Export execution history for analytics.

```csv
node_name,status,duration
router,completed,1.2
research,completed,4.9
```

---

# Tech Stack

| Technology | Purpose |
|---|---|
| React | UI |
| TypeScript | Type Safety |
| TailwindCSS | Styling |
| React Flow | Graph Visualization |
| react-syntax-highlighter | JSON highlighting |
| Lucide React | Icons |
| SSE | Real-time streaming |
| WebSocket | Fallback streaming |
| Framer Motion | Animations |

---

# Performance Optimizations

- `React.memo`
- `useMemo`
- `useCallback`
- Virtualized lists for large timelines
- Lazy-loaded graph visualization

---

# Error Handling

Includes:

- Error boundaries
- SSE reconnect strategy
- WebSocket reconnect
- Graceful fallback UI

---

# Recommended Enhancements

## Future Improvements

- Redis-backed event replay
- Workflow playback mode
- Agent grouping
- Multi-session monitoring
- AI-generated execution summaries
- Heatmap performance visualization
- OpenTelemetry integration

---

# Example Workflow

```txt
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
```

---

# Development Notes

This visualizer is designed specifically for:

- LangGraph
- Multi-agent orchestration systems
- AI pipeline execution monitoring
- Real-time workflow analytics

---

# License

MIT License

---

# Author

Built for real-time LangGraph execution monitoring in the **Multi-Agent Blog Writer** project.
