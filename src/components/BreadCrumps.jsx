import { Link, useLocation } from 'react-router-dom';

function Breadcrumb() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment);

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pathSegments.length
          ? `${pathSegments[pathSegments.length - 1]} overview`
          : 'Dashboard'}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/">
              Dashboard /
            </Link>
          </li>
          {pathSegments.map((segment, index) => {
            const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const formattedName = segment
              .replace(/-/g, ' ')
              .replace(/\b\w/g, l => l.toUpperCase());

            return (
              <li key={path} className="font-medium">
                {index < pathSegments.length - 1 ? (
                  <Link to={path} className="text-gray-600">
                    {formattedName} /
                  </Link>
                ) : (
                  <span className="text-primary">{formattedName}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}

export default Breadcrumb;
