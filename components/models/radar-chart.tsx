"use client";

import { useTheme } from "next-themes";
import {
  Radar,
  RadarChart as ReRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SCORE_CATEGORIES, SCORE_LABELS } from "@/lib/score-labels";
import { getModelColor } from "@/lib/chart-colors";
import type { Model } from "@/lib/types";

export function ModelRadarChart({ models }: { models: Model[] }) {
  const { resolvedTheme } = useTheme();

  const data = SCORE_CATEGORIES.map((category) => {
    const row: Record<string, string | number> = {
      category: SCORE_LABELS[category],
    };
    for (const model of models) {
      row[model.id] = model.scores[category];
    }
    return row;
  });

  const gridColor = resolvedTheme === "light" ? "#e1e0d9" : "#2c2c2a";
  const tickColor = resolvedTheme === "light" ? "#52514e" : "#c3c2b7";

  return (
    <div className="h-[380px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ReRadarChart data={data} outerRadius="72%">
          <PolarGrid stroke={gridColor} />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fill: tickColor, fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: tickColor, fontSize: 10 }}
            axisLine={false}
          />
          {models.map((model) => {
            const color = getModelColor(model.id, resolvedTheme);
            return (
              <Radar
                key={model.id}
                name={model.name}
                dataKey={model.id}
                stroke={color}
                fill={color}
                fillOpacity={0.15}
                strokeWidth={2}
              />
            );
          })}
          {models.length > 1 && <Legend />}
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--popover)",
              borderColor: "var(--border)",
              borderRadius: "var(--radius-md)",
              fontSize: 12,
            }}
          />
        </ReRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
