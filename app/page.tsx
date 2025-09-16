'use client'

import { allBlogs, type Blog } from "contentlayer/generated"
import Link from 'next/link'
import { useState, useEffect } from 'react'

// 格式化日期函数
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('zh-CN', options)
}

export default function Home() {
  // 按发布日期排序
  const sortedBlogs = allBlogs.sort((a: Blog, b: Blog) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1
    }
    return 1
  })

  // 提取所有唯一标签
  const [uniqueTags, setUniqueTags] = useState<string[]>([])
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>(sortedBlogs)

  // 提取唯一标签
  useEffect(() => {
    const tags = new Set<string>()
    allBlogs.forEach(blog => {
      if (blog.tags) {
        blog.tags.forEach(tag => tags.add(tag.trim()))
      }
    })
    console.log(tags)
    setUniqueTags(Array.from(tags))
  }, [])

  // 筛选文章
  useEffect(() => {
    if (selectedTag) {
      setFilteredBlogs(sortedBlogs.filter(blog => 
        blog.tags && blog.tags.some(tag => 
          tag.trim().toLowerCase() === selectedTag.trim().toLowerCase()
        )
      ))
    } else {
      setFilteredBlogs(sortedBlogs)
    }
  }, [selectedTag, sortedBlogs])

  return (
    <div className="flex flex-col lg:flex-row">
      {/* 分类功能 - 固定在左侧 */}
      <aside className="lg:w-80 lg:sticky lg:top-24 lg:self-start lg:h-[calc(100vh-6rem)] lg:pr-8 py-8 lg:py-12 overflow-y-auto">
        <div className="lg:max-w-[18rem]">
          <h2 className="text-xl font-bold mb-4">文章分类</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${selectedTag === null ? 'bg-primary text-white' : 'bg-background border border-border hover:border-primary/50'}`}
            >
              全部
            </button>
            {uniqueTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-1.5 rounded-full text-sm transition-all ${selectedTag === tag ? 'bg-primary text-white' : 'bg-background border border-border hover:border-primary/50'}`}
              >
                {tag}
              </button>
            ))}
          </div>
          {selectedTag && (
            <p className="mt-3 text-sm text-muted">
              显示标签「{selectedTag}」的 {filteredBlogs.length} 篇文章
            </p>
          )}
        </div>
      </aside>

      {/* 最新文章区域 */}
      <main className="flex-1 py-12 lg:py-12">
        {/* <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">最新文章</h2>
          <div className="h-px bg-border flex-grow ml-6"></div>
        </div> */}

        {filteredBlogs.length > 0 ? (
          <div className="space-y-8">
            {filteredBlogs.map((item: Blog) => (
              <article 
                key={item.slug} 
                className="group bg-background border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
              >
                <Link href={`/article/${item.slug}`} className="block">
                  <div className="flex flex-wrap items-center gap-y-2 text-sm text-muted mb-3">
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
                    {item.tags && item.tags.length > 0 && (
                      <>
                        <span className="mx-2">•</span>
                        <div className="flex items-center gap-1.5">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <div className="flex flex-wrap gap-1">
                            {item.tags.map(tag => (
                              <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full hover:bg-primary/20 transition-colors cursor-pointer" onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSelectedTag(tag);
                              }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  
                  {/* <p className="text-muted mb-4 line-clamp-2">
                    {item.summary}
                  </p> */}
                  
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
            <p className="text-muted text-lg">该分类下暂无文章</p>
            <button
              onClick={() => setSelectedTag(null)}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              查看全部文章
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
