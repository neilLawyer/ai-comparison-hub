"use client";

import { useTheme } from "next-themes";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import { getModelColor } from "@/lib/chart-colors";
import { averageScore } from "@/lib/score-labels";
import type { Model, ScoreCategory } from "@/lib/types";

type Point = {
  id: string;
  name: string;
  price: number;
  score: number;
  bestValue: boolean;
};

function computeFrontier(points: Point[]): Set<string> {
  const frontier = new Set<string>();
  for (const p of points) {
    const dominated = points.some(
      (q) =>
        q.id !== p.id &&
        q.price <= p.price &&
        q.score >= p.score &&
        (q.price < p.price || q.score > p.score)
    );
    if (!dominated) frontier.add(p.id);
  }
  return frontier;
}

export function ParetoScatter({
  models,
  category,
}: {
  models: Model[];
  category: ScoreCategory | "overall";
}) {
  const { resolvedTheme } = useTheme();

  const points: Point[] = models.map((m) => ({
    id: m.id,
    name: m.name,
    price: m.pricing.inputPerMTokens,
    score: category === "overall" ? averageScore(m.scores) : m.scores[category],
    bestValue: false,
  }));

  const frontier = computeFrontier(points);
  for (const p of points) p.bestValue = frontier.has(p.id);

  const gridColor = resolvedTheme === "light" ? "#e1e0d9" : "#2c2c2a";
  const tickColor = resolvedTheme === "light" ? "#52514e" : "#c3c2b7";

  return (
    <div className="space-y-3">
      <div className="h-[360px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="price"
              name="Input price"
              unit=" $/M"
              tick={{ fill: tickColor, fontSize: 12 }}
              stroke={gridColor}
            >
              <Label
                value="Input price ($ / M tokens, lower = cheaper)"
                position="bottom"
                offset={0}
                fill={tickColor}
                fontSize={12}
              />
            </XAxis>
            <YAxis
              type="number"
              dataKey="score"
              name="Quality"
              domain={[60, 100]}
              tick={{ fill: tickColor, fontSize: 12 }}
              stroke={gridColor}
            >
              <Label
                value="Quality score"
                angle={-90}
                position="left"
                fill={tickColor}
                fontSize={12}
              />
            </YAxis>
            <ZAxis range={[120, 260]} />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const p = payload[0].payload as Point;
                return (
                  <div className="rounded-md border border-border bg-popover px-3 py-2 text-xs shadow-md">
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-muted-foreground">
                      ${p.price}/M · quality {p.score}
                    </div>
                    {p.bestValue && (
                      <div className="mt-1 font-medium text-primary">Best value</div>
                    )}
                  </div>
                );
              }}
            />
            <Scatter
              data={points}
              shape={(props: unknown) => {
                const { cx, cy, payload } = props as {
                  cx: number;
                  cy: number;
                  payload: Point;
                };
                const color = getModelColor(payload.id, resolvedTheme);
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={payload.bestValue ? 8 : 6}
                    fill={color}
                    stroke={payload.bestValue ? "var(--foreground)" : "none"}
                    strokeWidth={payload.bestValue ? 2 : 0}
                  />
                );
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {points.map((p) => (
          <span key={p.id} className="inline-flex items-center gap-1.5">
            <span
              className="inline-block size-2.5 rounded-full"
              style={{ backgroundColor: getModelColor(p.id, resolvedTheme) }}
            />
            {p.name}
            {p.bestValue && <span className="font-medium text-primary">· best value</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
