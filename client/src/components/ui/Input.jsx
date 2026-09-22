export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-[#241F20]">{label}</label>
      )}
      <input
        className={`w-full px-4 py-3 rounded-lg border bg-white text-[#241F20] placeholder-[#746B6D] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent ${
          error ? 'border-[#B3261E]' : 'border-[#E9DFD6]'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-[#B3261E]">{error}</p>}
    </div>
  )
}
