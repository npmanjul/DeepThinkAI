"use client"

import React, { useEffect, useState } from "react";
import ENDPOINTS from "@/src/services/endpoints";
import { LogEvent } from "@/src/types/blog.types";

const Page = () => {
  const [events, setEvents] = useState<LogEvent[]>([]);

  useEffect(() => {
    const topic = "AI in Education";

    // Use relative path for SSE (goes through Next.js proxy, sends cookies automatically)
    const sseUrl = `/api/v1${ENDPOINTS.BLOG.STREAM}?topic=${encodeURIComponent(topic)}`;
    
    const eventSource = new EventSource(sseUrl);

    eventSource.onmessage = (event) => {
      const parsedData = JSON.parse(event.data) as LogEvent;

      console.log(parsedData);

      setEvents((prev) => [...prev, parsedData]);
    };

    eventSource.onerror = (error) => {
      console.log("SSE Error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  console.log(events);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        LangGraph Streaming
      </h1>

      <div className="space-y-4">
        {events.map((item, index) => {
          const hasOutput = item.output !== undefined && item.output !== null;
          const outputText =
            typeof item.output === "string"
              ? item.output
              : hasOutput
                ? JSON.stringify(item.output, null, 2)
                : "";

          return (
            <div
              key={index}
              className="border rounded-lg p-4 shadow"
            >
              <h2 className="font-semibold">
                {item.node_name}
              </h2>

              <p>Status: {item.status}</p>

              <p>{item.message}</p>

              {item.duration && (
                <p>
                  Duration: {item.duration} sec
                </p>
              )}

              {hasOutput && (
                <pre className="bg-gray-900 p-2 mt-2 overflow-auto text-sm">
                  {outputText.slice(0, 100)}
                </pre>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;