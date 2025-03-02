import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { LinkProps as UiLinkProps, Link as UiLink } from '@heroui/link'

type LinkProps = NextLinkProps & UiLinkProps

export const Link = (props: LinkProps) => {
  return <UiLink as={NextLink} {...props} />
}
