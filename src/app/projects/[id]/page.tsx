import { getPostData, getAllPostIds } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import Image from 'next/image';

type Params = {
  id: string;
};

export async function generateStaticParams() {
  const paths = getAllPostIds('projects');
  return paths.map(p => ({ id: p.params.id }));
}

export default async function Project({ params }: { params: Params }) {
  const projectData = await getPostData('projects', params.id) as any;

  if (!projectData || !projectData.contentHtml) {
    notFound();
  }

  return (
    <div>
        <div className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">{projectData.title}</h1>
            <p className="text-lg text-gray-500 mb-2">{projectData.time}</p>
            <p className="text-xl font-semibold text-blue-600">{projectData.role}</p>
        </div>
        
        {projectData.image && (
            <div className="mb-8 max-w-3xl mx-auto">
                <Image
                    src={projectData.image}
                    alt={projectData.title}
                    width={800}
                    height={600}
                    className="rounded-lg shadow-lg object-cover w-full"
                />
            </div>
        )}

        <div className="mb-8">
            {projectData.keywords.split(',').map((keyword: string) => (
                <span key={keyword} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {keyword.trim()}
                </span>
            ))}
        </div>

        <article className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: projectData.contentHtml }} />
    </div>
  );
}

export async function generateMetadata({ params }: { params: Params }) {
    const projectData = await getPostData('projects', params.id);
    return {
        title: projectData.title,
    };
} 