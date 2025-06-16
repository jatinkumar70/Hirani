import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"


export interface IBlogPost {
  id: string
  title: string
  date: string
  description: string
  image: string
  slug: string
}

interface BlogCardProps {
  post: IBlogPost
  isReversed?: boolean
}

export function BlogCard({ post, isReversed = false }: BlogCardProps) {
  return (
    <article className="flex flex-col md:flex-row items-start gap-8 w-full">
      {!isReversed ? (
        <>
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <p className="text-sm text-gray-500">{post.date}</p>
            <p className="text-gray-600">{post.description}</p>
            <Link href={`/blogs/${post.slug}`} className="inline-flex items-center text-gray-800 hover:underline">
              Read article
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <p className="text-sm text-gray-500">{post.date}</p>
            <p className="text-gray-600">{post.description}</p>
            <Link href={`/blogs/${post.slug}`} className="inline-flex items-center text-gray-800 hover:underline">
              Read article
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </>
      )}
    </article>
  )
}

