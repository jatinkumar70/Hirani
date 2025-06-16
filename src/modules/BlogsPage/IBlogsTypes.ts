// Category Interface
export interface Category {
  id: number;
  name: string;
  taxonomy: string;
}

// Media Interface
export interface FeaturedMedia {
  media_details: {
    sizes: {
      full: {
        source_url: string;
      };
    };
  };
}

// Yoast SEO Interface
export interface YoastHeadJson {
  article_published_time?: string;
  article_modified_time?: string;
}

// Raw WordPress API Post Interface
export interface RawWpPost {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    "wp:term"?: Category[][];
    "wp:featuredmedia"?: FeaturedMedia[];
  };
  yoast_head_json?: YoastHeadJson;
}

// Blog Post Interface (Transformed)
export interface BlogPost {
  id: number;
  title: string;
  shortText: string;
  rawDate: string;
  link: string;
  image: string;
  categories: { id: number | null; name: string }[];
  yoast_head_json?: YoastHeadJson | null;
}
