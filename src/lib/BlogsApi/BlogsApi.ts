import { BlogPost, RawWpPost } from "../../modules/BlogsPage/IBlogsTypes";

export async function getBlogPosts(
  page = 1
): Promise<{ posts: BlogPost[]; totalPages: number }> {
  const baseUrl = process.env.NEXT_PUBLIC_BLOG_URL;
  const postsUrl = `${baseUrl}/posts?per_page=6&page=${page}&_embed`;

  try {
    const response = await fetch(postsUrl, { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to fetch posts");

    const data: RawWpPost[] = await response.json();
    const totalPages = Number.parseInt(
      response.headers.get("x-wp-totalpages") || "0",
      10
    );

    const posts: BlogPost[] = data.map(
      (post): BlogPost => ({
        id: post.id,
        title: post.title.rendered,
        shortText: post.excerpt.rendered,
        rawDate: post.date,
        link: post.slug,
        image:
          post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.full
            ?.source_url || "/images/blog/blog1.jpg",
        categories: post._embedded?.["wp:term"]?.[0]
          ?.filter((term) => term.taxonomy === "category")
          ?.map((category) => ({
            id: category.id,
            name: category.name,
          })) || [{ id: null, name: "Uncategorized" }],
        yoast_head_json: post.yoast_head_json || null,
      })
    );

    return { posts, totalPages };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return { posts: [], totalPages: 0 };
  }
}
