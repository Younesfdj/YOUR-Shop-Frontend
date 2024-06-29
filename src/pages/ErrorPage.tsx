import { Link } from "react-router-dom";
import errorAsset from "../assets/404.webp";

export default function ErrroPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <img
          src={errorAsset}
          alt="Lost shopping cart illustration"
          width={400}
          height={400}
          className="mx-auto"
        />
        <h1 className="mt-8 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          Oops, la page n'a pas été trouvée !
        </h1>
        <p className="mt-4 text-muted-foreground">
          On dirait que votre panier d'achat s'est perdu dans la forêt.
          Retournez à la page d'accueil pour continuer vos achats.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-blue-400"
          >
            Retourner à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
