/* eslint-disable @next/next/no-img-element */
"use client";

import { Calendar, ChevronRight, Eye } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HotelsImage } from "../../../asserts/Import/Images";
import Section from "../../common/Section/Section";
import { BlogSkeletonLoader } from "../../components/SkeletonLoaders/BlogSkeletonLoader";
import { Badge } from "../../components/ui/Badge/Badge";
import { Button } from "../../components/ui/Button/Button";
import { getBlogPosts } from "../../lib/BlogsApi/BlogsApi";
import { BlogPost } from "./IBlogsTypes";
import Image from "next/image";
import OptimizedImage from "../../components/OptimizedImage/OptimizedImage";

export default function Blogs() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialPosts = async () => {
      try {
        const { posts, totalPages } = await getBlogPosts();
        setPosts(posts);
        setTotalPages(totalPages);
      } catch (err) {
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialPosts();
  }, []);

  const loadMorePosts = async () => {
    const nextPage = currentPage + 1;
    setLoadingMore(true);

    try {
      const { posts: newPosts } = await getBlogPosts(nextPage);
      setPosts((prev) => [...prev, ...newPosts]);
      setCurrentPage(nextPage);
    } catch (err) {
      setError("Failed to load more posts. Please try again.");
    } finally {
      setLoadingMore(false);
    }
  };

  // Format date helper function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      month: date.toLocaleString("default", { month: "short" }),
      day: date.getDate(),
      year: date.getFullYear(),
    };
  };

  if (loading) {
    return <BlogSkeletonLoader />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Oops!</h2>
          <p className="text-gray-700 mb-8">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[300px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-110"
          style={{
            backgroundImage: `url(${HotelsImage.Hotel6.src})`,
            transform: "translateZ(0)",
          }}></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Animated Overlay Pattern */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat opacity-10"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <div className="inline-block mb-4">
              <span className="inline-block h-1 w-10 bg-primary-gold mr-2"></span>
              <span className="text-primary-gold uppercase tracking-wider text-sm font-semibold">
                Our Blogs
              </span>
              <span className="inline-block h-1 w-10 bg-primary-gold ml-2"></span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Discover Our Latest Stories
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Insights, news, and captivating stories from our team of experts
            </p>
          </div>
        </div>
      </div>

      {/* Featured Blog Section */}
      <div className="relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-0  lg:w-64 h-64 bg-primary-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-0  lg:w-96 h-96 bg-primary-gold/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

        <Section className="relative">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-primary-gold inline-block relative">
              Latest Blogs
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary-gold/50 rounded-full"></span>
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto mt-6">
              Discover the latest insights, news, and stories from our team
            </p>
          </div>

          {posts.length === 0 && !loading ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">
                No posts found
              </h2>
              <p className="text-gray-500">Check back later for new content</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogPostCard
                  key={post.id}
                  post={post}
                  formatDate={formatDate}
                />
              ))}
            </div>
          )}

          {currentPage < totalPages && (
            <div className="flex justify-center mt-16">
              <Button
                onClick={loadMorePosts}
                disabled={loadingMore}
                className="bg-primary-gold hover:bg-primary-gold/90 text-white px-8 py-6 rounded-md font-medium transition-all duration-300 disabled:opacity-70 group">
                {loadingMore ? (
                  "Loading more posts..."
                ) : (
                  <span className="flex items-center">
                    Load More Articles
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                )}
              </Button>
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}

// Blog Post Card Component
function BlogPostCard({
  post,
  formatDate,
}: {
  post: BlogPost;
  formatDate: (date: string) => { month: string; day: number; year: number };
}) {
  const formattedDate = formatDate(post.rawDate);

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Image Container with Overlay */}
      <Link href={`/blogs/${post.link}`}>
        <div className="relative">
          <div className="aspect-[16/9] overflow-hidden">
            <OptimizedImage
              width={100}
              height={200}
              src={post.image || "/placeholder.svg?height=400&width=600"}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              rounded={false}
              fill={false}
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary-gold text-white hover:bg-primary-gold/90 border-none px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium">
              {post.categories[0]?.name || "Blog"}
            </Badge>
          </div>

          {/* Date Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-3 py-1.5 rounded-full flex items-center">
            <Calendar className="h-3 w-3 mr-1.5" />
            <span>{`${formattedDate.month} ${formattedDate.day}, ${formattedDate.year}`}</span>
          </div>
        </div>
        {/* Content Container */}
        <div className="p-6">
          {/* Title */}
          <h2 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-gold transition-colors">
            {post.title.replace(/&#\d+;|[^\w\s]/g, "")}
          </h2>

          {/* Excerpt */}
          <div
            className="text-gray-600 mb-5 line-clamp-4 text-sm"
            dangerouslySetInnerHTML={{
              __html: post.shortText.replace(/<a [^>]*>[^<]*<\/a>/g, ""),
            }}
          />

          {/* Read Stats and Link */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-500 text-sm">
              <Eye className="h-4 w-4 mr-1.5" />
              <span>5 min read</span>
            </div>

            <Button className="inline-flex items-center text-primary-gold font-medium hover:text-primary-gold/80 transition-colors group/link">
              Read More
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}
