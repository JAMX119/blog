import Link from "next/link";
export default function Header() {
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

          {/* <nav className="hidden md:flex items-center gap-6 ml-6">
                <Link
                  href="/"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  首页
                </Link>
                <Link
                  href="#about"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  关于我
                </Link>
                <Link
                  href="#projects"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  项目
                </Link>
                <Link
                  href="#contact"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  联系我
                </Link>
              </nav> */}

          {/* <div className="block md:hidden">
                <button className="text-foreground">
                  // 汉堡菜单图标
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </button>
              </div> */}
        </div>

        {/* 添加 切换主题和语言 功能 */}
      </div>
    </header>
  );
}
