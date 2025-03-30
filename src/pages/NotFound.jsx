import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>
        <p className="mb-6 text-2xl text-white">Oops! Page Not Found</p>
        <p className="mb-8 text-slate-100">
          It seems the page you are looking for doesn&apos;t exist or has been
          moved. Let&apos;s get you back on track!
        </p>
        <Link to="/">
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700">
            Go to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
