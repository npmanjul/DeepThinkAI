Create a React component that visualizes a LangGraph workflow execution stream in real-time.

## Data Format
The backend sends Server-Sent Events (SSE) with this structure:

event: message
data: {"node_name": "router", "status": "running", "started_at": "2026-05-09 18:46:00.236036", "message": "router started"}


## Message Schema
Each message contains:
- `node_name`: string (e.g., "router", "research", "worker", "LangGraph")
- `status`: "running" | "completed"
- `started_at`: ISO timestamp
- `ended_at`: ISO timestamp (only when completed)
- `duration`: number in seconds (only when completed)
- `message`: string description
- `output`: object (only when completed, contains task results)

## UI Requirements

### 1. **Workflow Progress Bar**
- Show overall progress: X/Y nodes completed
- Display total elapsed time
- Color-coded status: blue (running), green (completed)

### 2. **Node Status Cards**
Display each node as a card with:
- Node name as header
- Status badge (running/completed with icon)
- Start time
- Duration (if completed)
- Progress spinner (if running)

### 3. **Worker Tracking Section**
- Show "Worker" nodes separately
- Display: "Worker #N: [task_title]"
- Show how many workers are active vs total
- Example: "3/9 workers active"

### 4. **Output Preview**
When a node completes with output:
- Show collapsible section with output data
- For `plan`: display `blog_title` and task count
- For `sections`: show section titles and word counts
- For `evidence`: show evidence item count
- Use syntax highlighting for JSON

### 5. **Timeline View**
- Vertical timeline showing execution order
- Each node as a timeline item with:
  - Connection lines between nodes
  - Timestamp on the left
  - Node details on the right
  - Highlight currently running nodes

### 6. **Key Metrics Dashboard**
Top section showing:
- Total nodes: X
- Completed: X
- Running: X
- Evidence items collected: X
- Sections generated: X
- Total duration: X seconds

## Technical Implementation

### State Management
```typescript
interface NodeExecution {
  node_name: string;
  status: 'running' | 'completed';
  started_at: string;
  ended_at?: string;
  duration?: number;
  message: string;
  output?: any;
}

const [executions, setExecutions] = useState<NodeExecution[]>([]);
const [metrics, setMetrics] = useState({
  total: 0,
  completed: 0,
  running: 0,
  workers: { active: 0, total: 0 }
});


## Message Schema
Each message contains:
- `node_name`: string (e.g., "router", "research", "worker", "LangGraph")
- `status`: "running" | "completed"
- `started_at`: ISO timestamp
- `ended_at`: ISO timestamp (only when completed)
- `duration`: number in seconds (only when completed)
- `message`: string description
- `output`: object (only when completed, contains task results)

## UI Requirements

### 1. **Workflow Progress Bar**
- Show overall progress: X/Y nodes completed
- Display total elapsed time
- Color-coded status: blue (running), green (completed)

### 2. **Node Status Cards**
Display each node as a card with:
- Node name as header
- Status badge (running/completed with icon)
- Start time
- Duration (if completed)
- Progress spinner (if running)

### 3. **Worker Tracking Section**
- Show "Worker" nodes separately
- Display: "Worker #N: [task_title]"
- Show how many workers are active vs total
- Example: "3/9 workers active"

### 4. **Output Preview**
When a node completes with output:
- Show collapsible section with output data
- For `plan`: display `blog_title` and task count
- For `sections`: show section titles and word counts
- For `evidence`: show evidence item count
- Use syntax highlighting for JSON

### 5. **Timeline View**
- Vertical timeline showing execution order
- Each node as a timeline item with:
  - Connection lines between nodes
  - Timestamp on the left
  - Node details on the right
  - Highlight currently running nodes

### 6. **Key Metrics Dashboard**
Top section showing:
- Total nodes: X
- Completed: X
- Running: X
- Evidence items collected: X
- Sections generated: X
- Total duration: X seconds

## Technical Implementation

### State Management
```typescript
interface NodeExecution {
  node_name: string;
  status: 'running' | 'completed';
  started_at: string;
  ended_at?: string;
  duration?: number;
  message: string;
  output?: any;
}

const [executions, setExecutions] = useState<NodeExecution[]>([]);
const [metrics, setMetrics] = useState({
  total: 0,
  completed: 0,
  running: 0,
  workers: { active: 0, total: 0 }
});

ENHANCEMENT REQUESTS:

1. **Add a graph visualization** using React Flow or D3.js showing node connections
2. **Include search/filter** to find specific nodes or workers
3. **Add statistics** like average task duration, slowest node, etc.
4. **Implement dark/light mode toggle**
5. **Add sound notifications** when key nodes complete (optional, user-controlled)
6. **Create a minimized view** showing just key metrics for embedding in dashboards
7. **Add export to CSV** for execution data analysis
8. **Implement WebSocket fallback** if SSE is not supported

Use modern React patterns:
- Custom hooks for SSE connection
- Memoization for performance
- TypeScript for type safety
- Error boundaries for robustness @Frontend/src/app/blog/page.tsx:1-597 