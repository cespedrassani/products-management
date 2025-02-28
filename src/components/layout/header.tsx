import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-white shadow fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-cyan-600">
          Gerenciador de Produtos
        </Link>
      </div>
    </header>
  );
}