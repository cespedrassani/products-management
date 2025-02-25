import React from 'react';

export function Pagination({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <nav className={`mx-auto text-sm flex w-full justify-center ${className}`} {...props} />;
}

export function PaginationContent({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={`flex text-sm flex-row items-center gap-1 ${className}`} {...props} />;
}

export function PaginationItem({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={className} {...props} />;
}

export function PaginationPrevious({
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center bg-gray-200 whitespace-nowrap rounded-md text-black text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring h-9 px-4 py-2 gap-1 hover:bg-gray-300 hover:text-accent-foreground ${className}`}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span className='text-xs'>Anterior</span>
    </button>
  );
}

export function PaginationNext({
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center bg-gray-200 whitespace-nowrap rounded-md text-black text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring h-9 px-4 py-2 gap-1 hover:bg-gray-300 hover:text-accent-foreground ${className}`}
      {...props}
    >
      <span className='text-xs'>Próxima</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
}