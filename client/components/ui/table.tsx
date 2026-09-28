import * as React from 'react';

import { cn } from '@/lib/utils';

export function Table({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return <table className={cn('w-full text-sm', className)} {...props} />;
}

export function THead({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn('text-left text-xs uppercase tracking-wide text-slate-300/70', className)} {...props} />;
}

export function TBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn(className)} {...props} />;
}

export function TR({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn('border-t border-white/10', className)} {...props} />;
}

export function TH({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
  return <th className={cn('px-3 py-3 font-semibold', className)} {...props} />;
}

export function TD({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn('px-3 py-3 align-top text-slate-200', className)} {...props} />;
}
