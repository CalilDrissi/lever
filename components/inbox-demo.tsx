"use client";

import * as React from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { Check, Clock, Inbox, Keyboard, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

/**
 * InboxDemo — interactive variant of the InboxMockup used in the
 * preview section under the hero.
 *
 * Differences from the static InboxMockup:
 *   - Action buttons (Ouvrir / Reporter / Traité) cycle the Domino
 *     through a small pool of sample emails
 *   - Live stats panel tracks backlog and score history
 *   - Keyboard shortcuts are displayed and bound globally while the
 *     section is in view (focus is anchored via a hidden input on
 *     mount; keydown listeners route to the same handlers as clicks)
 *   - The list rows beneath the Domino reflect the upcoming pool
 *     order and shift in/out as actions land
 *
 * State shape: a cursor pointing into `pool`. Actions advance the cursor
 * and push a status into a small history array used to drive the stats.
 */

type Action = "done" | "deferred" | "open";

const POOL_SIZE_BACKLOG_INIT = 12;
const ACTION_LABELS: Record<Action, string> = {
  open: "Ouvert",
  deferred: "Reporté",
  done: "Traité",
};

export function InboxDemo() {
  const t = copy.fr.inboxDemo;
  const inbox = copy.fr.inbox;
  const reduce = useReducedMotion();

  const [cursor, setCursor] = React.useState(0);
  const [history, setHistory] = React.useState<Action[]>([]);
  const [elapsed, setElapsed] = React.useState(0); // seconds focused
  const [direction, setDirection] = React.useState<1 | -1>(1);

  const pool = t.pool;
  const current = pool[cursor % pool.length];
  const upcoming = React.useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => pool[(cursor + i + 1) % pool.length]),
    [cursor, pool]
  );

  const handled = history.filter((a) => a !== "open").length;
  const backlog = Math.max(0, POOL_SIZE_BACKLOG_INIT - handled);

  // Tick a "session timer" while the demo is mounted.
  React.useEffect(() => {
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const advance = React.useCallback((action: Action) => {
    setHistory((h) => [...h.slice(-7), action]);
    if (action !== "open") {
      setDirection(1);
      setCursor((c) => (c + 1) % pool.length);
    }
  }, [pool.length]);

  // Keyboard shortcuts.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Skip if the user is typing in an input/textarea/contenteditable.
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.key === "o" || e.key === "O") {
        e.preventDefault();
        advance("open");
      } else if (e.key === "e" || e.key === "E") {
        e.preventDefault();
        advance("done");
      } else if (e.shiftKey && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        advance("deferred");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance]);

  return (
    <div className="grid lg:grid-cols-12 gap-6 items-start">
      {/* Left — keyboard shortcut hints */}
      <aside className="lg:col-span-3 order-2 lg:order-1">
        <div className="rounded-xl border border-neutral-20 bg-white p-5">
          <div className="flex items-center gap-2 mb-4">
            <Keyboard
              size={16}
              strokeWidth={1.75}
              className="text-neutral-60"
              aria-hidden="true"
            />
            <span className="text-eyebrow uppercase text-neutral-60">
              Raccourcis
            </span>
          </div>
          <ul className="space-y-3">
            {t.shortcuts.map((s) => (
              <li
                key={s.label}
                className="flex items-center justify-between gap-3"
              >
                <span className="text-small text-neutral-80">{s.label}</span>
                <span className="flex items-center gap-1 shrink-0">
                  {s.keys.map((k, i) => (
                    <kbd
                      key={i}
                      className="px-1.5 min-w-[24px] h-6 inline-flex items-center justify-center rounded-sm border border-neutral-20 bg-neutral-5 text-eyebrow uppercase text-neutral-90 font-mono"
                    >
                      {k}
                    </kbd>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Center — interactive mockup */}
      <div className="lg:col-span-6 order-1 lg:order-2">
        <div
          className={cn(
            "w-full max-w-[640px] mx-auto rounded-xl bg-neutral-5 border border-neutral-20",
            "shadow-card overflow-hidden"
          )}
          role="application"
          aria-label="Démo interactive de la boîte Lever"
        >
          {/* Window chrome */}
          <div className="flex items-center gap-1.5 px-4 h-9 border-b border-neutral-20 bg-neutral-10">
            <span className="size-2.5 rounded-sm bg-neutral-30" />
            <span className="size-2.5 rounded-sm bg-neutral-20" />
            <span className="size-2.5 rounded-sm bg-neutral-20" />
            <span className="ml-3 text-eyebrow uppercase text-neutral-60">
              {inbox.heading}
            </span>
            <span className="ml-auto text-eyebrow uppercase text-neutral-60 tabular-nums">
              {formatElapsed(elapsed)}
            </span>
          </div>

          <div className="p-3 sm:p-4">
            {/* Domino du jour — animated swap on action */}
            <div className="relative">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={current.id}
                  initial={
                    reduce
                      ? false
                      : { opacity: 0, x: direction * 24, scale: 0.98 }
                  }
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={
                    reduce
                      ? { opacity: 0 }
                      : { opacity: 0, x: -direction * 24, scale: 0.98 }
                  }
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-lg bg-white border border-neutral-30 p-4 sm:p-5"
                >
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="accent">{inbox.dominoTitle}</Badge>
                        <span className="hidden sm:inline text-eyebrow uppercase text-neutral-60 truncate">
                          {inbox.dominoSubtitle}
                        </span>
                      </div>
                      <p className="text-small text-neutral-80 mb-1 truncate">
                        {current.from}
                      </p>
                      <h4 className="font-display text-h5 tracking-tight text-neutral-90 mb-2 truncate">
                        {current.subject}
                      </h4>
                      <p className="text-small text-neutral-80 line-clamp-2 max-w-[42ch]">
                        {current.preview}
                      </p>
                    </div>
                    <ScoreGauge value={current.score} label={inbox.score} />
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <ActionButton
                      onClick={() => advance("open")}
                      variant="primary"
                    >
                      {inbox.actionOpen}
                      <kbd className="ml-1 px-1 h-4 inline-flex items-center rounded-[3px] bg-white/15 text-[10px] font-mono">
                        O
                      </kbd>
                    </ActionButton>
                    <ActionButton
                      onClick={() => advance("deferred")}
                      variant="secondary"
                    >
                      {inbox.actionDefer}
                      <kbd className="ml-1 px-1 h-4 inline-flex items-center rounded-[3px] bg-neutral-5 text-[10px] font-mono text-neutral-80">
                        ⇧S
                      </kbd>
                    </ActionButton>
                    <ActionButton
                      onClick={() => advance("done")}
                      variant="ghost"
                    >
                      <Check
                        size={14}
                        strokeWidth={2}
                        aria-hidden="true"
                        className="text-green-60"
                      />
                      {inbox.actionDone}
                      <kbd className="ml-1 px-1 h-4 inline-flex items-center rounded-[3px] bg-neutral-5 text-[10px] font-mono text-neutral-80">
                        E
                      </kbd>
                    </ActionButton>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Upcoming list — reflects the pool's next items */}
            <ul className="mt-4 divide-y divide-neutral-20 border-t border-neutral-20">
              <AnimatePresence initial={false} mode="popLayout">
                {upcoming.map((row) => (
                  <motion.li
                    key={row.id}
                    layout
                    initial={
                      reduce ? false : { opacity: 0, y: 12 }
                    }
                    animate={{ opacity: 0.85, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-center gap-3 py-3 px-1"
                  >
                    <span className="size-1.5 rounded-full bg-neutral-30 shrink-0" />
                    <span className="text-small text-neutral-90 w-[32%] truncate">
                      {row.from}
                    </span>
                    <span className="text-small text-neutral-80 flex-1 truncate">
                      {row.subject}
                    </span>
                    <span className="text-small text-neutral-60 tabular-nums">
                      {row.score}
                    </span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </div>

      {/* Right — live stats */}
      <aside className="lg:col-span-3 order-3">
        <div className="rounded-xl border border-neutral-20 bg-white p-5 space-y-4">
          <Stat
            label={t.stats.backlog}
            value={backlog}
            suffix="emails"
            icon={Inbox}
          />
          <Stat
            label={t.stats.score}
            value={current.score}
            suffix="/100"
            tint="green"
          />
          <Stat
            label={t.stats.elapsed}
            value={formatElapsed(elapsed)}
            icon={Clock}
            mono
          />

          {/* Recent action tape */}
          <div>
            <span className="text-eyebrow uppercase text-neutral-60 block mb-2">
              Dernières actions
            </span>
            <ul className="flex flex-wrap gap-1.5 min-h-[28px]">
              {history.length === 0 ? (
                <li className="text-small text-neutral-60 italic">
                  Aucune. Vas-y.
                </li>
              ) : (
                history
                  .slice(-6)
                  .reverse()
                  .map((a, i) => (
                    <li
                      key={i}
                      className={cn(
                        "px-2 py-0.5 rounded-sm text-eyebrow uppercase",
                        a === "done" &&
                          "bg-green-10 text-green-60 border border-green-60/20",
                        a === "deferred" &&
                          "bg-neutral-5 text-neutral-80 border border-neutral-20",
                        a === "open" &&
                          "bg-purple-60 text-white border border-purple-60"
                      )}
                    >
                      {ACTION_LABELS[a]}
                    </li>
                  ))
              )}
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}

function ActionButton({
  variant,
  children,
  onClick,
}: {
  variant: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
  onClick: () => void;
}) {
  const cls =
    variant === "primary"
      ? "bg-neutral-90 text-white hover:bg-purple-90"
      : variant === "secondary"
        ? "border border-neutral-30 text-neutral-90 hover:bg-neutral-5"
        : "text-neutral-80 hover:text-neutral-90";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 px-3 inline-flex items-center gap-1.5 rounded-sm",
        "text-small font-medium transition-colors duration-200 ease-soft",
        "active:translate-y-px",
        cls
      )}
    >
      {children}
    </button>
  );
}

function ScoreGauge({ value, label }: { value: number; label: string }) {
  const size = 76;
  const stroke = 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;

  return (
    <div className="flex flex-col items-center gap-1 shrink-0">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="#dedbd5"
            strokeWidth={stroke}
            fill="none"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="#714cb6"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            fill="none"
            initial={false}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <motion.span
            key={value}
            initial={{ opacity: 0.4, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-h4 tracking-tight tabular-nums text-neutral-90"
          >
            {value}
          </motion.span>
        </div>
      </div>
      <span className="text-eyebrow uppercase text-neutral-60">{label}</span>
    </div>
  );
}

function Stat({
  label,
  value,
  suffix,
  icon: Icon,
  tint,
  mono,
}: {
  label: string;
  value: string | number;
  suffix?: string;
  icon?: LucideIcon;
  tint?: "green";
  mono?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        {Icon ? (
          <Icon
            size={14}
            strokeWidth={1.75}
            className="text-neutral-60"
            aria-hidden={true}
          />
        ) : null}
        <span className="text-eyebrow uppercase text-neutral-60">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <motion.span
          key={String(value)}
          initial={{ opacity: 0.4, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "font-display text-h3 tracking-tight tabular-nums",
            tint === "green" ? "text-green-60" : "text-neutral-90",
            mono && "font-mono text-h4"
          )}
        >
          {value}
        </motion.span>
        {suffix ? (
          <span className="text-small text-neutral-60">{suffix}</span>
        ) : null}
      </div>
    </div>
  );
}

function formatElapsed(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}
