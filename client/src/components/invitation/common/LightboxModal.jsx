import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X, CaretLeft, CaretRight } from '@phosphor-icons/react'

export default function LightboxModal({ images = [], selectedIndex = null, onClose, onSelectIndex }) {
  const closeBtnRef = useRef(null)

  useEffect(() => {
    if (selectedIndex !== null && closeBtnRef.current) {
      closeBtnRef.current.focus()
    }
  }, [selectedIndex])

  useEffect(() => {
    function handleKeyDown(e) {
      if (selectedIndex === null) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') {
        onSelectIndex((selectedIndex + 1) % images.length)
      }
      if (e.key === 'ArrowLeft') {
        onSelectIndex((selectedIndex - 1 + images.length) % images.length)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, images.length, onClose, onSelectIndex])

  if (selectedIndex === null || !images[selectedIndex]) return null

  const current = images[selectedIndex]

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Image lightbox"
      >
        {/* Controls */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
          aria-label="Close lightbox"
        >
          <X size={24} weight="bold" />
        </button>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onSelectIndex((selectedIndex - 1 + images.length) % images.length)
              }}
              className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
              aria-label="Previous image"
            >
              <CaretLeft size={28} weight="bold" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onSelectIndex((selectedIndex + 1) % images.length)
              }}
              className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
              aria-label="Next image"
            >
              <CaretRight size={28} weight="bold" />
            </button>
          </>
        )}

        {/* Content */}
        <div
          className="flex max-h-[85vh] max-w-[90vw] flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.img
            key={selectedIndex}
            src={typeof current === 'string' ? current : current.url}
            alt={current.caption || 'Gallery photo'}
            className="max-h-[75vh] w-auto rounded-lg object-contain shadow-2xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          {current.caption && (
            <p className="mt-4 text-center text-sm font-medium text-white/90">
              {current.caption}
            </p>
          )}
          <p className="mt-1 text-xs text-white/50">
            {selectedIndex + 1} / {images.length}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
