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
    } catch {}
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
        /* Outer: full-width on mobile, centred on sm+ */
        <div className="fixed bottom-0 sm:bottom-6 inset-x-0 z-50 flex justify-center sm:px-3 pointer-events-none">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label={locale === "fr" ? "Consentement aux cookies" : "Cookie consent"}
            className={[
              "pointer-events-auto w-full sm:w-auto",
              /* Mobile: card rising from bottom edge */
              "rounded-t-2xl border-t border-x sm:border",
              "p-4 sm:p-0",
              "flex flex-col sm:flex-row sm:items-center",
              "gap-3 sm:gap-4",
              "sm:rounded-full sm:h-14 sm:pl-5 sm:pr-2",
              /* Shared visual style matching the nav pill */
              "bg-white/95 backdrop-blur-md border-neutral-20",
              "shadow-[0_-2px_0_rgba(41,40,39,0.03),_0_-8px_24px_-12px_rgba(41,40,39,0.10)]",
              "sm:shadow-[0_2px_0_rgba(41,40,39,0.04),_0_8px_24px_-12px_rgba(41,40,39,0.18)]",
            ].join(" ")}
          >
            <p className="text-small font-medium text-neutral-80">
              {t.text}
            </p>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => respond("declined")}
                className="flex-1 sm:flex-none h-9 px-4 rounded-full border border-neutral-20 text-small font-medium text-neutral-70 hover:border-neutral-30 hover:text-neutral-90 transition-colors duration-200 focus-visible:outline-none focus-visible:shadow-focus"
              >
                {t.decline}
              </button>
              <button
                type="button"
                onClick={() => respond("accepted")}
                className="flex-1 sm:flex-none h-9 px-4 rounded-full bg-neutral-90 text-white text-small font-medium hover:bg-purple-90 transition-colors duration-200 focus-visible:outline-none focus-visible:shadow-focus"
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
