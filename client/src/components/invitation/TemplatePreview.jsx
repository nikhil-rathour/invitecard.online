export default function TemplatePreview({ template, className = '' }) {
  const theme = template?.themeConfig || {}
  const primary = theme.primaryColor || '#8B1E3F'
  const gold = theme.goldColor || '#C89B3C'
  const image = template?.previewImages?.[0]

  if (image) {
    return (
      <img src={image} alt={template.name} className={`h-full w-full object-cover ${className}`} />
    )
  }

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center p-6 text-center text-white ${className}`}
      style={{ background: `linear-gradient(160deg, ${primary}, ${gold})` }}
    >
      <p className="mb-2 text-xs uppercase tracking-[0.2em] opacity-80">InviteCard</p>
      <p className="font-display text-2xl font-bold leading-tight">{template?.name}</p>
      <p className="mt-3 text-xs opacity-80">{template?.category?.replace('-', ' ')}</p>
    </div>
  )
}
