import Link from 'next/link';
import { getSortedPostsData } from '@/lib/markdown';

type Post = {
  id: string;
  title: string;
  date: string;
};

const BlogPage = async () => {
  const allPosts = (await getSortedPostsData('blog')) as Post[];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">博客</h1>
      <ul className="space-y-6">
        {allPosts.map(({ id, date, title }) => (
          <li key={id} className="border-l-4 border-gray-200 pl-4 hover:border-blue-500 transition-colors">
            <Link href={`/blog/${id}`} className="text-xl font-semibold text-gray-800 hover:text-blue-600">
              {title}
            </Link>
            <br />
            <small className="text-gray-500">{date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage; 