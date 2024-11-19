export interface Site {
  id: number;
  domain: string;
  apiKey: string;
  status: 'pending' | 'verified';
}
