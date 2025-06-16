export interface WpTerm {
  id: number;
  name: string;
}

export interface WpFeaturedMedia {
  media_details: {
    sizes: {
      full: {
        source_url: string;
      };
    };
  };
}

export interface WpPostResponse {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    "wp:term"?: [WpTerm[], WpTerm[]];
    "wp:featuredmedia"?: WpFeaturedMedia[];
  };
  yoast_head_json?: Record<string, unknown>;
}

export interface PrevNextPost {
  id: number;
  title: { rendered: string };
  slug: string;
}

export interface Post {
  id: number;
  date: string;
  link: string;
  image: string;
  categories: WpTerm[];
  tags: WpTerm[];
  title: string;
  content: { rendered: string };
  yoast_head_json: Record<string, unknown> | null;
  prevPost: PrevNextPost | null;
  nextPost: PrevNextPost | null;
}
