import './Button.css'

interface ButtonProps {
  variant: 'white' | 'ghost'
  href?: string
  children: React.ReactNode
}

export default function Button({ variant, href, children }: ButtonProps) {
  const className = `btn btn--${variant}`
  if (href) {
    return <a href={href} className={className}>{children}</a>
  }
  return <button className={className}>{children}</button>
}
