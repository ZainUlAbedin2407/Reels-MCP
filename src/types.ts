export interface Reel {
  reel_id: number;
  title: string;
  views: number;
  likes: number | null;
  style: string;
  category: string;
  notes: string;
}

export interface TopReel {
  title: string;
  views: number;
  style: string;
  category: string;
}
