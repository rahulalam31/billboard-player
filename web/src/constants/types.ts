export interface SaveData {
  date: string;
  data: Data[];
}
export interface Data {
  title: string;
  channelTitle: string;
  rank: number;
  weeks_on_chart: number;
  last_week_rank: number | null;
  peak_rank: number;
  videoId: string;
  thumbnails: string;
}
