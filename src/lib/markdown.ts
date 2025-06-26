import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export async function getSortedPostsData(subDirectory: 'blog' | 'projects') {
  const dir = path.join(contentDirectory, subDirectory);
  
  // Check if directory exists
  if (!fs.existsSync(dir)) {
    return [];
  }

  const fileNames = fs.readdirSync(dir);
  const allPostsData = await Promise.all(fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(dir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      // Ensure title and date are strings
      const title = matterResult.data.title || 'Untitled';
      const date = matterResult.data.date || new Date().toISOString().split('T')[0];

      // Fields for projects with defaults
      const time = matterResult.data.time || 'N/A';
      const role = matterResult.data.role || 'N/A';
      const keywords = matterResult.data.keywords || '';
      const image = matterResult.data.image || '/images/projects/dco-placeholder.png';
      const summary = matterResult.data.summary || '';

      // Process summary from markdown to HTML
      const processedSummary = await remark()
        .use(html)
        .process(summary);
      const summaryHtml = processedSummary.toString();

      return {
        id,
        title,
        date,
        time,
        role,
        keywords,
        image,
        summary,
        summaryHtml,
        ...matterResult.data,
      };
    }));

  // Sort posts by date if it exists
  return allPostsData.sort((a: any, b: any) => {
    if (a.date && b.date) {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    }
    return 0; // No change in order if dates are not present
  });
}

export async function getPostData(subDirectory: 'blog' | 'projects', id: string) {
  const fullPath = path.join(contentDirectory, subDirectory, `${id}.md`);
  
  if (!fs.existsSync(fullPath)) {
    // You can return a custom object or throw an error
    return {
        id,
        title: 'Not Found',
        date: '',
        contentHtml: '<p>The requested content was not found.</p>',
    };
  }
    
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

export function getAllPostIds(subDirectory: 'blog' | 'projects') {
    const dir = path.join(contentDirectory, subDirectory);

    if (!fs.existsSync(dir)) {
        return [];
    }
    
    const fileNames = fs.readdirSync(dir);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            },
        };
    });
} 