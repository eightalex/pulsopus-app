import { ReactNode } from "react";

export interface IRateTrendViewProps {
  title: string;
  subtitles?: string[];
  trendGrowth: number;
  rateActivity: number;
  trendVolatility?: number;
  rateVolatility?: number;
  color?: string;
  children?: ReactNode;
  headers?: ReactNode[];
  showHeader?: boolean;
  openOn?: 'focus' | 'click';
}

export interface RateTrendViewInfoProps {
  label: string;
  value?: number;
  icon?: ReactNode;
}