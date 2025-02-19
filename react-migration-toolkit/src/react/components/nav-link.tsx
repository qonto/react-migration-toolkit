import type { ReactNode } from 'react';
import { Link, type LinkProps } from './link';

export function NavLink({ to, children, ...props }: LinkProps): ReactNode {
  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
}
