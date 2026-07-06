import type { Model } from "@/lib/types";

/**
 * Fixed categorical assignment — color follows model identity, never rank/filter
 * position. Validated with the dataviz skill's palette validator against this
 * site's light (#ffffff) and dark (#0a0a0a) surfaces: all 6 pass CVD + contrast
 * (light mode carries a contrast WARN on aqua/yellow/magenta — mitigated by
 * always pairing color with a visible legend/direct label, never color alone).
 */
export const MODEL_COLORS: Record<string, { light: string; dark: string }> = {
  claude: { light: "#2a78d6", dark: "#3987e5" }, // blue
  gpt: { light: "#1baf7a", dark: "#199e70" }, // aqua
  gemini: { light: "#eda100", dark: "#c98500" }, // yellow
  grok: { light: "#008300", dark: "#008300" }, // green
  deepseek: { light: "#e34948", dark: "#e66767" }, // red
  llama: { light: "#e87ba4", dark: "#d55181" }, // magenta
};

const FALLBACK = { light: "#898781", dark: "#898781" };

export function getModelColor(modelId: string, theme: string | undefined): string {
  const entry = MODEL_COLORS[modelId] ?? FALLBACK;
  return theme === "light" ? entry.light : entry.dark;
}

export function getModelColorMap(
  models: Pick<Model, "id">[],
  theme: string | undefined
): Record<string, string> {
  return Object.fromEntries(
    models.map((m) => [m.id, getModelColor(m.id, theme)])
  );
}
