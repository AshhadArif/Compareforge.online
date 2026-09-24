import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h1 className="text-6xl font-bold text-text mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-text mb-4">Page Not Found</h2>
      <p className="text-text-secondary mb-8 max-w-md mx-auto">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors"
        >
          Go to Homepage
        </Link>
        <Link
          href="/compare"
          className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary bg-white border border-primary rounded-lg hover:bg-primary-light transition-colors"
        >
          Browse Comparisons
        </Link>
      </div>
    </div>
  );
}
