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
      blog: "Blog",
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
      microproof: "Sans carte bancaire · Compatible avec toutes les boîtes",
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
    inboxDemo: {
      eyebrow: "Démo interactive",
      title: "Essaie le triage. Pas de carte. Pas d'inscription.",
      sub:
        "Clique sur les actions ci-dessous : Lever sort le Domino traité, " +
        "remonte le suivant, et les compteurs s'ajustent en temps réel.",
      shortcuts: [
        { keys: ["O"],     label: "Ouvrir le Domino" },
        { keys: ["E"],     label: "Marquer comme traité" },
        { keys: ["⇧", "S"], label: "Reporter à demain" },
        { keys: ["⌘", "K"], label: "Recherche partout" },
      ],
      stats: {
        backlog: "Backlog",
        score: "Score levier",
        elapsed: "Temps écoulé",
      },
      // Pool of dominos that cycle as the user acts. Each domino brings
      // its own neighbours so the list under it shifts too.
      pool: [
        {
          id: "atelier-verso",
          from: "Camille — Atelier Verso",
          subject: "Devis signé — prochaines étapes",
          preview:
            "On valide le périmètre. Si tu confirmes avant vendredi, on cale le kickoff lundi…",
          score: 92,
        },
        {
          id: "lea-bernard",
          from: "Léa Bernard",
          subject: "Re: planning Q3 — décision attendue",
          preview:
            "Trois pistes possibles. Ton arbitrage débloque deux personnes côté studio.",
          score: 88,
        },
        {
          id: "karim-nadir",
          from: "Karim Nadir",
          subject: "Brief — page d'accueil v2",
          preview:
            "Le brief est prêt. Si tu valides avant demain, on tient la livraison.",
          score: 81,
        },
        {
          id: "fanny-doc",
          from: "Fanny Bouvier",
          subject: "Contrat — relecture finale",
          preview:
            "Deux ajustements de wording. À signer avant la fin de semaine si OK.",
          score: 78,
        },
      ],
    },
    providers: {
      // Provider marquee shown directly under the hero — visual proof that
      // Lever connects to every common inbox. Logos render in their real
      // brand colors (Wikimedia Commons + simple-icons, rasterized via
      // .tmp/build-providers.mjs into /public/logos/).
      label: "Connecte ta boîte en 30 secondes",
      list: [
        { name: "Gmail",        file: "/logos/gmail.png"   },
        { name: "Outlook",      file: "/logos/outlook.png" },
        { name: "Apple iCloud", file: "/logos/icloud.png"  },
        { name: "Proton Mail",  file: "/logos/proton.png"  },
        { name: "HEY",          file: "/logos/hey.png"     },
        { name: "Zoho Mail",    file: "/logos/zoho.png"    },
      ],
    },
    compatibility: {
      eyebrow: "Sécurité & compatibilité",
      title: "Compatible avec toutes tes boîtes.",
      sub:
        "Lever ne dépend d'aucun fournisseur. Connecte ton client favori " +
        "en lecture seule — l'algorithme Domino fait le reste.",
      // Generic feature pills shown beneath the headline. No specific
      // provider names — the section celebrates universal compatibility.
      pills: [
        { label: "OAuth standard",     icon: "key" },
        { label: "IMAP & SMTP",        icon: "server" },
        { label: "API officielles",    icon: "plug" },
        { label: "Tous fournisseurs",  icon: "infinity" },
      ],
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
    showcase: {
      eyebrow: "Pour qui",
      heading: "Pour celles et ceux qui décident, pas qui répondent.",
      sub:
        "Lever a été pensé pour trois usages quotidiens. " +
        "Le même cockpit, des angles différents.",
      cards: [
        {
          key: "focus",
          tag: "Focus solo",
          title: "Une session de 10 minutes, le matin.",
          body:
            "Tu ouvres Lever, tu vois le Domino, tu décides. " +
            "Le reste attendra l'après-midi — ou demain.",
          href: "/blog/rituel-matin-inbox",
        },
        {
          key: "desk",
          tag: "Travail profond",
          title: "Protéger les blocs de concentration.",
          body:
            "Lever met en sourdine les newsletters, les notifications " +
            "et les CC inutiles. Tu reviens à un inbox lisible.",
          href: "/blog/deep-work",
        },
        {
          key: "team",
          tag: "Petites équipes",
          title: "Des décisions partagées, sans réunion.",
          body:
            "Marque un fil comme « en attente de Karim » : Lever te rappelle " +
            "au bon moment, et propose la relance.",
          href: "/blog/communication-asynchrone",
        },
      ],
    },
    how: {
      heading: "Comment ça marche.",
      steps: [
        {
          n: "01",
          title: "Connecte ta boîte.",
          body: "Quel que soit ton fournisseur. OAuth, lecture chiffrée, rien n'est stocké en clair.",
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
        "OAuth standard, tous fournisseurs",
        "Chiffrement AES-256 au repos",
        "TLS 1.3 en transit",
        "SOC 2 Type II en cours",
        "Hébergement UE — Francfort",
        "Suppression irréversible en 24 h",
      ],
    },
    pricing: {
      eyebrow: "Tarifs",
      title: "Deux offres. Zéro surprise.",
      sub:
        "Essai 14 jours, sans carte. Choisis le rythme qui t'arrange — " +
        "tu peux changer ou annuler à tout moment.",
      // Two billing modes — the section toggles between them.
      monthly: {
        label: "Mensuel",
        savings: null as string | null,
      },
      annual: {
        label: "Annuel",
        savings: "−17 %",
      },
      microproof: "Pas de carte bancaire. Annulation en un clic.",
      includes: "Inclus dans cette offre :",
      trust: [
        "OAuth read-only",
        "AES-256",
        "TLS 1.3",
        "Hébergement UE",
      ],
      plans: [
        {
          key: "lever",
          name: "Lever",
          tagline: "Le cockpit complet pour ta boîte.",
          featured: true,
          highlightLabel: "Recommandé",
          monthlyPrice: 18,
          annualPrice: 15,
          unit: "€",
          cadence: "/ mois",
          monthlyNote: "facturé chaque mois",
          annualNote: "facturé 180 € / an",
          cta: "Commencer l'essai — 14 jours",
          features: [
            "Algorithme Domino — l'email à plus haut levier, chaque jour",
            "Triage automatique : newsletters, notifications, CC silenciés",
            "Relances calibrées et brouillons générés",
            "Analytique hebdo — backlog, capacité, fils résolus",
            "Compatible avec toutes les boîtes (OAuth, IMAP, API)",
            "Support FR/EN sous 24 h en jour ouvré",
          ],
        },
        {
          key: "enterprise",
          name: "Enterprise",
          tagline: "Pour les équipes qui exigent plus.",
          featured: false,
          highlightLabel: null,
          // Custom-price plan — billing toggle is ignored; the price block
          // shows a label instead of a number.
          customLabel: "Sur mesure",
          customSub: "à partir de 12 € / mois / siège",
          cta: "Parler à l'équipe",
          features: [
            "Tout ce qu'il y a dans Lever",
            "SSO / SAML, SCIM provisioning",
            "Audit logs et politiques de rétention",
            "Hébergement dédié, région au choix",
            "Support prioritaire 24/7",
            "DPA, SLA et contrats personnalisés",
          ],
        },
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
            "Lever fonctionne en surcouche de ton client email — quel qu'il soit. Tu peux garder ton client préféré et utiliser Lever pour le triage.",
        },
        {
          q: "Combien ça coûte ?",
          a:
            "Free pour tester, puis Founding à 7 € / mois (offre de lancement · 200 places), Pro à 12 € / mois, Power à 19 € / mois. Annuel disponible sur Pro et Power. Team/Enterprise sur devis.",
        },
      ],
    },
    resources: {
      eyebrow: "Ressources",
      title: "La productivité, en clair.",
      sub: "Des approches qui inspirent Lever — expliquées en quelques minutes.",
      videos: [
        {
          id: "ZxWjNJSXpi4",
          topic: "Prioriser",
          title: "La matrice d'Eisenhower",
          blurb: "Urgent ou important ? Trie tes tâches selon les deux axes qui comptent.",
        },
        {
          id: "gvLiTG3Webg",
          topic: "Concentrer l'effort",
          title: "La loi de Pareto (80/20)",
          blurb: "20 % de tes actions produisent 80 % des résultats. Le cœur du levier.",
        },
        {
          id: "zsf0nDtH0UU",
          topic: "Une seule chose",
          title: "The One Thing",
          blurb: "La tâche domino : celle qui, une fois faite, simplifie tout le reste.",
        },
        {
          id: "idNGjollSQM",
          topic: "S'organiser",
          title: "La méthode GTD",
          blurb: "Vide ta tête, capture tout, concentre-toi sur ce qui compte vraiment.",
        },
        {
          id: "NWUKtyuSPnM",
          topic: "Concentration",
          title: "Deep Work",
          blurb: "La concentration profonde comme avantage concurrentiel dans un monde de distractions.",
        },
        {
          id: "WX-D9WKgZXk",
          topic: "Inbox zéro",
          title: "Traiter tous ses mails",
          blurb: "30 minutes par jour pour atteindre zéro email — et le tenir.",
        },
      ],
    },
    finalCta: {
      eyebrow: "Essai gratuit · 14 jours",
      title: "Une priorité par jour. Pendant deux semaines. Gratuit.",
      sub:
        "Pas de carte bancaire. Pas de tunnel d'onboarding. " +
        "Tu connectes ta boîte, et l'après-midi qui suit te paraît plus long.",
      cta: "Commencer maintenant",
      ctaSecondary: "Parler à l'équipe",
      stats: [
        { value: "10", unit: "min/jour", label: "de triage" },
        { value: "−30", unit: "%", label: "de backlog en 2 semaines" },
        { value: "92", unit: "/100", label: "score levier moyen" },
      ],
    },
    newsletter: {
      eyebrow: "Lettre Lever",
      title: "Une lettre par mois. Aucune notification.",
      sub:
        "Outils, idées et expériences pour une boîte plus calme. " +
        "Tu te désabonnes en un clic — la confiance compte plus que la liste.",
      placeholder: "ton@adresse.com",
      cta: "S'inscrire",
      microproof: "1 200 lecteurs · zéro spam · jamais revendu",
    },
    footer: {
      tagline: "Le levier d'Archimède, version inbox.",
      pitch: "Une priorité par jour. Pendant deux semaines. Gratuit.",
      cta: "Commencer",
      columns: [
        { heading: "Produit", links: [
          { label: "Fonctionnalités", href: "/#product" },
          { label: "Tarifs",          href: "/#pricing" },
          { label: "Changelog",       href: "/changelog" },
          { label: "Sécurité",        href: "/#security" },
        ] },
        { heading: "Société", links: [
          { label: "Manifeste", href: "/#manifesto" },
          { label: "Blog",      href: "/blog" },
          { label: "À propos",  href: "/about" },
          { label: "Contact",   href: "/contact" },
        ] },
        { heading: "Légal", links: [
          { label: "Confidentialité", href: "/privacy" },
          { label: "CGU",             href: "/terms" },
          { label: "DPA",             href: "/dpa" },
          { label: "Sous-traitants",  href: "/subprocessors" },
        ] },
      ],
      copyright: "© 2026 Virtus Lever — Made in France.",
    },
  },

  en: {
    brand: { name: "Virtus Lever", domain: "virtuslever.com" },
    nav: {
      product: "Product",
      pricing: "Pricing",
      manifesto: "Manifesto",
      security: "Security",
      blog: "Blog",
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
      microproof: "No credit card · Works with every inbox",
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
    inboxDemo: {
      eyebrow: "Interactive demo",
      title: "Try the triage. No card. No signup.",
      sub:
        "Click the actions below: Lever surfaces the handled Domino, " +
        "promotes the next one, and the counters adjust in real time.",
      shortcuts: [
        { keys: ["O"],     label: "Open the Domino" },
        { keys: ["E"],     label: "Mark as done" },
        { keys: ["⇧", "S"], label: "Defer to tomorrow" },
        { keys: ["⌘", "K"], label: "Search everywhere" },
      ],
      stats: {
        backlog: "Backlog",
        score: "Leverage score",
        elapsed: "Time spent",
      },
      pool: [
        {
          id: "atelier-verso",
          from: "Camille — Atelier Verso",
          subject: "Signed quote — next steps",
          preview:
            "We're locking the scope. If you confirm by Friday, kickoff Monday…",
          score: 92,
        },
        {
          id: "lea-bernard",
          from: "Léa Bernard",
          subject: "Re: Q3 planning — decision needed",
          preview:
            "Three options on the table. Your call unblocks two people on the studio side.",
          score: 88,
        },
        {
          id: "karim-nadir",
          from: "Karim Nadir",
          subject: "Brief — homepage v2",
          preview:
            "Brief is ready. If you sign off before tomorrow, we hold the delivery date.",
          score: 81,
        },
        {
          id: "fanny-doc",
          from: "Fanny Bouvier",
          subject: "Contract — final review",
          preview:
            "Two wording tweaks. Sign-off needed before end of week if OK.",
          score: 78,
        },
      ],
    },
    providers: {
      label: "Connect your inbox in 30 seconds",
      list: [
        { name: "Gmail",        file: "/logos/gmail.png"   },
        { name: "Outlook",      file: "/logos/outlook.png" },
        { name: "Apple iCloud", file: "/logos/icloud.png"  },
        { name: "Proton Mail",  file: "/logos/proton.png"  },
        { name: "HEY",          file: "/logos/hey.png"     },
        { name: "Zoho Mail",    file: "/logos/zoho.png"    },
      ],
    },
    compatibility: {
      eyebrow: "Security & compatibility",
      title: "Works with every inbox.",
      sub:
        "Lever isn't tied to any provider. Connect your favourite client " +
        "read-only — the Domino algorithm does the rest.",
      pills: [
        { label: "OAuth standard", icon: "key" },
        { label: "IMAP & SMTP",    icon: "server" },
        { label: "Official APIs",  icon: "plug" },
        { label: "All providers",  icon: "infinity" },
      ],
    },
    trustedBy: {
      label: "Used by teams at",
      logos: ["Atelier Verso", "Maison Petit", "Studio Nord", "Ligne Claire", "Champ Libre", "Remue-Méninges"],
    },
    pillars: {
      heading: "Four levers, one cockpit.",
      items: [
        {
          key: "domino",
          eyebrow: "Domino",
          title: "One email. The right one. Every day.",
          body:
            "The Domino algorithm combines Pareto and The One Thing. " +
            "It ranks your inbox by leverage and surfaces the one email that unblocks the rest.",
          bullet: ["Score 0–100", "One-sentence rationale", "Learns from your decisions"],
        },
        {
          key: "triage",
          eyebrow: "Triage",
          title: "Noise fades. Signal stays.",
          body:
            "Newsletters, notifications, pointless CCs: grouped and silenced. " +
            "You see what needs a decision, not what demands attention.",
          bullet: ["Auto-grouping", "Natural-language rules", "10-min focus mode"],
        },
        {
          key: "followups",
          eyebrow: "Follow-ups",
          title: "Nothing slips through.",
          body:
            "Lever tracks unanswered threads, suggests calibrated follow-ups, " +
            "and reminds you at the right moment — not before.",
          bullet: ["Pending thread detection", "Generated drafts", "Contextual snooze"],
        },
        {
          key: "analytics",
          eyebrow: "Analytics",
          title: "Measure what matters, ignore the rest.",
          body:
            "Time spent, backlog, reply rate, resolved threads. " +
            "A weekly view — not another dashboard.",
          bullet: ["Backlog vs. capacity", "Peak hours", "4-week trend"],
        },
      ],
    },
    showcase: {
      eyebrow: "Who it's for",
      heading: "For people who decide, not just respond.",
      sub:
        "Lever was built for three daily use cases. " +
        "Same cockpit, different angles.",
      cards: [
        {
          key: "focus",
          tag: "Solo focus",
          title: "A 10-minute session, every morning.",
          body:
            "Open Lever, see the Domino, decide. " +
            "The rest waits for the afternoon — or tomorrow.",
          href: "/blog/the-domino-method",
        },
        {
          key: "desk",
          tag: "Deep work",
          title: "Protect your concentration blocks.",
          body:
            "Lever mutes newsletters, notifications " +
            "and pointless CCs. You come back to a readable inbox.",
          href: "/blog/email-overload",
        },
        {
          key: "team",
          tag: "Small teams",
          title: "Shared decisions, no meetings.",
          body:
            "Flag a thread as 'waiting on Karim': Lever reminds you " +
            "at the right time and suggests the follow-up.",
          href: "/blog/inbox-zero-vs-inbox-one",
        },
      ],
    },
    how: {
      heading: "How it works.",
      steps: [
        {
          n: "01",
          title: "Connect your inbox.",
          body: "Any provider. OAuth, encrypted reads, nothing stored in plain text.",
        },
        {
          n: "02",
          title: "Lever reads, ranks, picks.",
          body: "The Domino algorithm scores every email and names your priority for the day.",
        },
        {
          n: "03",
          title: "You handle it. 10 minutes.",
          body: "Close the Domino, then the rest — or not. The end of day arrives lighter.",
        },
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
      points: [
        "OAuth standard, all providers",
        "AES-256 at rest",
        "TLS 1.3 in transit",
        "SOC 2 Type II in progress",
        "EU hosting — Frankfurt",
        "Hard delete in 24 h",
      ],
    },
    pricing: {
      eyebrow: "Pricing",
      title: "Two plans. No surprises.",
      sub:
        "14-day trial, no card required. Pick the cadence that suits you — " +
        "switch or cancel anytime.",
      monthly: {
        label: "Monthly",
        savings: null as string | null,
      },
      annual: {
        label: "Annual",
        savings: "−17%",
      },
      microproof: "No credit card. Cancel in one click.",
      includes: "What's included:",
      trust: [
        "OAuth read-only",
        "AES-256",
        "TLS 1.3",
        "EU hosting",
      ],
      plans: [
        {
          key: "lever",
          name: "Lever",
          tagline: "The full cockpit for your inbox.",
          featured: true,
          highlightLabel: "Recommended",
          monthlyPrice: 18,
          annualPrice: 15,
          unit: "€",
          cadence: "/ month",
          monthlyNote: "billed monthly",
          annualNote: "billed €180 / year",
          cta: "Start trial — 14 days",
          features: [
            "Domino algorithm — highest-leverage email, every day",
            "Auto-triage: newsletters, notifications, CCs silenced",
            "Calibrated follow-ups and generated drafts",
            "Weekly analytics — backlog, capacity, resolved threads",
            "Works with every inbox (OAuth, IMAP, API)",
            "EN/FR support within 24 h on business days",
          ],
        },
        {
          key: "enterprise",
          name: "Enterprise",
          tagline: "For teams that demand more.",
          featured: false,
          highlightLabel: null,
          customLabel: "Custom pricing",
          customSub: "from €12 / month / seat",
          cta: "Talk to the team",
          features: [
            "Everything in Lever",
            "SSO / SAML, SCIM provisioning",
            "Audit logs and retention policies",
            "Dedicated hosting, region of choice",
            "Priority 24/7 support",
            "DPA, SLA and custom contracts",
          ],
        },
      ],
    },
    faq: {
      heading: "FAQ.",
      items: [
        { q: "How does the Domino algorithm choose?", a: "It crosses three signals: who's writing (relational weight), what you usually do with this kind of email (pattern), and the cascade effect — how many other threads depend on this reply." },
        { q: "What if I don't have time today?",       a: "The Domino rolls forward. Lever doesn't shame you. It shows you where you stand and picks up tomorrow." },
        { q: "Does Lever read my emails?",             a: "Lever analyses the metadata and content needed for scoring, locally when possible. No email is used to train an external model." },
        { q: "Compatible with Superhuman, Hey, Spark?", a: "Lever sits over your email client — whichever it is. Keep your favourite client and use Lever for triage." },
        { q: "How much does it cost?",                  a: "Free to try, then Founding at €7/month (launch offer · 200 seats), Pro at €12/month, Power at €19/month. Annual available on Pro and Power. Team/Enterprise on request." },
      ],
    },
    resources: {
      eyebrow: "Resources",
      title: "Productivity, clearly explained.",
      sub: "Approaches that inspire Lever — explained in a few minutes.",
      videos: [
        {
          id: "tT89OZ7TNwc",
          topic: "Prioritise",
          title: "The Eisenhower Matrix",
          blurb: "Urgent or important? Sort your tasks along the two axes that count.",
        },
        {
          id: "Wxnv5PspT7E",
          topic: "Focus effort",
          title: "The Pareto Principle (80/20)",
          blurb: "20% of your actions produce 80% of results. The core of leverage.",
        },
        {
          id: "CuD3KVRQM_o",
          topic: "One thing",
          title: "The One Thing",
          blurb: "The domino task: the one that, once done, makes everything else easier.",
        },
        {
          id: "gCswMsONkwY",
          topic: "Organise",
          title: "Getting Things Done (GTD)",
          blurb: "Clear your head, capture everything, focus only on what matters now.",
        },
        {
          id: "d66815uVerk",
          topic: "Deep focus",
          title: "Deep Work",
          blurb: "Distraction-free concentration as a competitive advantage.",
        },
        {
          id: "uXdEVeoGRRc",
          topic: "Clear inbox",
          title: "Inbox Zero in practice",
          blurb: "30 minutes a day to reach zero emails — and keep it that way.",
        },
      ],
    },
    finalCta: {
      eyebrow: "Free trial · 14 days",
      title: "One priority a day. For two weeks. Free.",
      sub:
        "No credit card. No onboarding tunnel. " +
        "Connect your inbox, and the afternoon that follows feels longer.",
      cta: "Start now",
      ctaSecondary: "Talk to the team",
      stats: [
        { value: "10", unit: "min/day", label: "of triage" },
        { value: "−30", unit: "%", label: "backlog in 2 weeks" },
        { value: "92", unit: "/100", label: "average leverage score" },
      ],
    },
    newsletter: {
      eyebrow: "Lever Letter",
      title: "One letter a month. No notifications.",
      sub:
        "Tools, ideas and experiments for a calmer inbox. " +
        "Unsubscribe in one click — trust matters more than list size.",
      placeholder: "your@email.com",
      cta: "Subscribe",
      microproof: "1,200 readers · zero spam · never sold",
    },
    footer: {
      tagline: "Archimedes' lever, inbox edition.",
      pitch: "One clear priority a day. Two weeks free.",
      cta: "Get started",
      columns: [
        { heading: "Product", links: [
          { label: "Features",  href: "/#product" },
          { label: "Pricing",   href: "/#pricing" },
          { label: "Changelog", href: "/changelog" },
          { label: "Security",  href: "/#security" },
        ] },
        { heading: "Company", links: [
          { label: "Manifesto", href: "/#manifesto" },
          { label: "Blog",      href: "/blog" },
          { label: "About",     href: "/about" },
          { label: "Contact",   href: "/contact" },
        ] },
        { heading: "Legal", links: [
          { label: "Privacy",       href: "/privacy" },
          { label: "Terms",         href: "/terms" },
          { label: "DPA",           href: "/dpa" },
          { label: "Subprocessors", href: "/subprocessors" },
        ] },
      ],
      copyright: "© 2026 Virtus Lever — built in Paris, quietly.",
    },
  },
} as const;

export type Copy = typeof copy.fr;
