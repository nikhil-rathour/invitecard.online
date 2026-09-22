/**
 * Ornamental vector graphics for Royal Indian invitation aesthetics.
 */

export function MandalaFlourish({ color = '#C89B3C', className = '' }) {
  return (
    <div className={`flex items-center justify-center py-4 ${className}`}>
      <svg
        width="120"
        height="24"
        viewBox="0 0 120 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-90"
      >
        <path d="M0 12H45" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="60" cy="12" r="8" stroke={color} strokeWidth="1.5" />
        <circle cx="60" cy="12" r="3" fill={color} />
        <path d="M60 0V4" stroke={color} strokeWidth="1.5" />
        <path d="M60 20V24" stroke={color} strokeWidth="1.5" />
        <path d="M48 12H52" stroke={color} strokeWidth="1.5" />
        <path d="M68 12H72" stroke={color} strokeWidth="1.5" />
        <path d="M75 12H120" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    </div>
  )
}

export function JharokhaArch({ color = '#C89B3C', className = '' }) {
  return (
    <svg
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full max-w-[200px] mx-auto ${className}`}
    >
      <path
        d="M10 55 C40 55, 60 40, 100 10 C140 40, 160 55, 190 55"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="100" cy="8" r="4" fill={color} />
      <path d="M20 58 H180" stroke={color} strokeWidth="1" opacity="0.6" />
    </svg>
  )
}

export function GaneshaIcon({ color = '#C89B3C', size = 48, className = '' }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="32" cy="32" r="28" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
        <path
          d="M32 16C26 16 22 20 22 26C22 34 32 36 32 44C32 46 30 48 28 48"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="26" cy="24" r="2" fill={color} />
        <path d="M36 22H42V26H36V22Z" fill={color} />
        <path d="M30 12C32 10 32 8 32 8C32 8 32 10 34 12" stroke={color} strokeWidth="1.5" />
      </svg>
    </div>
  )
}

export function CornerFlourish({ color = '#C89B3C', position = 'top-left', className = '' }) {
  const transforms = {
    'top-left': 'rotate(0)',
    'top-right': 'rotate(90deg)',
    'bottom-right': 'rotate(180deg)',
    'bottom-left': 'rotate(270deg)',
  }

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: transforms[position] }}
      className={`opacity-60 ${className}`}
    >
      <path d="M2 2H20C20 2 12 4 12 12C12 20 2 20 2 20V2Z" stroke={color} strokeWidth="1.5" />
      <circle cx="6" cy="6" r="2" fill={color} />
    </svg>
  )
}

export function RoyalFrame({ children, className = '', color = '#C89B3C' }) {
  return (
    <div className={`relative p-6 sm:p-8 rounded-2xl border border-gold/30 bg-surface shadow-md ${className}`}>
      <CornerFlourish color={color} position="top-left" className="absolute top-2 left-2" />
      <CornerFlourish color={color} position="top-right" className="absolute top-2 right-2" />
      <CornerFlourish color={color} position="bottom-left" className="absolute bottom-2 left-2" />
      <CornerFlourish color={color} position="bottom-right" className="absolute bottom-2 right-2" />
      {children}
    </div>
  )
}
