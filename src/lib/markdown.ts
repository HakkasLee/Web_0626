import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { visit } from 'unist-util-visit';
import { Plugin } from 'unified';

const postsDirectory = path.join(process.cwd(), 'content');
const BASE = '/Web_0626';

// 插件：为 Markdown 正文图片加前缀
const prependBasePath: Plugin = () => (tree) => {
  visit(tree, 'image', (node: any) => {
    if (node.url && node.url.startsWith('/')) {
      node.url = `${BASE}${node.url}`;
    }
  });
};

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
    let image = matterResult.data.image || '/images/projects/dco-placeholder.png';
    if (image.startsWith('/')) image = `${BASE}${image}`;
    const summary = matterResult.data.summary || '';

    const processedSummary = await remark()
      .use(prependBasePath)
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

  let image = matterResult.data.image || '/images/projects/dco-placeholder.png';
  if (image.startsWith('/')) image = `${BASE}${image}`;

  const processedContent = await remark()
    .use(prependBasePath)
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