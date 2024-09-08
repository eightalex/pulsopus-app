import { ReactNode } from "react";

export interface IRateTrendViewProps {
  title: string;
  subtitles?: string[];
  trendGrowth: number;
  rateActivity: number;
  trendVolatility?: number;
  rateVolatility?: number;
  color?: string;
}

export interface RateTrendViewInfoProps {
  label: string;
  value?: number;
  icon?: ReactNode;
}