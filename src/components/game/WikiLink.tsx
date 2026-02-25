import React from 'react';
import StyledLink from './StyledLink';
import { getWikiSvg } from '../../util/svgs';

interface Props {
  url: string,
  children?: React.ReactNode
}

const WikiLink: React.FC<Props> = ({ url, children }) => {
  const parsedUrl = url.replaceAll(' ', '_');
  const link = (
    <span>
      {getWikiSvg()}
      Open Wikipedia
    </span>
  );
  if (!children) {
    return (
      <StyledLink href={parsedUrl} title="Open Wikipedia in a new tab [keyboard: w]">
        {link}
      </StyledLink>
    );
  }
  return (
    <StyledLink href={parsedUrl} className="bg-[#043d2f] float-right ml-3 flex flex-col items-center border border-emerald-800 px-0.5 pt-0.5 pb-1 text-sm select-none sm:text-base" title="Open Wikipedia in a new tab [keyboard: w]">
      {children}
      {link}
    </StyledLink>
  );
};

WikiLink.displayName = 'WikiLink';

export default WikiLink;
