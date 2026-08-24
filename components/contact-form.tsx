"use client";

import * as React from "react";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { copy } from "@/lib/copy";

/**
 * ContactForm — styled contact form.
 *
 * TODO(contentful): wire submission to Contentful. Replace the mailto
 * fallback in `handleSubmit` with a POST to the Contentful-backed endpoint
 * (or a Cloudflare Pages Function that forwards to the Contentful
 * Management API). Until then, submitting composes a pre-filled email to
 * hello@<domain> via the visitor's mail client — no backend required, so
 * it works on the static export as-is.
 */
export function ContactForm() {
  const domain = copy.fr.brand.domain;
  const to = `hello@${domain}`;
  const [sent, setSent] = React.useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = encodeURIComponent(`Contact — ${name || "Virtus Lever"}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}\n${email}`
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setSent(true);
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
        <Button type="submit" variant="primary" size="md" className="rounded">
          Envoyer
        </Button>
        <p className="text-small text-neutral-60">
          {sent
            ? "Ton client mail s'ouvre — vérifie qu'il a bien pré-rempli le message."
            : "Réponse sous un jour ouvré."}
        </p>
      </div>
    </form>
  );
}
