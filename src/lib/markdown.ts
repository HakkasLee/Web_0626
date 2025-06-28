import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content');

export async function getSortedPostsData(directory: 'blog' | 'projects') {
  const dirPath = path.join(postsDirectory, directory);
  const fileNames = fs.readdirSync(dirPath);
  const allPostsData = await Promise.all(fileNames.map(async (fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(dirPath, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const title = matterResult.data.title || 'Untitled';
    const date = matterResult.data.date || new Date().toISOString().split('T')[0];
    const time = matterResult.data.time || 'N/A';
    const role = matterResult.data.role || 'N/A';
    const keywords = matterResult.data.keywords || '';
    const image = matterResult.data.image || '/Web_0626/images/projects/dco-placeholder.png';
    const summary = matterResult.data.summary || '';

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

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(directory: string, id: string) {
  const fullPath = path.join(postsDirectory, directory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const image = matterResult.data.image || '/Web_0626/images/projects/dco-placeholder.png';

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    title: matterResult.data.title || 'Untitled',
    date: matterResult.data.date || '',
    image,
    ...matterResult.data,
  };
}

export function getAllPostIds(subDirectory: 'blog' | 'projects') {
    const dir = path.join(postsDirectory, subDirectory);

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