export default function EmptyState({ icon: Icon, title, description, action, className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 text-center ${className}`}>
      {Icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-bg-alt">
          <Icon size={28} className="text-muted" />
        </div>
      )}
      <h3 className="mb-2 text-lg font-semibold text-text">{title}</h3>
      {description && (
        <p className="mb-6 max-w-sm text-sm leading-relaxed text-muted">{description}</p>
      )}
      {action}
    </div>
  )
}
