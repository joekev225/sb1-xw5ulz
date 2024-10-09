import Link from 'next/link';
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenue sur KASHUP</h1>
        <p className="text-xl mb-8">La solution de paiement innovante pour les marchands</p>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/inscription">Inscription Marchand</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/connexion">Connexion</Link>
          </Button>
        </div>
        <div className="mt-8">
          <Button asChild variant="link">
            <Link href="/admin">Accès Administrateur</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}