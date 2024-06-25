import { Link } from "react-router-dom";

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link to=".." className="flex items-center space-x-2">
        <div className="w-7 h-7">
          <img
            src="logo/logo_dark.svg"
            alt="Flair Logo"
            className="object-contain"
          />
        </div>
        <span className="inline-block text-xl font-bold">YOUR Shop</span>
      </Link>
    </div>
  );
}
