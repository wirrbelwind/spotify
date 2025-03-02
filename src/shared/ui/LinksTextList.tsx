import { LinkProps } from '@heroui/link'
import LinkNext from 'next/link'
import React from 'react'
import { Link } from './Link'

export interface LinksTextListProps {
  links: Array<{
    label: string
    url: string
  }>
  divider?: string
  linkProps?: LinkProps
}

export const LinksTextList: React.FC<LinksTextListProps> = ({ links, linkProps, divider }) => {
  return (
    <>
      {links.map((link, index) => (
        <>
          <Link key={link.url} as={LinkNext} href={link.url} {...linkProps}>
            {link.label}
          </Link>

          {/* Render comma symbol if link is not last */}
          {index !== links.length - 1 && (divider ?? ', ')}
        </>
      ))}
    </>
  )
}
