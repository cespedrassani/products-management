/**
 * Trunca um texto para o tamanho máximo especificado e adiciona reticências
 * @param text Texto a ser truncado
 * @param maxLength Tamanho máximo permitido
 * @returns O texto truncado com reticências se exceder o tamanho máximo
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Formata um número como moeda (USD)
 * @param value Valor numérico
 * @returns String formatada como moeda
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

/**
 * Formata uma classificação com uma casa decimal
 * @param rating Valor da classificação
 * @returns String formatada com uma casa decimal
 */
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

/**
 * Filtra os produtos com base nos critérios especificados
 * @param products Lista de produtos
 * @param searchTerm Termo de busca
 * @param category Categoria
 * @returns Lista filtrada de produtos
 */
export function filterProducts<T extends { title: string; category: string }>(
  products: T[],
  searchTerm: string = '',
  category: string = ''
): T[] {
  return products.filter((product) => {
    const matchesSearch = searchTerm
      ? product.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesCategory = category
      ? product.category === category
      : true;
    return matchesSearch && matchesCategory;
  });
}

/**
 * Ordena produtos por preço
 * @param products Lista de produtos
 * @param direction Direção da ordenação ('asc' ou 'desc')
 * @returns Lista ordenada de produtos
 */
export function sortProductsByPrice<T extends { price: number }>(
  products: T[],
  direction: 'asc' | 'desc' = 'asc'
): T[] {
  return [...products].sort((a, b) => {
    if (direction === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });
}

/**
 * Implementa a paginação de uma lista
 * @param items Lista de itens
 * @param page Número da página (começando em 1)
 * @param itemsPerPage Itens por página
 * @returns Itens da página especificada
 */
export function paginateItems<T>(
  items: T[],
  page: number,
  itemsPerPage: number
): T[] {
  const startIndex = (page - 1) * itemsPerPage;
  return items.slice(startIndex, startIndex + itemsPerPage);
}