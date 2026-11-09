export type ThemeMode = 'pink' | 'blue' | 'peach';

export type PageId = 'page1' | 'page2' | 'page3' | 'page4' | 'special';

export interface MediaItem {
  id: number;
  numberPrefix: string;
  type: 'photo' | 'video' | 'screenshot' | 'placeholder';
  title: string;
  subtitle?: string;
  filePath: string;
  customUploadedUrl?: string;
  aspectRatio?: string;
}

export interface CutieTaskItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  actionType: 'message' | 'memory' | 'hug' | 'kiss' | 'sweet' | 'puzzle';
}

export interface LoveCounters {
  kisses: number;
  hugs: number;
  hearts: number;
  lastUpdatedDate: string;
}
