export default function Textarea({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-text">{label}</label>}
      <textarea
        className={`w-full px-4 py-3 rounded-lg border bg-surface text-text placeholder-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
          error ? 'border-error' : 'border-border'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  )
}
