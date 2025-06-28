import { getSortedPostsData } from '@/lib/markdown';
import Image from 'next/image';
import Link from 'next/link';

// Define a type for the project data
type Project = {
  id: string;
  title: string;
  time: string;
  role: string;
  keywords: string;
  image: string;
  summary: string;
  summaryHtml: string;
};

const ProjectsPage = async () => {
  // Cast the data to the Project type
  const allProjects = await getSortedPostsData('projects') as Project[];

  // 按要求排序：high-performance-dco, mimo-soc-pga, radar-soc-frontend
  const order = ['high-performance-dco', 'mimo-soc-pga', 'radar-soc-frontend'];
  let projects = order.map(id => allProjects.find(p => p.id === id)).filter(Boolean) as Project[];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">科研/工程项目</h1>
      <div className="space-y-12">
        {projects.map((project) => (
          <div key={project.id} className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/4">
              {project.image && (
                 <Link href={`/projects/${project.id}`}>
                    <Image
                        src={project.image.startsWith('/Web_0626') ? project.image : `/Web_0626${project.image}`}
                        alt={project.title}
                        width={300}
                        height={225}
                        className="rounded-lg shadow-lg object-cover transition-opacity duration-300 hover:opacity-80"
                    />
                 </Link>
              )}
            </div>
            <div className="md:w-3/4">
              <Link href={`/projects/${project.id}`}>
                <h2 className="text-2xl font-bold mb-2 hover:text-blue-600 transition-colors">{project.title}</h2>
              </Link>
              <p className="text-sm text-gray-500 mb-2">{project.time}</p>
              <p className="text-md font-semibold text-gray-700 mb-3">{project.role}</p>
              <div className="mb-4">
                {project.keywords.split(',').map(keyword => (
                    <span key={keyword} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {keyword.trim()}
                    </span>
                ))}
              </div>
              <div className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: project.summaryHtml }} />
              <Link href={`/projects/${project.id}`} className="text-blue-600 hover:underline">
                了解更多 →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage; 