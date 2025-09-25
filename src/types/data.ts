// Common data types for visualization

export interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface TimeSeriesData {
  date: string | Date;
  value: number;
  category?: string;
}

export interface MultiSeriesData {
  name: string;
  data: DataPoint[];
  color?: string;
}

export interface ChartConfig {
  title: string;
  description?: string;
  type: 'bar' | 'line' | 'pie' | 'scatter' | 'area' | 'donut';
  data: DataPoint[] | TimeSeriesData[] | MultiSeriesData[];
  colors?: string[];
  animated?: boolean;
  responsive?: boolean;
}

export interface DashboardConfig {
  title: string;
  description?: string;
  charts: ChartConfig[];
  layout?: 'grid' | 'masonry' | 'flex';
}
