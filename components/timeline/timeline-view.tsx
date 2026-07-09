"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TimelineEvent } from "@/lib/types";

type Filter = "all" | "history" | "predictions";

export function TimelineView({ events }: { events: TimelineEvent[] }) {
  const [filter, setFilter] = React.useState<Filter>("all");

  const filtered = events.filter((e) => {
    if (filter === "history") return !e.isPrediction;
    if (filter === "predictions") return e.isPrediction;
    return true;
  });

  return (
    <div className="space-y-8">
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          type="button"
          size="sm"
          variant={filter === "history" ? "default" : "outline"}
          onClick={() => setFilter("history")}
        >
          History
        </Button>
        <Button
          type="button"
          size="sm"
          variant={filter === "predictions" ? "default" : "outline"}
          onClick={() => setFilter("predictions")}
        >
          Predictions
        </Button>
      </div>

      <div className="relative space-y-8 border-l border-border/60 pl-8">
        {filtered.map((event, i) => (
          <motion.div
            key={event.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.3) }}
            className="relative"
          >
            <span
              className={cn(
                "absolute -left-[2.35rem] top-1 flex size-4 items-center justify-center rounded-full border-2 border-background",
                event.isPrediction ? "bg-primary/40" : "bg-primary"
              )}
            />
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground tabular-nums">
                {new Date(event.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                })}
              </span>
              {event.category !== "prediction" && (
                <Badge variant="secondary" className="font-normal capitalize">
                  {event.category}
                </Badge>
              )}
              {event.isPrediction && (
                <Badge variant="outline" className="gap-1 font-normal text-primary border-primary/30">
                  <TrendingUp className="size-3" />
                  Prediction
                </Badge>
              )}
            </div>
            <h3 className="mb-1 font-semibold">{event.title}</h3>
            <p className="text-sm text-muted-foreground">{event.description}</p>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-muted-foreground">No events in this view.</p>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Predictions are directional industry expectations, not confirmed facts.
      </p>
    </div>
  );
}
