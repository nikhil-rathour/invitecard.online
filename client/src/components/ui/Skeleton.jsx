export function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-border-light ${className}`}
      role="status"
      aria-label="Loading"
    />
  )
}

export function TemplateCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border-light">
      <div className="aspect-[3/4] animate-pulse bg-border-light" />
      <div className="space-y-3 p-4">
        <div className="h-5 w-3/4 animate-pulse rounded bg-border-light" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-border-light" />
      </div>
    </div>
  )
}

export default Skeleton
