export type EditorialType = 'story' | 'feature' | 'guide' | 'event' | 'business' | 'product';
export type EditorialLens = 'culture' | 'city' | 'people' | 'style';
export type EditorialEntityType = 'business' | 'event' | 'place' | 'product' | 'creator';

export interface EditorialAuthor {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface EditorialEntityReference {
  id: string;
  type: EditorialEntityType;
  label: string;
  detail: string;
  location?: string;
  latitude?: number;
  longitude?: number;
}

export interface EditorialPost {
  id: string;
  type: EditorialType;
  lens: EditorialLens;
  title: string;
  excerpt: string;
  imageUrl: string;
  imageAlt: string;
  publishedAt: string;
  readTime?: string;
  author?: EditorialAuthor;
  tags: string[];
  entities: EditorialEntityReference[];
  featured?: boolean;
}

export interface DiscoveryEvent {
  id: string;
  label: string;
  title: string;
  venue: string;
  location: string;
  time: string;
  imageUrl: string;
  lens: EditorialLens;
  accent: 'amber' | 'teal' | 'indigo';
}

export interface TonightItem {
  id: string;
  title: string;
  venue: string;
  time: string;
  imageUrl: string;
  lens: EditorialLens;
}

export interface EditorialTag {
  label: string;
  count: number;
}
