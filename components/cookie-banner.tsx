"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

const CONSENT_KEY = "vl-cookie-consent";

const COPY = {
  fr: {
    text: "Nous utilisons des cookies pour améliorer votre expérience sur ce site.",
    accept: "Tout accepter",
    decline: "Tout refuser",
  },
  en: {
    text: "We use cookies to improve your experience on this site.",
    accept: "Accept all",
    decline: "Reject all",
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
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label={locale === "fr" ? "Consentement aux cookies" : "Cookie consent"}
          className="fixed bottom-0 inset-x-0 z-50 border-t border-neutral-20 bg-white/95 backdrop-blur-sm shadow-[0_-1px_0_rgba(41,40,39,0.04)]"
        >
          <div className="container py-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-small text-neutral-80 max-w-[56ch]">{t.text}</p>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => respond("declined")}
                className="h-9 px-4 rounded-sm border border-neutral-20 text-small font-medium text-neutral-80 hover:border-neutral-30 hover:text-neutral-90 transition-colors duration-200 ease-soft focus-visible:outline-none focus-visible:shadow-focus"
              >
                {t.decline}
              </button>
              <button
                type="button"
                onClick={() => respond("accepted")}
                className="h-9 px-4 rounded-sm bg-neutral-90 text-white text-small font-medium hover:bg-purple-90 transition-colors duration-200 ease-soft focus-visible:outline-none focus-visible:shadow-focus"
              >
                {t.accept}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
