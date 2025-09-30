'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WindowTintingBookingStepper } from 'acme-booking-stepper-full-ui';
import KingsButton from '@/components/ui/kings-button';

export default function InlineBookingCta() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const toggle = () => {
    setIsOpen(prev => !prev);
    setHasInteracted(true);
  };

  useEffect(() => {
    if (!isOpen) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  return (
    <section className="py-6 md:py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-white">Curious what window tint will cost?</h3>
              <p className="text-light-grey text-sm md:text-base mt-1 max-w-2xl">
                Tap below to build your package, see real pricing, and lock in your appointment without leaving the page.
              </p>
            </div>
            <KingsButton variant="gold" onClick={toggle} className="px-5 py-3 text-sm md:text-base">
              {isOpen ? 'Hide Booking Flow' : 'Window Tint Pricing'}
            </KingsButton>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="booking-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-neutral-950"
          >
            <div className="flex h-full w-full flex-col">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-gold-accent">King's Window Tint</p>
                  <h3 className="text-lg md:text-xl font-semibold text-white">Build Your Window Tint Package</h3>
                  <p className="text-sm text-light-grey hidden sm:block">Your selections stay saved while you explore options.</p>
                </div>
                <button
                  onClick={toggle}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white hover:bg-white/20"
                >
                  Close
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="mx-auto w-full max-w-6xl px-3 sm:px-6 md:px-8 py-6">
                  <WindowTintingBookingStepper />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && hasInteracted && (
        <div className="mt-3 text-center">
          <p className="text-xs text-muted-foreground">Your selections are saved—reopen anytime to continue.</p>
        </div>
      )}
    </section>
  );
}
