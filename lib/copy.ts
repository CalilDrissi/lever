/**
 * Centralized copy for Virtus Lever — French primary, tutoie, calm + direct.
 * English mirror provided for parity (UI not wired yet; ready for a locale switch).
 *
 * Tone rules:
 *   - tutoyer in French
 *   - short, direct sentences
 *   - no hype words ("révolutionnaire", "magique", "10x")
 *   - lowercase metrics where natural ("10 min/jour")
 */

export type Locale = "fr" | "en";

export const copy = {
  fr: {
    brand: {
      name: "Virtus Lever",
      domain: "virtuslever.com",
    },
    nav: {
      product: "Produit",
      pricing: "Tarifs",
      manifesto: "Manifeste",
      security: "Sécurité",
      login: "Se connecter",
      cta: "Essayer Lever",
    },
    hero: {
      eyebrow: "Cockpit de productivité — email",
      tagline: "Transforme ton inbox en 1 priorité claire par jour.",
      sub:
        "10 minutes par jour. -30% de backlog en deux semaines. " +
        "L'algorithme Domino trouve l'email à plus haut levier — tu fais le reste.",
      ctaPrimary: "Commencer — 14 jours offerts",
      ctaSecondary: "Voir une démo (90 sec)",
      microproof: "Sans carte bancaire · Gmail & Outlook",
    },
    inbox: {
      heading: "Boîte de réception",
      dominoTitle: "Domino du jour",
      dominoSubtitle: "L'email qui débloque le plus aujourd'hui",
      dominoFrom: "Camille — Atelier Verso",
      dominoSubject: "Devis signé — prochaines étapes",
      dominoPreview:
        "On valide le périmètre. Si tu confirmes avant vendredi, on cale le kickoff lundi…",
      score: "Score levier",
      scoreValue: 92,
      actionOpen: "Ouvrir",
      actionDefer: "Reporter",
      actionDone: "Traité",
      sampleRows: [
        { from: "Newsletter Stripe", subject: "Weekly digest", time: "08:42", muted: true },
        { from: "Léa Bernard",       subject: "Re: planning Q3",  time: "08:31", muted: false },
        { from: "GitHub",            subject: "3 PR en attente",   time: "08:12", muted: true },
        { from: "Karim Nadir",       subject: "Brief — page d'accueil", time: "07:58", muted: false },
      ],
    },
    trustedBy: {
      label: "Utilisé par des équipes chez",
      // Placeholders kept generic — swap once partners are confirmed.
      logos: ["Atelier Verso", "Maison Petit", "Studio Nord", "Ligne Claire", "Champ Libre", "Remue-Méninges"],
    },
    pillars: {
      heading: "Quatre leviers, un seul cockpit.",
      items: [
        {
          key: "domino",
          eyebrow: "Domino",
          title: "Un email. Le bon. Chaque jour.",
          body:
            "L'algorithme Domino combine Pareto et One Thing. " +
            "Il classe ta boîte par effet de levier et te désigne celui qui fait tomber les autres.",
          bullet: ["Score de 0 à 100", "Justification en une phrase", "Apprend de tes décisions"],
        },
        {
          key: "triage",
          eyebrow: "Triage",
          title: "Le bruit s'efface. Le signal reste.",
          body:
            "Newsletters, notifications, CC inutiles : groupés et silenciés. " +
            "Tu vois ce qui demande une décision, pas ce qui demande ton attention.",
          bullet: ["Regroupement automatique", "Règles en langage naturel", "Mode focus 10 min"],
        },
        {
          key: "followups",
          eyebrow: "Relances",
          title: "Rien ne tombe entre les mailles.",
          body:
            "Lever suit les fils sans réponse, propose des relances calibrées " +
            "et te rappelle au bon moment — pas avant.",
          bullet: ["Détection des fils en attente", "Brouillons générés", "Snooze contextuel"],
        },
        {
          key: "analytics",
          eyebrow: "Analytique",
          title: "Mesure ce qui compte, ignore le reste.",
          body:
            "Temps passé, backlog, taux de réponse, fils résolus. " +
            "Une vue hebdo, pas un dashboard de plus.",
          bullet: ["Backlog vs. capacité", "Heures de pointe", "Tendance à 4 semaines"],
        },
      ],
    },
    how: {
      heading: "Comment ça marche.",
      steps: [
        {
          n: "01",
          title: "Connecte ta boîte.",
          body: "Gmail ou Outlook. OAuth, lecture chiffrée, rien n'est stocké en clair.",
        },
        {
          n: "02",
          title: "Lever lit, classe, propose.",
          body: "L'algorithme Domino évalue chaque email et désigne ta priorité du jour.",
        },
        {
          n: "03",
          title: "Tu traites. 10 minutes.",
          body: "Tu fermes le Domino, puis le reste — ou pas. La fin de journée arrive plus vide.",
        },
      ],
    },
    manifesto: {
      eyebrow: "Manifeste",
      title:
        "Ton inbox n'est pas une to-do list. C'est un terrain de décisions.",
      body:
        "Nous croyons qu'un outil bien conçu te rend tes après-midis. " +
        "Lever ne t'aide pas à traiter plus d'emails — il t'aide à en traiter moins, mieux, plus tôt.",
    },
    security: {
      eyebrow: "Sécurité",
      title: "Tes emails restent les tiens.",
      body:
        "OAuth read-only par défaut. Chiffrement AES-256 au repos, TLS 1.3 en transit. " +
        "Tu peux exporter ou tout supprimer en une action.",
      points: [
        "OAuth Gmail / Microsoft 365",
        "Chiffrement AES-256 au repos",
        "TLS 1.3 en transit",
        "SOC 2 Type II en cours",
        "Hébergement UE — Francfort",
        "Suppression irréversible en 24 h",
      ],
    },
    faq: {
      heading: "Questions fréquentes.",
      items: [
        {
          q: "Comment l'algorithme Domino choisit-il ?",
          a:
            "Il croise trois signaux : qui t'écrit (poids relationnel), ce que tu fais habituellement de ce type d'email (pattern), " +
            "et l'effet en cascade — combien d'autres fils dépendent de cette réponse.",
        },
        {
          q: "Et si je n'ai pas le temps aujourd'hui ?",
          a:
            "Le Domino se reporte. Lever ne te culpabilise pas. Il te montre où tu en es, et reprend demain.",
        },
        {
          q: "Lever lit-il vraiment mes emails ?",
          a:
            "Lever analyse les métadonnées et le contenu nécessaire au scoring, en local quand c'est possible. " +
            "Aucun email n'est utilisé pour entraîner un modèle externe.",
        },
        {
          q: "Compatible avec Superhuman, Hey, Spark ?",
          a:
            "Lever fonctionne en surcouche de Gmail et Outlook. Tu peux garder ton client préféré et utiliser Lever pour le triage.",
        },
        {
          q: "Combien ça coûte ?",
          a:
            "Essai 14 jours, puis 18 € / mois. Annuel à 15 € / mois. Une seule offre, tout inclus.",
        },
      ],
    },
    finalCta: {
      title: "Une priorité par jour. Pendant deux semaines. Gratuit.",
      sub: "Tu verras la différence avant la fin de la semaine.",
      cta: "Commencer maintenant",
    },
    footer: {
      tagline: "Le levier d'Archimède, version inbox.",
      columns: [
        { heading: "Produit", links: ["Fonctionnalités", "Tarifs", "Changelog", "Sécurité"] },
        { heading: "Société", links: ["Manifeste", "À propos", "Contact"] },
        { heading: "Légal",   links: ["Confidentialité", "CGU", "DPA", "Sous-traitants"] },
      ],
      copyright: "© 2026 Virtus Lever — fait à Paris, calmement.",
    },
  },

  en: {
    brand: { name: "Virtus Lever", domain: "virtuslever.com" },
    nav: {
      product: "Product",
      pricing: "Pricing",
      manifesto: "Manifesto",
      security: "Security",
      login: "Sign in",
      cta: "Try Lever",
    },
    hero: {
      eyebrow: "Email productivity cockpit",
      tagline: "Turn your inbox into one clear priority a day.",
      sub:
        "10 minutes a day. −30% backlog in two weeks. " +
        "The Domino algorithm finds the highest-leverage email — you do the rest.",
      ctaPrimary: "Start free — 14 days",
      ctaSecondary: "Watch demo (90s)",
      microproof: "No credit card · Gmail & Outlook",
    },
    inbox: {
      heading: "Inbox",
      dominoTitle: "Today's Domino",
      dominoSubtitle: "The email that unblocks the most today",
      dominoFrom: "Camille — Atelier Verso",
      dominoSubject: "Signed quote — next steps",
      dominoPreview:
        "We're locking the scope. If you confirm by Friday, kickoff Monday…",
      score: "Leverage score",
      scoreValue: 92,
      actionOpen: "Open",
      actionDefer: "Defer",
      actionDone: "Done",
      sampleRows: [
        { from: "Stripe Newsletter", subject: "Weekly digest", time: "08:42", muted: true },
        { from: "Léa Bernard",       subject: "Re: Q3 planning", time: "08:31", muted: false },
        { from: "GitHub",            subject: "3 PRs awaiting", time: "08:12", muted: true },
        { from: "Karim Nadir",       subject: "Brief — homepage", time: "07:58", muted: false },
      ],
    },
    trustedBy: {
      label: "Used by teams at",
      logos: ["Atelier Verso", "Maison Petit", "Studio Nord", "Ligne Claire", "Champ Libre", "Remue-Méninges"],
    },
    pillars: {
      heading: "Four levers, one cockpit.",
      items: [
        { key: "domino",    eyebrow: "Domino",     title: "One email. The right one. Every day.", body: "", bullet: [] },
        { key: "triage",    eyebrow: "Triage",     title: "Noise fades. Signal stays.",            body: "", bullet: [] },
        { key: "followups", eyebrow: "Follow-ups", title: "Nothing slips through.",                body: "", bullet: [] },
        { key: "analytics", eyebrow: "Analytics",  title: "Measure what matters.",                 body: "", bullet: [] },
      ],
    },
    how: {
      heading: "How it works.",
      steps: [
        { n: "01", title: "Connect your inbox.",        body: "Gmail or Outlook. OAuth, encrypted." },
        { n: "02", title: "Lever reads, ranks, picks.", body: "The Domino algorithm chooses your priority." },
        { n: "03", title: "You handle it. 10 minutes.", body: "End the day lighter — or don't. Up to you." },
      ],
    },
    manifesto: {
      eyebrow: "Manifesto",
      title: "Your inbox isn't a to-do list. It's a decision arena.",
      body: "We believe a well-built tool gives back your afternoons. Lever doesn't help you do more email — it helps you do less, better, sooner.",
    },
    security: {
      eyebrow: "Security",
      title: "Your emails stay yours.",
      body: "OAuth read-only by default. AES-256 at rest, TLS 1.3 in transit. Export or delete everything in one action.",
      points: ["OAuth Gmail / Microsoft 365", "AES-256 at rest", "TLS 1.3 in transit", "SOC 2 Type II in progress", "EU hosting — Frankfurt", "Hard delete in 24h"],
    },
    faq: {
      heading: "FAQ.",
      items: [
        { q: "How does the Domino algorithm choose?", a: "It crosses three signals: who's writing, what you usually do with this kind of email, and downstream impact." },
        { q: "What if I don't have time today?",       a: "The Domino rolls forward. Lever doesn't shame you. It picks up tomorrow." },
        { q: "Does Lever read my emails?",             a: "It analyzes what's needed for scoring. Nothing trains an external model." },
        { q: "Compatible with Superhuman, Hey, Spark?", a: "Lever sits over Gmail and Outlook. Keep your client, let Lever triage." },
        { q: "How much?",                                a: "14-day trial, then €18/month (€15 annual). One plan, everything included." },
      ],
    },
    finalCta: {
      title: "One priority a day. For two weeks. Free.",
      sub: "You'll feel the difference before the week ends.",
      cta: "Start now",
    },
    footer: {
      tagline: "Archimedes' lever, inbox edition.",
      columns: [
        { heading: "Product", links: ["Features", "Pricing", "Changelog", "Security"] },
        { heading: "Company", links: ["Manifesto", "About", "Contact"] },
        { heading: "Legal",   links: ["Privacy", "Terms", "DPA", "Subprocessors"] },
      ],
      copyright: "© 2026 Virtus Lever — built in Paris, quietly.",
    },
  },
} as const;

export type Copy = typeof copy.fr;
