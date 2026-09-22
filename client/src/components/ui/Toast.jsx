export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null
  const tone = type === 'error' ? 'bg-error' : 'bg-success'
  return (
    <div className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full ${tone} px-5 py-3 text-sm text-white shadow-lg`}>
      <div className="flex items-center gap-3">
        <span>{message}</span>
        {onClose && (
          <button type="button" onClick={onClose} className="opacity-80 hover:opacity-100" aria-label="Dismiss">
            ✕
          </button>
        )}
      </div>
    </div>
  )
}
