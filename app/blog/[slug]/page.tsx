import { allBlogs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer2/hooks'

export async function generateStaticParams() {
  return allBlogs.map((post) => ({
    slug: post.slug,
  }))
}

type BlogSlugProps = {
  params: {
    slug: string
  }
}

export default function BlogSlug({ params }: BlogSlugProps) {
  const post = allBlogs.find((post) => post.slug === params.slug)
  if (!post) {
    notFound()
  }

  const Component = useMDXComponent(post.body.code)

  return (
    <section className="prose prose-stone">
      <Component />
    </section>
  )
}
