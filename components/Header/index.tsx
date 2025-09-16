"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { allBlogs } from "contentlayer/generated";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof allBlogs>([]);
  const [showResults, setShowResults] = useState(false);

  // 搜索功能实现
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const results = allBlogs.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.summary?.toLowerCase().includes(query) ||
        (post.tags &&
          post.tags.some((tag) => tag.toLowerCase().includes(query)))
    );

    setSearchResults(results);
  }, [searchQuery]);

  // 处理搜索输入变化
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowResults(true);
  };

  // 处理搜索表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      // 如果有搜索结果，跳转到第一篇文章
      window.location.href = `/article/${searchResults[0].slug}`;
    }
  };

  // 关闭搜索结果下拉框
  useEffect(() => {
    const handleClickOutside = () => {
      setShowResults(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-2xl font-bold text-primary flex items-center gap-2 group"
          >
            <span className="relative">
              JAMX
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </span>
            <span className="hidden sm:inline text-muted">BLOG</span>
          </Link>
        </div>

        {/* 搜索功能 */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="搜索文章..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setShowResults(true)}
              className="pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-64"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="absolute left-2 top-2.5 w-5 h-5 text-muted"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setShowResults(false);
                }}
                className="absolute right-2 top-2 text-muted hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </form>

          {/* 搜索结果下拉框 */}
          {showResults && searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto w-full sm:w-64">
              {searchResults.length > 0 ? (
                searchResults.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/article/${post.slug}`}
                    className="block px-4 py-2 hover:bg-primary/5 transition-colors"
                    onClick={() => setShowResults(false)}
                  >
                    <h4 className="font-medium text-foreground line-clamp-1">
                      {post.title}
                    </h4>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="text-xs text-muted">
                            +{post.tags.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                ))
              ) : (
                <div className="px-4 py-3 text-muted">未找到匹配的文章</div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
