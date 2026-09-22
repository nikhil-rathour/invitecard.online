export default function SectionHeading({
  title,
  subtitle,
  align = 'left',
  className = '',
}) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left'
  
  return (
    <div className={`mb-10 ${alignClass} ${className}`}>
      <h2 className="font-display text-3xl font-bold text-text sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-muted">
          {subtitle}
        </p>
      )}
    </div>
  )
}
