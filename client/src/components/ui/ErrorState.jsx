import { WarningCircle } from '@phosphor-icons/react'
import Button from './Button'

export default function ErrorState({ message, onRetry, className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 text-center ${className}`}>
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-error/10">
        <WarningCircle size={28} weight="duotone" className="text-error" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-text">Something went wrong</h3>
      <p className="mb-6 max-w-sm text-sm leading-relaxed text-muted">
        {message || 'An unexpected error occurred. Please try again.'}
      </p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  )
}
