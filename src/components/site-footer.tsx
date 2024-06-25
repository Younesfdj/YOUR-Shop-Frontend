import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-20 lg:px-8">
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          <div className="pb-6">
            <Link to=".." className="text-sm leading-6">
              Home
            </Link>
          </div>
          <div className="pb-6">
            <Link to="/about" className="text-sm leading-6">
              A propos
            </Link>
          </div>
        </nav>
        <Link
          to="https://www.fullstack.so"
          className="mt-10 block text-center text-xs leading-5"
        >
          &copy; {new Date().getFullYear()} YOUR Shop LLC. All rights reserved.
        </Link>
      </div>
    </footer>
  );
}
