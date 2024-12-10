export enum AnalysisStatus {
  SUCCESS = 'SUCCESS',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
}

export interface Analysis {
  id: string;
  siteId: string;
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  status: AnalysisStatus;
  createdAt: string;
  updatedAt: string;
}
