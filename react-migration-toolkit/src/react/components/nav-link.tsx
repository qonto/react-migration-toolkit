import type { ReactNode } from 'react';
import { useEmberService } from '../hooks/use-ember-service.ts';
import { Link, type LinkProps } from './link';

export type NavLinkRenderProps = {
  isActive: boolean;
};

export interface NavLinkProps extends Omit<LinkProps, 'className'> {
  className?: string | ((props: NavLinkRenderProps) => string | undefined);
}

export function NavLink({
  'aria-current': ariaCurrentProp = 'page',
  children,
  className: classNameProp,
  to,
  ...props
}: NavLinkProps): ReactNode {
  let className: string | undefined;
  const router = useEmberService('router');
  const locationPathname = router.currentURL;

  const isActive = locationPathname === to;
  const ariaCurrent = isActive ? ariaCurrentProp : undefined;

  const renderProps = {
    isActive,
  };

  if (typeof classNameProp === 'function') {
    className = classNameProp(renderProps);
  } else {
    className = [classNameProp, isActive ? 'active' : null]
      .filter(Boolean)
      .join(' ');
  }

  return (
    <Link aria-current={ariaCurrent} className={className} to={to} {...props}>
      {children}
    </Link>
  );
}
