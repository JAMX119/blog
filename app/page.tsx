import { allBlogs, type Blog } from "contentlayer/generated"
import Link from 'next/link'

// 格式化日期函数
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('zh-CN', options)
}

export default function Home() {
  console.log(allBlogs)
  // 按发布日期排序
  const sortedBlogs = allBlogs.sort((a: Blog, b: Blog) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1
    }
    return 1
  })

  return (
    <>
      {/* 最新文章区域 */}
      <section id="articles" className="py-12">
        {/* <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">最新文章</h2>
          <div className="h-px bg-border flex-grow ml-6"></div>
        </div> */}

        {sortedBlogs.length > 0 ? (
          <div className="space-y-8">
            {sortedBlogs.map((item: Blog) => (
              <article 
                key={item.slug} 
                className="group bg-background border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
              >
                <Link href={`/article/${item.slug}`} className="block">
                  <div className="flex items-center text-sm text-muted mb-3">
                    <span className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008z" />
                      </svg>
                      {formatDate(item.publishedAt)}
                    </span>
                    <span className="mx-2">•</span>
                    <span className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {item.readingTime?.text || '5 分钟阅读'}
                    </span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-muted mb-4 line-clamp-2">
                    {item.summary}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      阅读更多
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 transform group-hover:translate-x-1 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-background border border-border rounded-xl">
            <p className="text-muted text-lg">暂无文章，敬请期待...</p>
          </div>
        )}
      </section>
    </>
  )
}
