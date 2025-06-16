/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Calendar,
  Clock,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Images } from "../../../asserts/Import/Images";
import Section from "../../common/Section/Section";
import HtmlContentRenderer from "../../components/HtmlContentRenderer/HtmlContentRenderer";
import OptimizedImage from "../../components/OptimizedImage/OptimizedImage";
import { ScrollableTag } from "../../components/ScrollableTag/ScrollableTag";
import PageSEO from "../../components/SEO/PageSEO";
import { SingleBlogSkeletonLoader } from "../../components/SkeletonLoaders/SingleBlogSkeletonLoader";
import { Badge } from "../../components/ui/Badge/Badge";
import { Button } from "../../components/ui/Button/Button";
import { pageDescription, pageTitle } from "../../constants/constants";
import { Post, PrevNextPost, WpPostResponse } from "./IsingleBlogTypes";
import { PostCardWithInlineFallback } from "./PostCardWithInlineFallback";
import Image from "next/image";
import FallbackImage from "../../common/FallBackLogo/FallBackLogo";

export default function BlogDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  const baseUrl = process.env.NEXT_PUBLIC_BLOG_URL;
  const [blog, setBlog] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [imgSrc, setImgSrc] = useState(blog?.image);
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (blog?.image) {
      setImgSrc(blog?.image);
      setIsError(false);
      setIsLoaded(false);
    }
  }, [blog?.image]);

  const fetchData = async () => {
    if (!slug) return;

    const url = `${baseUrl}/posts?slug=${slug}&_embed`;
    try {
      setIsLoading(true);
      const response = await axios.get<WpPostResponse[]>(url);

      if (response.data && response.data.length > 0) {
        const post = response.data[0];

        const categories = post._embedded?.["wp:term"]?.[0]?.map(
          (category) => ({
            id: category.id,
            name: category.name,
          })
        ) || [{ id: -1, name: "Uncategorized" }];

        const tags =
          post._embedded?.["wp:term"]?.[1]?.map((tag) => ({
            id: tag.id,
            name: tag.name,
          })) || [];

        const allPostsUrl = `${baseUrl}/posts?_fields=id,title,slug&per_page=100`;
        const allPostsResponse = await axios.get<PrevNextPost[]>(allPostsUrl);
        const allPosts = allPostsResponse.data;

        const currentIndex = allPosts.findIndex((p) => p.slug === slug);
        const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
        const nextPost =
          currentIndex < allPosts.length - 1
            ? allPosts[currentIndex + 1]
            : null;

        const transformedData: Post = {
          id: post.id,
          title: post.title.rendered,
          date: new Date(post.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          link: post.slug,
          image:
            post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes
              ?.full?.source_url || "/images/default.jpg",
          categories,
          tags,
          content: post.content,
          yoast_head_json: post.yoast_head_json || null,
          prevPost,
          nextPost,
        };

        setBlog(transformedData);

        // Fetch related posts based on categories
        if (categories.length > 0) {
          const categoryIds = categories.map((cat) => cat.id).join(",");
          const relatedPostsUrl = `${baseUrl}/posts?categories=${categoryIds}&_embed&per_page=3&exclude=${post.id}`;
          const relatedResponse = await axios.get<WpPostResponse[]>(
            relatedPostsUrl
          );

          if (relatedResponse.data && relatedResponse.data.length > 0) {
            const relatedPostsData = relatedResponse.data.map((relPost) => ({
              id: relPost.id,
              title: relPost.title.rendered,
              date: new Date(relPost.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
              link: relPost.slug,
              image:
                relPost._embedded?.["wp:featuredmedia"]?.[0]?.media_details
                  ?.sizes?.full?.source_url || "/images/default.jpg",
              categories:
                relPost._embedded?.["wp:term"]?.[0]?.map((category) => ({
                  id: category.id,
                  name: category.name,
                })) || [],
              tags:
                relPost._embedded?.["wp:term"]?.[1]?.map((tag) => ({
                  id: tag.id,
                  name: tag.name,
                })) || [],
              content: relPost.content,
              yoast_head_json: relPost.yoast_head_json || null,
              prevPost: null,
              nextPost: null,
            }));

            setRelatedPosts(relatedPostsData);
          }
        }
      } else {
        setError("No post found for the given slug");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load the blog post. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchData();
    }
  }, [slug]);

  // Estimate read time based on content length
  const getReadTime = (content: string) => {
    // Strip HTML tags
    const text = content.replace(/<[^>]*>/g, "");
    // Average reading speed: 200 words per minute
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return minutes < 1 ? 1 : minutes;
  };

  const sharePost = () => {
    if (navigator.share && blog) {
      navigator
        .share({
          title: blog.title,
          url: window.location.href,
        })
        .catch((err) => console.error("Error sharing:", err));
    }
  };

  if (isLoading) {
    return <SingleBlogSkeletonLoader />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-amber-600 mb-4">Oops!</h2>
          <p className="text-gray-700 mb-8">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="border-amber-500 text-amber-600 hover:bg-amber-50 hover:text-primary-gold">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-amber-600 mb-4">
            Post Not Found
          </h2>
          <p className="text-gray-700 mb-8">
            The blog post you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link href="/blogs">
            <Button className="bg-amber-600 hover:bg-primary-gold text-white">
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const readTime = getReadTime(blog.content.rendered);

  return (
    <>
      <PageSEO
        title={`${blog.title} - ${pageTitle}`}
        description={pageDescription}
        canonical={`https://www.bnbmehomes.com/blogs/${slug}`}
        image={Images.homePage.src}
      />
      {/* Hero Section with Featured Image */}
      <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          {isError ? (
            <FallbackImage fill />
          ) : (
            <Image
              src={blog.image || "/placeholder.svg"}
              alt={blog.title.replace(/&#\d+;|[^\w\s]/g, "")}
              fill
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={() => setIsError(true)}
              onLoad={() => setIsLoaded(true)}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent"></div>
        </div>

        <Section className="relative h-full flex flex-col justify-end pt-20">
          <div className="max-w-3xl">
            <Link
              href="/blogs"
              className="mb-6 inline-flex items-center text-sm font-medium text-white hover:text-amber-100 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all posts
            </Link>

            <div className="flex flex-wrap gap-3 mb-4">
              {blog.categories?.map((category) => (
                <Link
                  key={`cat-${category.id}`}
                  href={`/blog/categories/${category.id}`}>
                  <Badge
                    variant="secondary"
                    className="bg-amber-100/90 text-gray-900 hover:bg-amber-200/90 cursor-pointer">
                    {category.name}
                  </Badge>
                </Link>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {blog.title.replace(/&#\d+;|[^\w\s]/g, "")}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Content Container */}
      <Section className="mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Social Share Buttons */}
            <div className="flex justify-between items-center mb-8 sticky top-20 z-10 bg-white/90 backdrop-blur-sm border-b border-amber-100">
              <div className="flex items-center gap-2 mb-3">
                <Button
                  onClick={sharePost}
                  variant="ghost"
                  size="sm"
                  className="text-primary-gold hover:text-primary-gold hover:bg-amber-50">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-gold hover:text-primary-gold hover:bg-amber-50">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>

              <div className="flex-1 w-20 lg:max-w-2xl ml-4 -mt-2">
                <ScrollableTag tags={blog.tags} />
              </div>
            </div>

            {/* Blog Content */}
            <article className="-mt-8 prose prose-lg max-w-none prose-headings:text-amber-800 prose-headings:font-semibold prose-a:text-amber-600 prose-a:no-underline hover:prose-a:text-primary-gold prose-blockquote:border-amber-300 prose-strong:text-gray-900 prose-img:rounded-lg prose-img:shadow-md">
              <HtmlContentRenderer
                content={blog.content.rendered}
                className="blog-content"
              />
            </article>

            {/* Previous/Next Navigation */}
            <div className="mt-16 pt-8 border-t border-amber-100 grid grid-cols-1 md:grid-cols-2 gap-6">
              {blog.prevPost && (
                <Link
                  href={`/blogs/${blog.prevPost.slug}`}
                  className="group flex flex-col p-6 rounded-lg bg-amber-50 hover:bg-primary-gold transition-colors border border-amber-100">
                  <span className="text-sm text-gray-800 group-hover:text-white  flex items-center mb-2">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous Post
                  </span>
                  <span className="font-medium text-gray-900 group-hover:text-white transition-colors">
                    {blog.prevPost.title.rendered}
                  </span>
                </Link>
              )}
              {blog.nextPost && (
                <Link
                  href={`/blogs/${blog.nextPost.slug}`}
                  className="group flex flex-col p-6 rounded-lg bg-amber-20 hover:bg-primary-gold transition-colors border border-primary-gold md:text-right md:items-end">
                  <span className="text-sm text-gray-800 group-hover:text-white flex items-center mb-2">
                    Next Post
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                  <span className="font-medium text-gray-900 group-hover:text-white transition-colors">
                    {blog.nextPost.title.rendered}
                  </span>
                </Link>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-amber-20 rounded-xl p-6 border border-primary-gold mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  About this blog
                </h3>
                <p className="text-gray-700 mb-4">
                  Discover the latest insights, tips, and stories about luxury
                  accommodations and travel experiences.
                </p>
                <Link href="/contact">
                  <Button className="w-full bg-primary-gold hover:bg-primary-gold text-white">
                    Contact Us
                  </Button>
                </Link>
              </div>

              {relatedPosts.length > 0 && (
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-semibold text-primary-gold mb-4 pb-2 border-b border-amber-100">
                    Related Articles
                  </h3>
                  <div className="space-y-6">
                    {relatedPosts.map((post) => (
                      <Link
                        href={`/blogs/${post.link}`}
                        key={post.id}
                        className="group block">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-20 h-20 relative rounded-md overflow-hidden">
                            <PostCardWithInlineFallback post={post} />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 group-hover:text-primary-gold transition-colors line-clamp-2">
                              {post.title.replace(/&#\d+;|[^\w\s]/g, "")}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                              {post.date}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
