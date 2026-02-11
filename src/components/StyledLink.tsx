import React, { AnchorHTMLAttributes } from 'react';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string,
}

const StyledLink: React.FC<Props> = ({ href, children, className, ...props }) => {
  const cn = `underline decoration-1 underline-offset-4 not-italic text-amber-400 ${className || ''}`;
  return (
    <a
      href={href}
      className={cn}
      target='_blank'
      {...props}
    >
      {children}
    </a>
  );
}

StyledLink.displayName = 'StyledLink';

export default StyledLink;
