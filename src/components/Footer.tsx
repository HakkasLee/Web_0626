const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <p className="text-gray-600">© 2025 JunlinLi @ USTC. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="https://github.com/HakkasLee" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
          </a>
          <a href="mailto:lizi371@mail.ustc.edu.cn" className="text-gray-600 hover:text-gray-900">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M1.75 3h20.5c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0122.25 21H1.75A1.75 1.75 0 010 19.25V4.75C0 3.784.784 3 1.75 3zM2.5 4.5v.25l9.5 6.333L21.5 4.75v-.25a.25.25 0 00-.25-.25H2.75a.25.25 0 00-.25.25zM21.5 6.31L12 12.81 2.5 6.31V19.25c0 .138.112.25.25.25h18.5a.25.25 0 00.25-.25V6.31z" /></svg>
          </a>
          <a href="https://500px.com.cn/hakkas" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 