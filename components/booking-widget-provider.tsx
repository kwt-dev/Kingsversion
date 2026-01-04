'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { WindowTintingBookingStepper } from 'acme-booking-stepper-full-ui'

interface BookingWidgetContextValue {
  isOpen: boolean
  openWidget: () => void
  closeWidget: () => void
  toggleWidget: () => void
}

const BookingWidgetContext = createContext<BookingWidgetContextValue | undefined>(undefined)

export function useBookingWidget() {
  const context = useContext(BookingWidgetContext)

  if (!context) {
    throw new Error('useBookingWidget must be used within a BookingWidgetProvider')
  }

  return context
}

export function BookingWidgetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openWidget = useCallback(() => setIsOpen(true), [])
  const closeWidget = useCallback(() => setIsOpen(false), [])
  const toggleWidget = useCallback(() => setIsOpen((prev) => !prev), [])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [isOpen])

  const value = useMemo(
    () => ({
      isOpen,
      openWidget,
      closeWidget,
      toggleWidget,
    }),
    [closeWidget, isOpen, openWidget, toggleWidget],
  )

  return (
    <BookingWidgetContext.Provider value={value}>
      {children}
      <BookingWidgetOverlay isOpen={isOpen} onClose={closeWidget} />
    </BookingWidgetContext.Provider>
  )
}

function BookingWidgetOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="booking-widget"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-neutral-950/85 backdrop-blur"
        >
          <div className="flex h-full w-full flex-col">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold-accent">King&apos;s Window Tint</p>
                <h3 className="text-lg font-semibold text-white md:text-xl">Build Your Window Tint Package</h3>
                <p className="hidden text-sm text-light-grey sm:block">
                  Your selections stay saved while you explore options.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white transition hover:bg-white/20"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="mx-auto w-full max-w-6xl px-3 py-6 sm:px-6 md:px-8">
                <WindowTintingBookingStepper />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
