import { allBlogs } from "contentlayer/generated"
import type { Blog } from "contentlayer/generated/types.d.ts"
import Link from 'next/link'

export default function Home() {
  console.log(allBlogs)
  return (
    <section>
      {allBlogs
        .sort((a: Blog, b: Blog) => {
          if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
            return -1
          }
          return 1
        })
        .map((item: Blog) => (
          <Link
            key={item.slug}
            href={`/${item.slug}`}
            className='mb-5'
          >
            {item.title}
          </Link>
        ))}
    </section>
  )
}

