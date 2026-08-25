"use client";

import * as React from "react";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

/**
 * ContactForm — posts to the /api/contact Cloudflare Pages Function, which
 * stores the submission as a `contactMessage` entry in Contentful. If the
 * endpoint is unavailable (e.g. local `next dev`), it falls back to a
 * pre-filled mailto so the form never dead-ends.
 */
export function ContactForm() {
  const domain = copy.fr.brand.domain;
  const to = `hello@${domain}`;
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "sent" | "error"
  >("idle");

  function mailtoFallback(name: string, email: string, message: string) {
    const subject = encodeURIComponent(`Contact — ${name || "Virtus Lever"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("sent");
      form.reset();
    } catch {
      mailtoFallback(name, email, message);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="name">Nom</Label>
          <Input id="name" name="name" autoComplete="name" required placeholder="Camille Durand" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="camille@atelier.fr"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Dis-nous en quelques lignes ce dont tu as besoin…"
          className="w-full rounded-sm bg-neutral-5 border border-neutral-20 px-3 py-2.5 text-body text-neutral-90 placeholder:text-neutral-60 transition-[border-color,box-shadow] duration-200 ease-soft hover:border-neutral-30 focus:outline-none focus:border-purple-60 focus:shadow-focus"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          variant="primary"
          size="md"
          className="rounded"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Envoi…" : "Envoyer"}
        </Button>
        <p
          className={cn(
            "text-small",
            status === "sent" ? "text-green-60" : "text-neutral-60"
          )}
          role="status"
        >
          {status === "sent"
            ? "Merci ! Ton message est bien parti — on te répond vite."
            : status === "error"
            ? "Ton client mail s'ouvre en secours — envoie-nous le message directement."
            : "Réponse sous un jour ouvré."}
        </p>
      </div>
    </form>
  );
}
