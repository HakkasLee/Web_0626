import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-gray-800">
            <Link href="/">Junlin Li</Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link href="/cv" className="text-gray-600 hover:text-gray-900">
              CV
            </Link>
            <Link href="/projects" className="text-gray-600 hover:text-gray-900">
              Project
            </Link>
            <Link href="/gallery" className="text-gray-600 hover:text-gray-900">
              Gallery
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-gray-900">
              Blog
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 