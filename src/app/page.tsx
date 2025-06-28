import dynamic from 'next/dynamic';
import Link from 'next/link';

const HomeCarousel = dynamic(() => import('@/components/HomeCarousel'), { ssr: false });

// 动态获取 basePath
const getBasePath = () => {
  if (typeof window !== 'undefined') {
    // 客户端：从当前路径推断
    const pathname = window.location.pathname;
    if (pathname.startsWith('/Web_0626')) {
      return '/Web_0626';
    }
  }
  // 服务端或本地开发：使用环境变量
  return process.env.NODE_ENV === 'production' ? '/Web_0626' : '';
};

const basePath = getBasePath();

// 假设图片文件名为 1.jpg, 2.jpg, 3.jpg
const imageInfos = [
  {
    src: `${basePath}/Web_0626/fig_background/background2.jpeg`,
    location: '中国｜北部湾·沙田港',
    latlng: "21°28'00\"N, 109°45'00\"E",
  },
  {
    src: `${basePath}/Web_0626/fig_background/background1.jpeg`,
    location: '中国｜北部湾·铁山港',
    latlng: "21°37'00\"N, 109°27'00\"E",
  },
  {
    src: `${basePath}/Web_0626/fig_background/background3.jpeg`,
    location: '中国｜安徽·黄山',
    latlng: "30°08'00\"N, 118°09'00\"E",
  },
  {
    src: `${basePath}/Web_0626/fig_background/background4.jpeg`,
    location: '中国｜青岛·唐岛湾',
    latlng: "35°58'00\"N, 120°12'00\"E",
  },
  {
    src: `${basePath}/Web_0626/fig_background/background5.jpeg`,
    location: '中国｜南京·紫金山',
    latlng: "32°03'39\"N, 118°50'54\"E",
  },
  {
    src: `${basePath}/Web_0626/fig_background/background6.jpeg`,
    location: '中国｜珠海·金湾机场',
    latlng: "22°00'46\"N, 113°22'54\"E",
  },
  {
    src: `${basePath}/Web_0626/fig_background/background7.jpeg`,
    location: '中国｜珠海·金湾机场',
    latlng: "22°00'46\"N, 113°22'54\"E",
  },
  {
    src: `${basePath}/Web_0626/fig_background/background8.jpeg`,
    location: '中国｜上海·陆家嘴',
    latlng: "31°14'23\"N, 121°30'05\"E",
  },
  {
    src: `${basePath}/Web_0626/fig_background/background9.jpeg`,
    location: '中国｜武汉·长江大桥',
    latlng: "30°32'49\"N, 114°17'15\"E",
  },
];

const HomePage = () => {
  return (
    <div className="w-full min-h-screen">
      {/* 轮播区+欢迎语 */}
      <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
        <HomeCarousel images={imageInfos} />
        {/* 欢迎语绝对居中覆盖在轮播图上 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className="max-w-4xl px-4 sm:px-6 lg:px-8 text-center bg-white/70 rounded-xl shadow-lg py-10">
            <h1 className="text-4xl font-extrabold mb-6">欢迎来到我的个人主页</h1>
            <p className="text-lg text-gray-700 mb-6">
              我是李俊霖，来自中国科学技术大学，目前攻读硕士学位，研究方向为模拟与射频集成电路设计。<br/>
              这个网站汇集了我在学习、科研与生活中的一些记录，旨在整理思路，也分享经验。
            </p>
            <div className="text-left mb-8">
              <ul className="list-disc list-inside space-y-2">
                <li>
                  我的<a href="/cv" className="text-blue-600 hover:underline">简历</a>：研究背景与技能概况
                </li>
                <li>
                  <a href="/projects" className="text-blue-600 hover:underline">项目</a>：参与设计的模拟/射频芯片及实践经验
                </li>
                <li>
                  <a href="/gallery" className="text-blue-600 hover:underline">摄影作品</a>：记录生活与观察
                </li>
                <li>
                  <a href="/blog" className="text-blue-600 hover:underline">博客</a>：关于电路设计、工具与学习的笔记与思考
                </li>
              </ul>
            </div>
            <p className="text-gray-600 mt-8">
              欢迎交流讨论，如需联系：
              <a href="mailto:lizi371@mail.ustc.edu.cn" className="text-blue-600 hover:underline ml-1">lizi371@mail.ustc.edu.cn</a>
            </p>
          </div>
        </div>
      </div>
      {/* 四个方块按钮，独立一行，居中，不覆盖轮播区 */}
      <div className="flex justify-center gap-6 mt-8 mb-12 z-20 relative">
        <Link href="/cv" className="group flex flex-col items-center justify-center w-28 h-28 bg-white/70 rounded-xl shadow-lg hover:bg-gray-100 transition">
          <span className="mb-2">
            {/* 简历icon - 用户/证件风格 */}
            <svg className="w-8 h-8 text-gray-500 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 16-4 16 0"/></svg>
          </span>
          <span className="text-base font-semibold text-gray-700 group-hover:text-blue-700">CV</span>
        </Link>
        <Link href="/projects" className="group flex flex-col items-center justify-center w-28 h-28 bg-white/70 rounded-xl shadow-lg hover:bg-gray-100 transition">
          <span className="mb-2">
            {/* 项目icon - 文件夹风格 */}
            <svg className="w-8 h-8 text-gray-500 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M3 7a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/></svg>
          </span>
          <span className="text-base font-semibold text-gray-700 group-hover:text-blue-700">Project</span>
        </Link>
        <Link href="/gallery" className="group flex flex-col items-center justify-center w-28 h-28 bg-white/70 rounded-xl shadow-lg hover:bg-gray-100 transition">
          <span className="mb-2">
            {/* 相册icon - 图片/相框风格 */}
            <svg className="w-8 h-8 text-gray-500 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3"/><circle cx="8.5" cy="12.5" r="2"/><path d="M21 19l-5-5a2 2 0 0 0-2.8 0L3 19"/></svg>
          </span>
          <span className="text-base font-semibold text-gray-700 group-hover:text-blue-700">Gallery</span>
        </Link>
        <Link href="/blog" className="group flex flex-col items-center justify-center w-28 h-28 bg-white/70 rounded-xl shadow-lg hover:bg-gray-100 transition">
          <span className="mb-2">
            {/* 博客icon - 书本/笔记风格 */}
            <svg className="w-8 h-8 text-gray-500 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 8h8M8 12h8M8 16h4"/></svg>
          </span>
          <span className="text-base font-semibold text-gray-700 group-hover:text-blue-700">Blog</span>
        </Link>
      </div>
    </div>
  );
};

export default HomePage; 