import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-cyan-600">
          Gerenciador de Produtos
        </Link>

        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/products"
                className="text-gray-600 hover:text-cyan-600 font-medium"
              >
                Produtos
              </Link>
            </li>
            <li>
              <Link
                href="/products/create"
                className="text-gray-600 hover:text-cyan-600 font-medium"
              >
                Adicionar Produto
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}