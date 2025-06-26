import { getPostData, getAllPostIds } from '@/lib/markdown';
import { notFound } from 'next/navigation';

type Params = {
  id: string;
};

// This function tells Next.js which paths to pre-render
export async function generateStaticParams() {
  const paths = getAllPostIds('blog');
  return paths.map(p => ({ id: p.params.id }));
}

// This is the page component
export default async function Post({ params }: { params: Params }) {
  const postData = await getPostData('blog', params.id);

  if (!postData || !postData.contentHtml) {
    notFound();
  }

  return (
    <article className="prose prose-lg max-w-none">
      <h1 className="text-4xl font-extrabold tracking-tight mb-4">{postData.title}</h1>
      <div className="text-gray-500 mb-8">{postData.date}</div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  );
}

// Add metadata to the page
export async function generateMetadata({ params }: { params: Params }) {
    const postData = await getPostData('blog', params.id);
    return {
        title: postData.title,
    };
} 