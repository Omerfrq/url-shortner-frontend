export interface ShortUrl {
  id: string;
  shortcode: string;
  domain: string;
  deviceId: string;
  originalUrl: string;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
  shortUrl: string;
  metaTags: MetaTags;
}

export interface MetaTags {
  title?: string;
  description?: string;
  favicon?: string;
  ogImage?: string;
}

export interface Visit {
  timestamp: string;
  country: string;
  city: string;
  referrer: string;
  deviceType: string;
  browser: string;
  os: string;
  platform: string;
  ip: string;
  _id: string;
}

export interface ShortUrlDetails extends ShortUrl {
  visits: Visit[];
}
