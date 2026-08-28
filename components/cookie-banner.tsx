"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

const CONSENT_KEY = "vl-cookie-consent";

const COPY = {
  fr: {
    text: "Nous utilisons des cookies pour améliorer votre expérience.",
    accept: "Accepter",
    decline: "Refuser",
  },
  en: {
    text: "We use cookies to improve your experience.",
    accept: "Accept",
    decline: "Decline",
  },
};

export function CookieBanner() {
  const [visible, setVisible] = React.useState(false);
  const [locale, setLocale] = React.useState<"en" | "fr">("en");

  React.useEffect(() => {
    setLocale(window.location.pathname.startsWith("/fr") ? "fr" : "en");
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
    } catch {
      // private browsing / storage disabled
    }
  }, []);

  function respond(value: "accepted" | "declined") {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {}
    setVisible(false);
  }

  const t = COPY[locale];

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-4 sm:bottom-6 inset-x-0 z-50 flex justify-center px-3 pointer-events-none">
          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label={locale === "fr" ? "Consentement aux cookies" : "Cookie consent"}
            className="pointer-events-auto rounded-full bg-white/95 backdrop-blur-md border border-neutral-20 shadow-[0_2px_0_rgba(41,40,39,0.04),_0_8px_24px_-12px_rgba(41,40,39,0.18)] h-14 px-2 pl-5 flex items-center gap-3 sm:gap-4"
          >
            <p className="text-small font-medium text-neutral-80 whitespace-nowrap">
              {t.text}
            </p>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => respond("declined")}
                className="h-9 px-4 rounded-full border border-neutral-20 text-small font-medium text-neutral-70 hover:border-neutral-30 hover:text-neutral-90 transition-colors duration-200 focus-visible:outline-none focus-visible:shadow-focus"
              >
                {t.decline}
              </button>
              <button
                type="button"
                onClick={() => respond("accepted")}
                className="h-9 px-4 rounded-full bg-neutral-90 text-white text-small font-medium hover:bg-purple-90 transition-colors duration-200 focus-visible:outline-none focus-visible:shadow-focus"
              >
                {t.accept}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
