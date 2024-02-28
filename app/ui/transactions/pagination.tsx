'use client';

import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Pagination() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const currentPage = {
    month: searchParams.get('month') || String(new Date().getMonth() + 1), // Convert zero-based index
    year: searchParams.get('year') || String(new Date().getFullYear())
  };

  useEffect(() => {
    replace(`${pathname}?month=${currentPage.month}&&year=${currentPage.year}`);
  }, [])

  const createPageURL = (page: {
    month: number;
    year: number;
  }) => {
    const params = new URLSearchParams(searchParams);
    params.set('month', page.month.toString());
    params.set('year', page.year.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <>
      <div className="inline-flex items-center">
        <PaginationArrow
          direction="left"
          href={createPageURL({
            month: parseInt(currentPage.month) - 1,
            year: parseInt(currentPage.year)
          })}
          isDisabled={parseInt(currentPage.month) <= 1}
        />

        <div className="flex -space-x-px text-xl font-bold">
          {Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(2000, parseInt(currentPage.month)-1, 1))}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL({
            month: parseInt(currentPage.month) + 1,
            year: parseInt(currentPage.year)
          })}
          isDisabled={parseInt(currentPage.month) >= 12}
        />
      </div>
    </>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover:scale-150': !isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right',
    },
  );

  const icon =
    direction === 'left' ? (
      <ChevronLeft />
    ) : (
      <ChevronRight />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}