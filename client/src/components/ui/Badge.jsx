const variants = {
  default: 'bg-bg-alt text-text-secondary border-border-light',
  primary: 'bg-primary/10 text-primary border-primary/20',
  gold: 'bg-gold/10 text-gold-dark border-gold/20',
  success: 'bg-success/10 text-success border-success/20',
  error: 'bg-error/10 text-error border-error/20',
}

export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
