const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
const cvModal = document.getElementById("cvModal");
const openCvBtn = document.getElementById("openCvBtn");
const cvFrame = cvModal?.querySelector(".cvModal__frame");
const topbar = document.querySelector(".topbar");
let currentMediaLightboxKey = null;

// Cookie handling is now managed by TermsFeed Cookie Consent (script in head)
// No custom cookie logic needed

menuBtn?.addEventListener("click", () => {
  const isHidden = mobileNav?.hasAttribute("hidden");
  if (!mobileNav) return;

  if (isHidden) mobileNav.removeAttribute("hidden");
  else mobileNav.setAttribute("hidden", "true");
  menuBtn.setAttribute("aria-expanded", String(Boolean(isHidden)));
  menuBtn.setAttribute("aria-label", isHidden ? "Close menu" : "Open menu");
});

mobileNav?.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (!a) return;
  mobileNav.setAttribute("hidden", "true");
  menuBtn?.setAttribute("aria-expanded", "false");
  menuBtn?.setAttribute("aria-label", "Open menu");
});

const openCvModal = () => {
  if (!cvModal) return;
  if (cvFrame && !cvFrame.getAttribute("src")) {
    const pdfSrc = cvFrame.getAttribute("data-pdf-src") || "";
    cvFrame.src = pdfSrc;
  }
  cvModal.hidden = false;
  cvModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("cvModalOpen");
};

const closeCvModal = () => {
  if (!cvModal) return;
  cvModal.hidden = true;
  cvModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("cvModalOpen");
  if (cvFrame) cvFrame.removeAttribute("src");
};

openCvBtn?.addEventListener("click", (event) => {
  event.preventDefault();
  openCvModal();
});

cvModal?.addEventListener("click", (event) => {
  const closeTarget = event.target.closest("[data-close-cv]");
  if (!closeTarget) return;
  closeCvModal();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cvModal && !cvModal.hidden) {
    closeCvModal();
  }
});

// active link highlight (simple)
const links = Array.from(document.querySelectorAll(".nav__link"));
const sections = ["home", "showcase", "usecases", "about", "patent", "faq", "contact"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const setActive = () => {
  const y = window.scrollY + 120;
  let current = "home";
  for (const s of sections) {
    if (s.offsetTop <= y) current = s.id;
  }
  links.forEach((l) => {
    const isMatch = l.getAttribute("href") === `#${current}`;
    l.classList.toggle("is-active", isMatch);
  });
};

window.addEventListener("scroll", setActive, { passive: true });
setActive();

const updateTopbarMotion = () => {
  if (!topbar) return;
  const y = window.scrollY;
  topbar.classList.toggle("topbar--scrolled", y > 18);
};

window.addEventListener("scroll", updateTopbarMotion, { passive: true });
window.addEventListener("resize", updateTopbarMotion);
updateTopbarMotion();

// Language Switching
const translations = {
  en: {
    nav: {
      home: "Home",
      showcase: "Showcase",
      usecases: "Use Cases",
      about: "About Us",
      patent: "Patent Info",
      owner: "Founder",
      contact: "Contact",
    },
    hero: {
      kicker: "",
      title: "",
      lead: "",
      cta: "",
    },
    showcase: {
      eyebrow: "Owner, Cars, Company Story",
      title: "Media Showcase",
      intro: "A closer look at the cars, the owner, and the technology behind Montana Vision.",
      galleryHint: "Swipe or use the arrows",
      ownerTitle: "Owner Spotlight: Stephan",
      carsTitle: "Cars & Performance",
      video1Title: "Owner Video",
      video2Title: "Company & Technology Video",
      techLabel: "Technical Data",
      techTitle: "Engineering Snapshot",
      techMetric1: "High load",
      techMetric2: "Fuel flow",
      techMetric3: "Thermal control",
      techItem1: "High-pressure injection concept",
      techItem2: "Combustion optimization",
      techItem3: "Automotive, marine and industrial use",
      techItem4: "Patent-backed piston development",
      videoHint: "Swipe left for technical data • Swipe right for photos",
      photoLabel: "Photos & Story",
      photoCaption1: "Stephan racing",
      photoCaption2: "Montana GT visual",
      photoCaption3: "Performance detail",
      photoCaption4: "Racing background",
      lightbox: {
        owner: {
          eyebrow: "Owner story",
          title: "Stephan Geschke at the 6 Heures de Paris",
          text:
            "This image connects the founder's racing roots to the long engineering path behind Montana Vision. His motorsport background shaped the focus on reliability, efficiency, and performance under pressure.",
          note: "Use the fullscreen view to study the car, the posture, and the race context in more detail.",
        },
        concept: {
          eyebrow: "Concept vision",
          title: "Montana GT concept study",
          text:
            "A visual concept that translates the brand into a performance-oriented automotive language. The image emphasizes proportion, surface tension, and the feeling of a serious engineering project rather than a generic render.",
          note: "Read it as a design direction: how the identity could look when carried into a finished vehicle.",
        },
        detail: {
          eyebrow: "Automotive detail",
          title: "Performance-focused close-up",
          text:
            "This shot is about precision rather than decoration. It highlights the material presence, lighting, and the kind of detail work that gives a performance car a finished, technical character.",
          note: "Fullscreen helps reveal the edges, reflections, and small cues that define the overall impression.",
        },
        legacy: {
          eyebrow: "Racing legacy",
          title: "A racing background that still informs the brand",
          text:
            "The photo reflects the competitive environment that shaped the founder's thinking. That experience feeds directly into the way Montana Vision presents speed, endurance, and engineering discipline.",
          note: "The composition is intentionally documentary, so the story stays tied to real motorsport history.",
        },
        identity: {
          eyebrow: "Brand identity",
          title: "Montana Vision visual identity",
          text:
            "This graphic acts as a compact brand marker. It is meant to communicate the project's direction quickly while still feeling technical, modern, and tied to the larger engineering story.",
          note: "Open it fullscreen to inspect the composition and the relationship between symbol and surface.",
        },
        metalCatalyticConverter: {
          eyebrow: "Automotive Component",
          title: "Metal Catalytic Converter",
          text:
            "This image shows a metal catalytic converter. The component is designed to support exhaust-gas treatment by reducing harmful emissions before they leave the exhaust system.",
          note:
            "Additional information about its materials, construction, technical specifications, and possible applications can be added here.",
        },

        speedBike: {
          eyebrow: "Performance Mobility",
          title: "Speed Bike",
          text:
            "This image shows a high-performance speed bike. Its lightweight construction and aerodynamic design represent efficient, fast, and technically focused mobility.",
          note:
            "Additional information about the bicycle, its materials, performance characteristics, and intended use can be added here.",
        },

        waterBottle: {
          eyebrow: "Everyday Product",
          title: "Bottle of Water",
          text:
            "This image shows a bottle of water. It represents clean resources, everyday sustainability, and the importance of efficient product and packaging solutions.",
          note:
            "Additional information about the bottle, its materials, production, sustainability, or intended application can be added here.",
        },

        winterSports: {
          eyebrow: "Winter Sports",
          title: "Skis and Snowboards",
          text:
            "This image shows skis and snowboards. These products represent performance-focused materials, durability, lightweight construction, and equipment designed for demanding winter conditions.",
          note:
            "Additional information about the products, their materials, manufacturing process, and performance characteristics can be added here.",
        },
      },
    },
    about: {
      eyebrow: "About Us",
      title: "Cleaning up<br />entire industries.",
      lead: "Cleaner combustion. Lower emissions. Real engineering.",
      cta: "Discover The Technology",
      p1:
        "MONTANA VISION develops next-generation propulsion and combustion technologies focused on efficiency, sustainability, and measurable real-world impact.",
      p2:
        "The company combines advanced engineering concepts with practical applications for automotive, marine, and industrial systems - creating solutions designed to reduce fuel consumption, optimize energy usage, and lower harmful emissions.",
      quote: "Practical innovation, built to perform.",
      p3:
        "Built around innovation, persistence, and unconventional thinking, MONTANA VISION represents a long-term vision for cleaner and more efficient mobility.",
    },
    innovation: {
      subtitle: "Patent Portfolio Snapshot",
      title: "INTERNATIONAL FILING:<br />DIESEL ENGINE AND PISTON",
      p1:
        "Published under the PCT route by WIPO, this filing covers a diesel engine with high-pressure injection and charging function, including a corresponding piston design for high thermal loads and improved sealing guidance.",
      p2:
        "The application connects combustion optimization, fuel preparation behavior, and piston geometry, supporting development paths for cleaner combustion systems across automotive, marine, and industrial engine platforms.",
      feature1: "Title: Diesel engine with high-pressure injection and charging function, and piston",
      feature2: "Applicants: NEWGREEN AG (CH) and NEWGREEN AMERICAN INC. (US)",
      feature3: "IPC classes include F02F 3/22, F01M 1/06, F02F 3/02",
    },
    patent: {
      leftTitle: "Technical Data & Measurements",
      leftItem1: "Compression ratio: 18.5:1",
      leftItem2: "Injection pressure: 2,500 bar (max)",
      leftItem3: "Piston material: forged steel alloy",
      leftItem4: "Thermal load test: passed 1,000h @ 550°C",
      leftItem5: "Emissions reduction estimate: up to 12%",
      leftNoteLabel: "Core focus",
      leftNoteText: "Thermal stability, sealing control, and high-load combustion behavior.",
      leftMuted: "Detailed tables and CAD exports available on request.",
      centerSubtitle: "Patent Portfolio Snapshot",
      centerTitle: "INTERNATIONAL FILING: DIESEL ENGINE AND PISTON",
      centerIntro:
        "Published under the PCT route by WIPO, this filing covers a diesel engine with high-pressure injection and charging function, including a corresponding piston design for high thermal loads and improved sealing guidance.",
      metaPublication: "<strong>Publication</strong> WO 2023/118534 A1",
      metaPct: "<strong>PCT File</strong> PCT/EP2022/087654",
      metaPriority: "<strong>Priority</strong> DE 10 2021 134 521.9",
      metaFiled: "<strong>Filed</strong> 22 Dec 2022",
      centerFeature1: "Title: Diesel engine with high-pressure injection and charging function, and piston",
      centerFeature2: "Applicants: NEWGREEN AG (CH) and NEWGREEN AMERICAN INC. (US)",
      centerClaimLabel: "Key claim",
      centerClaimText:
        "Designed to improve efficiency under sustained load while keeping combustion chamber temperatures and sealing stress under control.",
    },
    future: {
      title: "STEPHAN GESCHKE –<br />FOUNDER, INVENTOR,<br />VISIONARY",
      p1:
        "Born in Berlin in 1960, Stephan Geschke built his career from racing, mechanical engineering, and marine performance to advanced propulsion R&D. His work combines practical workshop experience with long-term invention strategy.",
      p2:
        "He was German champion (1979), European champion (1982), world champion (1983), and winner of the 6 Heures de Paris (1984). This motorsport background shaped his approach to reliability, efficiency, and performance under pressure.",
      p3:
        "Through companies and projects in Germany, Switzerland, Liechtenstein, Monaco, the USA, and the UK, he has advanced combustion optimization and developed NEWGREEN e-propulsion concepts aimed at energy-independent drive systems.",
      p4:
        "Current focus includes Montana Motors development, additional patent applications, and scalable technologies aligned with strict emissions frameworks such as EPA and EU standards.",
      galleryBtn: "Open full CV (PDF)",
    },
    owner: {
      eyebrow: "Founder Profile",
      titleRole: "Founder • Inventor • Advanced Propulsion Engineer",
      lead:
        "From championship powerboat racing to advanced propulsion engineering, Stephan Geschke has spent decades developing unconventional technologies focused on performance, efficiency, and long-term innovation.",
      quote: "Real innovation begins where conventional thinking ends.",
      stat1: "German Champion",
      stat2: "European Champion",
      stat3: "World Champion",
      stat4: "6 Heures de Paris Winner",
      bornLabel: "Born",
      bornValue: "January 27, 1960",
      baseLabel: "Base",
      baseValue: "Staad, Switzerland",
      roleLabel: "Current Role",
      roleValue: "Founder, Montana Vision",
      doctoralLabel: "Doctoral Research",
      doctoralValue: "Mechanical Engineering",
      racingLabel: "Racing Legacy",
      racingValue: "Powerboat performance background",
      cvBtn: "Open full CV (PDF)",
      timeline1Range: "1976 - 1984",
      timeline1Title: "Powerboat Racing",
      timeline1Text: "Active race driver with national, European, and world championship results.",
      timeline2Range: "1987 - 2000",
      timeline2Title: "Geschke Marine Performance",
      timeline2Text: "Marine engine development, performance engineering, and early combustion optimization research.",
      timeline3Range: "2005 - 2011",
      timeline3Title: "Pro-One AG",
      timeline3Text: "Advanced prototype engineering, hybrid-drive experimentation, and propulsion system development.",
      timeline4Range: "2021 - Present",
      timeline4Title: "NEWGREEN",
      timeline4Text: "Advanced combustion technologies, patent development, and next-generation propulsion concepts.",
    },
    contact: {
      title: "REACH OUT TO US TO BE<br />A PART OF THE CHANGE",
      phone: "+41 76 505 09 00",
      email: "office@newgreen.eu",
      body:
        "NEWGREEN is actively building strategic partnerships in research, engineering, prototyping, and commercialization. For patent, investment, pilot, and technical collaboration requests, contact the founder team directly.",
      name: "Name",
      company: "Company Name",
      phonePlaceholder: "Your phone",
      emailPlaceholder: "Your Email",
      messagePlaceholder: "Your Message",
      subject: "New Montana Vision Inquiry",
      send: "Send Message",
    },
    cookie: {
      title: "Privacy Settings",
      body: "We use necessary storage for website operation. Optional categories (preferences, analytics, marketing) are used only with your consent.",
      reject: "Reject Optional",
      settings: "Personalize",
      accept: "Accept All",
      modalTitle: "Cookie Preferences",
      necessaryTitle: "Necessary",
      necessaryText: "Required for core functionality and legal consent storage.",
      prefTitle: "Preferences",
      prefText: "Stores optional UX preferences.",
      analyticsTitle: "Analytics",
      analyticsText: "Would enable traffic measurement tools.",
      marketingTitle: "Marketing",
      marketingText: "Would enable advertising and retargeting tags.",
      saveSelection: "Save Selection",
    },
    ui: {
      media: {
        mainLabel: "Main Video", mainTitle: "Technology Film", ownerLabel: "Owner",
        conceptLabel: "Concept", conceptTitle: "Montana GT Visual",
        automotiveLabel: "Automotive", automotiveTitle: "Performance Detail",
        legacyLabel: "Legacy", legacyTitle: "Racing Background",
        identityLabel: "Identity", identityTitle: "Brand Visual",
      },
      usecases: {
        eyebrow: "What Else We Do", title: "FURTHER TECHNOLOGY'S PROGRESS",
        metalTitle: "Metal Catalytic Converter",
        metalText: "A metal catalytic converter designed for automotive and industrial applications.",
        bikeTitle: "Speed Bike",
        bikeText: "A high-performance speed bike representing efficient and lightweight mobility.",
        waterTitle: "Bottle of Water",
        waterText: "A bottle of water representing clean resources and sustainable everyday products.",
        winterTitle: "Skis and Snowboards",
        winterText: "Skis and snowboards representing performance materials and winter-sports equipment.",
      },
      patent: {
        eyebrow: "Patent explorer", hint: "Swipe or use the arrows to explore all three views.",
        leftLabel: "01 — Technical description", centerLabel: "02 — Main patent page",
        rightLabel: "03 — Pictures & visualizations", visualTitle: "Patent visual library",
        visualText: "Add the final renders, technical drawings, diagrams, or prototype photography here.",
        slot1Title: "Hero visualization", slot1Text: "Recommended: 1600 × 1200 px",
        slot2Title: "Technical drawing", slot2Text: "PNG, JPG, WebP, or SVG",
        slot3Title: "Component detail", slot3Text: "Close-up or sectional view",
        slot4Title: "Additional visualization", slot4Text: "Diagram, render, or prototype",
      },
      cookiePreferences: "Cookie Preferences", cvTitle: "Curriculum Vitae",
      showcaseStory: "Showcase story", sending: "Sending...",
      sent: "Message sent successfully. Thank you!",
      formError: "Something went wrong. Please try again.",
      networkError: "Network error — please try again.",
    },
    footer: {
      brand: "Montana Vision | NEWGREEN",
      rights: "All Rights Reserved © Montana Vision — 2026",
      home: "Homepage",
      about: "About Us",
      contact: "Contact",
      impressum: "Impressum",
      privacy: "Privacy",
      cookies: "Cookie Settings",
      terms: "Terms",
    },
  },
  de: {
    nav: {
      home: "Startseite",
      showcase: "Showcase",
      usecases: "Einsatzbereiche",
      about: "Über Uns",
      patent: "Patent Info",
      owner: "Gründer",
      contact: "Kontakt",
    },
    hero: {
      kicker: "",
      title: "",
      lead: "",
      cta: "",
    },
    showcase: {
      eyebrow: "Inhaber, Autos, Unternehmensgeschichte",
      title: "Medien-Showcase",
      intro: "Ein näherer Blick auf die Autos, den Inhaber und die Technologie hinter Montana Vision.",
      galleryHint: "Wischen oder Pfeile verwenden",
      ownerTitle: "Inhaber im Fokus: Stephan",
      carsTitle: "Autos & Performance",
      video1Title: "Inhaber-Video",
      video2Title: "Unternehmen & Technologie Video",
      techLabel: "Technische Daten",
      techTitle: "Ingenieurübersicht",
      techMetric1: "Hohe Last",
      techMetric2: "Kraftstofffluss",
      techMetric3: "Thermische Kontrolle",
      techItem1: "Hochdruck-Einspritzkonzept",
      techItem2: "Verbrennungsoptimierung",
      techItem3: "Einsatz in Automobil, Marine und Industrie",
      techItem4: "Patentgestützte Kolbenentwicklung",
      videoHint: "Nach links für technische Daten wischen • Nach rechts für Fotos wischen",
      photoLabel: "Fotos & Geschichte",
      photoCaption1: "Stephan im Rennen",
      photoCaption2: "Montana GT Studie",
      photoCaption3: "Leistungsdetail",
      photoCaption4: "Rennsport-Hintergrund",
    },
    about: {
      eyebrow: "Über uns",
      title: "Branchen sauberer machen.<br />Mit messbarer Wirkung.",
      lead: "Sauberere Verbrennung. Weniger Emissionen. Echte Ingenieursarbeit.",
      cta: "Technologie entdecken",
      p1:
        "MONTANA VISION entwickelt Antriebs- und Verbrennungstechnologien der nächsten Generation mit Fokus auf Effizienz, Nachhaltigkeit und messbare Wirkung im Alltag.",
      p2:
        "Der Ansatz verbindet fortschrittliche Ingenieurskonzepte mit praxisnahen Anwendungen für Automotive-, Marine- und Industriesysteme - mit Lösungen, die Kraftstoffverbrauch senken, Energie optimieren und Emissionen reduzieren.",
      quote: "Pragmatische Innovation, gebaut für echte Ergebnisse.",
      p3:
        "Auf Innovation, Beharrlichkeit und unkonventionelles Denken aufgebaut, steht MONTANA VISION für eine langfristige Vision sauberer und effizienterer Mobilität.",
    },
    innovation: {
      subtitle: "Patentportfolio Überblick",
      title: "INTERNATIONALE ANMELDUNG:<br />DIESELMOTOR UND KOLBEN",
      p1:
        "Diese unter dem PCT-Verfahren veröffentlichte Anmeldung beschreibt einen Dieselmotor mit Hochdruck-Einspritzung und Aufladung sowie eine zugehörige Kolbenkonstruktion für hohe thermische Lasten und verbesserte Abdichtung.",
      p2:
        "Die Anmeldung verbindet Verbrennungsoptimierung, Kraftstoffaufbereitung und Kolbengeometrie und unterstützt damit Entwicklungspfade für sauberere Verbrennungssysteme in Automotive-, Marine- und Industrieanwendungen.",
      feature1: "Titel: Dieselmotor mit Hochdruck-Einspritzung und Aufladung sowie Kolben",
      feature2: "Anmelder: NEWGREEN AG (CH) und NEWGREEN AMERICAN INC. (US)",
      feature3: "IPC-Klassen: F02F 3/22, F01M 1/06, F02F 3/02",
    },
    patent: {
      leftTitle: "Technische Daten & Messwerte",
      leftItem1: "Verdichtungsverhältnis: 18,5:1",
      leftItem2: "Einspritzdruck: 2.500 bar (max.)",
      leftItem3: "Kolbenmaterial: geschmiedete Stahllegierung",
      leftItem4: "Wärmelasttest: bestanden 1.000h @ 550°C",
      leftItem5: "Geschätzte Emissionsminderung: bis zu 12 %",
      leftNoteLabel: "Kernfokus",
      leftNoteText: "Thermische Stabilität, Abdichtungssteuerung und Verbrennungsverhalten unter hoher Last.",
      leftMuted: "Detaillierte Tabellen und CAD-Exporte auf Anfrage.",
      centerSubtitle: "Patentportfolio Überblick",
      centerTitle: "INTERNATIONALE ANMELDUNG: DIESELMOTOR UND KOLBEN",
      centerIntro:
        "Diese unter dem PCT-Verfahren veröffentlichte Anmeldung beschreibt einen Dieselmotor mit Hochdruck-Einspritzung und Aufladung sowie eine zugehörige Kolbenkonstruktion für hohe thermische Lasten und verbesserte Abdichtung.",
      metaPublication: "<strong>Veröffentlichung</strong> WO 2023/118534 A1",
      metaPct: "<strong>PCT-Akte</strong> PCT/EP2022/087654",
      metaPriority: "<strong>Priorität</strong> DE 10 2021 134 521.9",
      metaFiled: "<strong>Eingereicht</strong> 22. Dez. 2022",
      centerFeature1: "Titel: Dieselmotor mit Hochdruck-Einspritzung und Aufladung sowie Kolben",
      centerFeature2: "Anmelder: NEWGREEN AG (CH) und NEWGREEN AMERICAN INC. (US)",
      centerClaimLabel: "Kernaussage",
      centerClaimText:
        "Ausgelegt, um die Effizienz unter Dauerlast zu verbessern und dabei Brennraumtemperaturen sowie Abdichtungsbelastung zu kontrollieren.",
    },
    future: {
      title: "MONTONA VISION –<br />GESTALTET DIE ZUKUNFT<br />AUS DEUTSCHLAND",
      p1:
        "Sed unde omnis iste natus sit tatem accus antium laudan tium totam aperiam eaque ipsa ab illo inventore veritatis et architecto beatae vitae dicta explicabo.",
      p2:
        "Sed unde omnis iste natus sit tatem accus antium laudan tium totam aperiam eaque ipsa ab illo inventore veritatis et architecto beatae vitae dicta explicabo.",
      p3:
        "Nemo enim quia sit asper natur sed magni dolores eos ratione serui nesciunt dolorem ipsum dolor sit amet consec tetur adipisci velit sed non numsuam modi.",
      p4:
        "Nemo enim quia sit asper natur sed magni dolores eos ratione serui nesciunt dolorem ipsum dolor sit amet consec.",
      galleryBtn: "CV als PDF öffnen",
    },
    owner: {
      eyebrow: "Profil des Gründers",
      titleRole: "Gründer • Erfinder • Antriebsvisionär",
      lead:
        "Vom Powerboat-Spitzensport bis zur modernen Antriebsentwicklung arbeitet Stephan Geschke seit Jahrzehnten an unkonventionellen Technologien mit Fokus auf Leistung, Effizienz und langfristige Innovation.",
      quote: "Wirkliche Innovation beginnt dort, wo konventionelles Denken endet.",
      stat1: "Deutscher Meister",
      stat2: "Europameister",
      stat3: "Weltmeister",
      stat4: "Sieger 6 Heures de Paris",
      bornLabel: "Geboren",
      bornValue: "27. Januar 1960",
      baseLabel: "Standort",
      baseValue: "Staad, Schweiz",
      roleLabel: "Aktuelle Rolle",
      roleValue: "Gründer, Montana Vision",
      doctoralLabel: "Doktoratsforschung",
      doctoralValue: "Maschinenbau",
      racingLabel: "Rennsport-Erbe",
      racingValue: "Powerboat-Performance-Hintergrund",
      cvBtn: "Vollständigen CV öffnen (PDF)",
      timeline1Range: "1976 - 1984",
      timeline1Title: "Powerboat-Rennsport",
      timeline1Text: "Aktiver Rennfahrer mit nationalen, europäischen und Weltmeisterschaftserfolgen.",
      timeline2Range: "1987 - 2000",
      timeline2Title: "Geschke Marine Performance",
      timeline2Text: "Marine-Motorenentwicklung, Performance Engineering und frühe Forschung zur Verbrennungsoptimierung.",
      timeline3Range: "2005 - 2011",
      timeline3Title: "Pro-One AG",
      timeline3Text: "Fortgeschrittene Prototypenentwicklung, Hybrid-Antriebsexperimente und Antriebssystementwicklung.",
      timeline4Range: "2021 - Heute",
      timeline4Title: "NEWGREEN",
      timeline4Text: "Moderne Verbrennungstechnologien, Patententwicklung und Konzepte der nächsten Antriebsgeneration.",
    },
    contact: {
      title: "MELDEN SIE SICH, UM IHRE<br />BRANCHE ZU GESTALTEN",
      phone: "+ 41 76 5050 09 00",
      email: "Office@montana.eu",
      body:
        "Sed ut unde omnis iste natus sit volur tatem accus antium laudan tium totam rem aperiam eaque ipsa ab illo inventore veritatis et beatae vitae explicabo.",
      name: "Name",
      company: "Firmenname",
      phonePlaceholder: "Ihre Telefonnummer",
      emailPlaceholder: "Ihre E-Mail",
      messagePlaceholder: "Ihre Nachricht",
      subject: "Neue Montana Vision Anfrage",
      send: "Nachricht senden",
    },
    cookie: {
      title: "Datenschutzeinstellungen",
      body: "Wir nutzen notwendige Speicherungen fuer den Betrieb der Website. Optionale Kategorien (Praeferenzen, Statistik, Marketing) werden nur mit Einwilligung aktiviert.",
      reject: "Optionales ablehnen",
      settings: "Personalisieren",
      accept: "Alle akzeptieren",
      modalTitle: "Cookie Praeferenzen",
      necessaryTitle: "Notwendig",
      necessaryText: "Erforderlich fuer Kernfunktionen und Speicherung der Einwilligung.",
      prefTitle: "Praeferenzen",
      prefText: "Speichert optionale UX-Einstellungen.",
      analyticsTitle: "Statistik",
      analyticsText: "Wuerde Reichweitenmessung aktivieren.",
      marketingTitle: "Marketing",
      marketingText: "Wuerde Werbe- und Retargeting-Tags aktivieren.",
      saveSelection: "Auswahl speichern",
    },
    ui: {
      media: {
        mainLabel: "Hauptvideo", mainTitle: "Technologiefilm", ownerLabel: "Inhaber",
        conceptLabel: "Konzept", conceptTitle: "Montana-GT-Visualisierung",
        automotiveLabel: "Automobil", automotiveTitle: "Leistungsdetail",
        legacyLabel: "Tradition", legacyTitle: "Rennsport-Hintergrund",
        identityLabel: "Identität", identityTitle: "Markenvisualisierung",
      },
      lightbox: {
        owner: { eyebrow: "Geschichte des Inhabers", title: "Stephan Geschke bei den 6 Heures de Paris", text: "Das Bild verbindet die Rennsportwurzeln des Gründers mit dem langen technischen Entwicklungsweg von Montana Vision.", note: "In der Vollbildansicht lassen sich Fahrzeug, Haltung und Rennumfeld genauer betrachten." },
        concept: { eyebrow: "Konzeptvision", title: "Montana-GT-Konzeptstudie", text: "Die Studie überträgt die Marke in eine leistungsorientierte automobile Designsprache.", note: "Sie zeigt eine mögliche Gestaltungsrichtung für ein fertiges Fahrzeug." },
        detail: { eyebrow: "Automobildetail", title: "Leistungsorientierte Nahaufnahme", text: "Diese Aufnahme betont Präzision, Materialwirkung, Licht und technische Detailarbeit.", note: "Die Vollbildansicht macht Kanten, Reflexionen und kleine Gestaltungselemente sichtbar." },
        legacy: { eyebrow: "Rennsporttradition", title: "Ein Rennsporthintergrund, der die Marke weiterhin prägt", text: "Das Foto zeigt das Wettbewerbsumfeld, das die Denkweise des Gründers formte.", note: "Die dokumentarische Bildsprache hält die Geschichte mit dem realen Motorsport verbunden." },
        identity: { eyebrow: "Markenidentität", title: "Visuelle Identität von Montana Vision", text: "Die Grafik vermittelt die technische und moderne Ausrichtung des Projekts in kompakter Form.", note: "In der Vollbildansicht lassen sich Komposition, Symbol und Oberfläche genauer prüfen." },
        metalCatalyticConverter: { eyebrow: "Automobilkomponente", title: "Metallkatalysator", text: "Der Metallkatalysator unterstützt die Abgasnachbehandlung und reduziert schädliche Emissionen vor dem Austritt.", note: "Materialien, Aufbau, technische Daten und Anwendungen können hier ergänzt werden." },
        speedBike: { eyebrow: "Leistungsmobilität", title: "Hochgeschwindigkeitsfahrrad", text: "Die leichte Konstruktion und aerodynamische Form stehen für effiziente, schnelle und technisch ausgerichtete Mobilität.", note: "Materialien, Leistungsdaten und Einsatzzweck können hier ergänzt werden." },
        waterBottle: { eyebrow: "Alltagsprodukt", title: "Wasserflasche", text: "Die Flasche steht für saubere Ressourcen, Alltagstauglichkeit und nachhaltige Produktlösungen.", note: "Informationen zu Material, Herstellung und Nachhaltigkeit können hier ergänzt werden." },
        winterSports: { eyebrow: "Wintersport", title: "Skier und Snowboards", text: "Diese Produkte stehen für belastbare Hochleistungsmaterialien und leichte Konstruktionen unter anspruchsvollen Winterbedingungen.", note: "Materialien, Fertigung und Leistungsmerkmale können hier ergänzt werden." },
      },
      usecases: {
        eyebrow: "Weitere Anwendungsbereiche", title: "WEITERENTWICKLUNG DER TECHNOLOGIE",
        metalTitle: "Metallkatalysator",
        metalText: "Ein Metallkatalysator für Anwendungen im Automobil- und Industriesektor.",
        bikeTitle: "Hochgeschwindigkeitsfahrrad",
        bikeText: "Ein leistungsstarkes Fahrrad als Beispiel für effiziente und leichte Mobilität.",
        waterTitle: "Wasserflasche",
        waterText: "Eine Wasserflasche als Beispiel für saubere Ressourcen und nachhaltige Alltagsprodukte.",
        winterTitle: "Skier und Snowboards",
        winterText: "Skier und Snowboards als Beispiele für Hochleistungsmaterialien und Wintersportausrüstung.",
      },
      patent: {
        eyebrow: "Patentübersicht", hint: "Wischen Sie oder verwenden Sie die Pfeile, um alle drei Ansichten zu erkunden.",
        leftLabel: "01 — Technische Beschreibung", centerLabel: "02 — Patent-Hauptseite",
        rightLabel: "03 — Bilder und Visualisierungen", visualTitle: "Visuelle Patentbibliothek",
        visualText: "Hier werden die finalen Renderings, technischen Zeichnungen, Diagramme oder Prototypenfotos eingefügt.",
        slot1Title: "Hauptvisualisierung", slot1Text: "Empfohlen: 1600 × 1200 px",
        slot2Title: "Technische Zeichnung", slot2Text: "PNG, JPG, WebP oder SVG",
        slot3Title: "Bauteildetail", slot3Text: "Nahaufnahme oder Schnittansicht",
        slot4Title: "Weitere Visualisierung", slot4Text: "Diagramm, Rendering oder Prototyp",
      },
      cookiePreferences: "Cookie-Einstellungen", cvTitle: "Lebenslauf",
      showcaseStory: "Geschichte zur Präsentation", sending: "Wird gesendet...",
      sent: "Nachricht erfolgreich gesendet. Vielen Dank!",
      formError: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
      networkError: "Netzwerkfehler — bitte versuchen Sie es erneut.",
    },
    footer: {
      brand: "Montana Vision",
      rights: "Alle Rechte vorbehalten © Ihr Unternehmen — 2025",
      home: "Startseite",
      about: "Über Uns",
      contact: "Kontakt",
      impressum: "Impressum",
      privacy: "Datenschutz",
      cookies: "Cookie Einstellungen",
      terms: "Impressum",
    },
  },
  hu: {
    nav: {
      home: "Kezdőlap",
      showcase: "Bemutató",
      usecases: "Felhasználási területek",
      about: "Rólunk",
      patent: "Szabadalom Info",
      owner: "Alapító",
      contact: "Kapcsolat",
    },
    hero: {
      kicker: "IPARÁGAKAT<br />TISZTÁZUNK",
      title: "MONTANA<br />VISION",
      lead:
        'Technológiánk bárhol használható, ahol generátorokat vagy turbinákat alkalmaznak.<br /><span>MONTONA VISION</span> olyan hatékonysági szintet ér el, amely egész iparágakat képes megváltoztatni.',
      cta: "TOVÁBB",
    },
    showcase: {
      eyebrow: "Tulajdonos, Autók, Cégtörténet",
      title: "Média Bemutató",
      intro: "Közelebbi betekintés az autókba, a tulajdonosba és a Montana Vision mögötti technológiába.",
      galleryHint: "Húzd el vagy használd a nyilakat",
      ownerTitle: "Tulajdonos reflektorfényben: Stephan",
      carsTitle: "Autók és teljesítmény",
      video1Title: "Tulajdonosi videó",
      video2Title: "Cég és technológia videó",
      techLabel: "Műszaki adatok",
      techTitle: "Mérnöki áttekintés",
      techMetric1: "Nagy terhelés",
      techMetric2: "Üzemanyag-áramlás",
      techMetric3: "Hőkezelés",
      techItem1: "Nagy nyomású befecskendezési koncepció",
      techItem2: "Égésoptimalizálás",
      techItem3: "Autóipari, tengeri és ipari használat",
      techItem4: "Szabadalommal támogatott dugattyúfejlesztés",
      videoHint: "Balra a műszaki adatokhoz • Jobbra a fotókhoz",
      photoLabel: "Fotók és történet",
      photoCaption1: "Stephan verseny közben",
      photoCaption2: "Montana GT látványterv",
      photoCaption3: "Teljesítmény részlet",
      photoCaption4: "Versenyzői háttér",
    },
    about: {
      eyebrow: "Rólunk",
      title: "Egész iparágakat tisztábbá tenni.<br />Mérhető hatással.",
      lead: "Tisztább égés. Kevesebb emisszió. Valódi mérnöki munka.",
      cta: "Technológia felfedezése",
      p1:
        "A MONTANA VISION a következő generációs hajtás- és égéstechnológiákat fejleszti, az eredményességre, a fenntarthatóságra és a mérhető, valós hatásra összpontosítva.",
      p2:
        "A vállalat fejlett mérnöki koncepciókat ötvöz gyakorlati megoldásokkal az autóipari, tengeri és ipari rendszerek számára - olyan eredményekért, amelyek csökkentik az üzemanyag-felhasználást, optimalizálják az energiahasználatot és mérséklik a káros kibocsátásokat.",
      quote: "Prémium innováció, amely a valós teljesítményben mutatkozik meg.",
      p3:
        "Az innovációra, kitartásra és szokatlan gondolkodásra építve a MONTANA VISION egy hosszú távú víziót képvisel a tisztább és hatékonyabb mobilitásért.",
    },
    innovation: {
      subtitle: "Szabadalmi portfólió áttekintés",
      title: "NEMZETKÖZI BEJELENTÉS:<br />DÍZELMOTOR ÉS DUGATTYÚ",
      p1:
        "A WIPO PCT útvonalán közzétett bejelentés nagy nyomású befecskendezéssel és feltöltéssel működő dízelmotort, valamint a hozzá tartozó, magas hőterhelésre tervezett dugattyúmegoldást ír le.",
      p2:
        "A bejelentés az égés optimalizálását, az üzemanyag-előkészítést és a dugattyú-geometriát kapcsolja össze, így tisztább égési rendszerek fejlesztését támogatja közúti, tengeri és ipari alkalmazásokban.",
      feature1: "Cím: nagy nyomású befecskendezésű és feltöltésű dízelmotor, valamint dugattyú",
      feature2: "Bejelentők: NEWGREEN AG (CH) és NEWGREEN AMERICAN INC. (US)",
      feature3: "IPC osztályok: F02F 3/22, F01M 1/06, F02F 3/02",
    },
    patent: {
      leftTitle: "Műszaki adatok és mérések",
      leftItem1: "Sűrítési arány: 18,5:1",
      leftItem2: "Befecskendezési nyomás: 2.500 bar (max.)",
      leftItem3: "Dugattyú anyaga: kovácsolt acélötvözet",
      leftItem4: "Hőterhelési teszt: sikeres 1.000 óra @ 550°C",
      leftItem5: "Becsült emissziócsökkenés: akár 12%",
      leftNoteLabel: "Kiemelt fókusz",
      leftNoteText: "Hőstabilitás, tömítési vezérlés és nagy terhelés melletti égési viselkedés.",
      leftMuted: "Részletes táblázatok és CAD-exportok kérésre elérhetők.",
      centerSubtitle: "Szabadalmi portfólió áttekintés",
      centerTitle: "NEMZETKÖZI BEJELENTÉS: DÍZELMOTOR ÉS DUGATTYÚ",
      centerIntro:
        "A WIPO PCT útvonalán közzétett bejelentés nagy nyomású befecskendezéssel és feltöltéssel működő dízelmotort, valamint a hozzá tartozó, magas hőterhelésre tervezett dugattyúmegoldást ír le.",
      metaPublication: "<strong>Közzététel</strong> WO 2023/118534 A1",
      metaPct: "<strong>PCT-irat</strong> PCT/EP2022/087654",
      metaPriority: "<strong>Elsőbbség</strong> DE 10 2021 134 521.9",
      metaFiled: "<strong>Benújtva</strong> 2022. dec. 22.",
      centerFeature1: "Cím: nagy nyomású befecskendezésű és feltöltésű dízelmotor, valamint dugattyú",
      centerFeature2: "Bejelentők: NEWGREEN AG (CH) és NEWGREEN AMERICAN INC. (US)",
      centerClaimLabel: "Kiemelt állítás",
      centerClaimText:
        "Úgy tervezték, hogy javítsa a hatékonyságot tartós terhelés mellett, miközben kontroll alatt tartja az égéstér hőmérsékletét és a tömítési terhelést.",
    },
    future: {
      title: "MONTONA VISION –<br />A JÖVŐT FORMÁLJA<br />NÉMETORSZÁGBÓL",
      p1:
        "Sed unde omnis iste natus sit tatem accus antium laudan tium totam aperiam eaque ipsa ab illo inventore veritatis et architecto beatae vitae dicta explicabo.",
      p2:
        "Sed unde omnis iste natus sit tatem accus antium laudan tium totam aperiam eaque ipsa ab illo inventore veritatis et architecto beatae vitae dicta explicabo.",
      p3:
        "Nemo enim quia sit asper natur sed magni dolores eos ratione serui nesciunt dolorem ipsum dolor sit amet consec tetur adipisci velit sed non numsuam modi.",
      p4:
        "Nemo enim quia sit asper natur sed magni dolores eos ratione serui nesciunt dolorem ipsum dolor sit amet consec.",
      galleryBtn: "Teljes CV megnyitása (PDF)",
    },
    owner: {
      eyebrow: "Alapítói profil",
      titleRole: "Alapító • Feltaláló • Hajtásvízionárius",
      lead:
        "A motorcsónak-versenyzés csúcsszintjétől a fejlett hajtástechnikai fejlesztésekig Stephan Geschke évtizedek óta dolgozik szokatlan technológiákon, a teljesítményre, hatékonyságra és hosszú távú innovációra összpontosítva.",
      quote: "Az igazi innováció ott kezdődik, ahol a megszokott gondolkodás véget ér.",
      stat1: "Német bajnok",
      stat2: "Európa-bajnok",
      stat3: "Világbajnok",
      stat4: "6 Heures de Paris győztes",
      bornLabel: "Született",
      bornValue: "1960. január 27.",
      baseLabel: "Bázis",
      baseValue: "Staad, Svájc",
      roleLabel: "Jelenlegi szerep",
      roleValue: "Alapító, Montana Vision",
      doctoralLabel: "Doktori kutatás",
      doctoralValue: "Gépészmérnökség",
      racingLabel: "Versenyörökség",
      racingValue: "Motorcsónakos teljesítmény háttér",
      cvBtn: "Teljes CV megnyitása (PDF)",
      timeline1Range: "1976 - 1984",
      timeline1Title: "Motorcsónak versenyzés",
      timeline1Text: "Aktív versenyző nemzeti, európai és világbajnoki eredményekkel.",
      timeline2Range: "1987 - 2000",
      timeline2Title: "Geschke Marine Performance",
      timeline2Text: "Tengeri motorfejlesztés, teljesítménymérnökség és korai égésoptimalizálási kutatás.",
      timeline3Range: "2005 - 2011",
      timeline3Title: "Pro-One AG",
      timeline3Text: "Fejlett prototípusmérnökség, hibridhajtás-kísérletek és hajtásrendszer-fejlesztés.",
      timeline4Range: "2021 - Jelenleg",
      timeline4Title: "NEWGREEN",
      timeline4Text: "Fejlett égéstechnológiák, szabadalomfejlesztés és újgenerációs hajtáskonceptusok.",
    },
    contact: {
      title: "KERESSEN MEG, HOGY<br />FORMÁLJA AZ IPARÁT",
      phone: "+ 41 76 5050 09 00",
      email: "Office@montana.eu",
      body:
        "A MONTANA VISION kutatási, mérnöki, prototípus-fejlesztési és üzleti együttműködésekre épít stratégiai partnerségeket. Szabadalmi, befektetési, pilot- és műszaki megkeresésekkel közvetlenül a csapatot keresse.",
      name: "Név",
      company: "Vállalat",
      phonePlaceholder: "Telefonszáma",
      emailPlaceholder: "E-mail címe",
      messagePlaceholder: "Üzenete",
      subject: "Új Montana Vision megkeresés",
      send: "Üzenet küldése",
    },
    cookie: {
      title: "Adatvedelmi beallitasok",
      body: "A weboldal mukodesehez szukseges tarolast hasznalunk. Az opcionlis kategoriak (preferenciak, statisztika, marketing) csak hozzajarulassal aktivak.",
      reject: "Opcionlis elutasitasa",
      settings: "Testreszabas",
      accept: "Mindet elfogad",
      modalTitle: "Cookie beallitasok",
      necessaryTitle: "Szukseges",
      necessaryText: "Alapmukodeshez es a hozzajarulas tarolasahoz kotelezo.",
      prefTitle: "Preferenciak",
      prefText: "Opcionlis UX beallitasok tarolasa.",
      analyticsTitle: "Statisztika",
      analyticsText: "Forgalmi meresi eszkozok engedelyezese.",
      marketingTitle: "Marketing",
      marketingText: "Hirdetesi es retargeting tagek engedelyezese.",
      saveSelection: "Valasztas mentese",
    },
    ui: {
      media: {
        mainLabel: "Fő videó", mainTitle: "Technológiai film", ownerLabel: "Tulajdonos",
        conceptLabel: "Koncepció", conceptTitle: "Montana GT látványterv",
        automotiveLabel: "Autóipar", automotiveTitle: "Teljesítményrészlet",
        legacyLabel: "Örökség", legacyTitle: "Versenyzői háttér",
        identityLabel: "Arculat", identityTitle: "Márkaarculat",
      },
      lightbox: {
        owner: { eyebrow: "Az alapító története", title: "Stephan Geschke a 6 Heures de Paris versenyen", text: "A kép összeköti az alapító versenyzői múltját a Montana Vision hosszú mérnöki fejlesztési útjával.", note: "Teljes képernyőn az autó, a testtartás és a versenykörnyezet részletesebben megfigyelhető." },
        concept: { eyebrow: "Koncepció", title: "Montana GT koncepciótanulmány", text: "A látványterv a márkát egy teljesítményközpontú autóipari formanyelvre ülteti át.", note: "A terv egy lehetséges irányt mutat arra, hogyan jelenhet meg az arculat egy kész járművön." },
        detail: { eyebrow: "Autóipari részlet", title: "Teljesítményközpontú közeli kép", text: "A felvétel a precizitást, az anyaghasználatot, a fényeket és a műszaki részleteket emeli ki.", note: "Teljes képernyőn az élek, tükröződések és apró formai jegyek is láthatók." },
        legacy: { eyebrow: "Versenyzői örökség", title: "A márkát ma is formáló versenyzői háttér", text: "A fotó azt a versenykörnyezetet mutatja be, amely az alapító gondolkodásmódját kialakította.", note: "A dokumentarista kompozíció a történetet a valódi motorsportmúlthoz köti." },
        identity: { eyebrow: "Márkaarculat", title: "A Montana Vision vizuális arculata", text: "A grafika tömören közvetíti a projekt műszaki, modern és jövőbe mutató irányát.", note: "Teljes képernyőn a kompozíció, a szimbólum és a felület kapcsolata is megvizsgálható." },
        metalCatalyticConverter: { eyebrow: "Autóipari alkatrész", title: "Fém katalizátor", text: "A fém katalizátor támogatja a kipufogógáz kezelését, és csökkenti a károsanyag-kibocsátást.", note: "Az anyagok, a felépítés, a műszaki adatok és az alkalmazások itt egészíthetők ki." },
        speedBike: { eyebrow: "Teljesítményorientált mobilitás", title: "Gyorsasági kerékpár", text: "Könnyű szerkezete és aerodinamikus kialakítása a hatékony, gyors és műszakilag fejlett mobilitást képviseli.", note: "Az anyagok, teljesítményadatok és tervezett felhasználás itt egészíthetők ki." },
        waterBottle: { eyebrow: "Hétköznapi termék", title: "Vizespalack", text: "A palack a tiszta erőforrásokat, a mindennapi fenntarthatóságot és a hatékony termékmegoldásokat képviseli.", note: "Az anyag, a gyártás és a fenntarthatóság részletei itt egészíthetők ki." },
        winterSports: { eyebrow: "Téli sportok", title: "Sílécek és snowboardok", text: "Ezek a termékek nagy teljesítményű, tartós és könnyű anyagokat képviselnek a téli körülmények között.", note: "Az anyagok, a gyártási folyamat és a teljesítményjellemzők itt egészíthetők ki." },
      },
      usecases: {
        eyebrow: "További tevékenységeink", title: "A TECHNOLÓGIA TOVÁBBFEJLESZTÉSE",
        metalTitle: "Fém katalizátor",
        metalText: "Autóipari és ipari alkalmazásokhoz tervezett fém katalizátor.",
        bikeTitle: "Gyorsasági kerékpár",
        bikeText: "Nagy teljesítményű kerékpár, amely a hatékony és könnyű mobilitást képviseli.",
        waterTitle: "Vizespalack",
        waterText: "A tiszta erőforrásokat és a fenntartható hétköznapi termékeket képviselő vizespalack.",
        winterTitle: "Sílécek és snowboardok",
        winterText: "Nagy teljesítményű anyagokat és téli sportfelszereléseket képviselő sílécek és snowboardok.",
      },
      patent: {
        eyebrow: "Szabadalmi áttekintő", hint: "Húzd el, vagy használd a nyilakat mindhárom nézet felfedezéséhez.",
        leftLabel: "01 — Műszaki leírás", centerLabel: "02 — Fő szabadalmi oldal",
        rightLabel: "03 — Képek és látványtervek", visualTitle: "Szabadalmi képtár",
        visualText: "Ide kerülnek a végleges látványtervek, műszaki rajzok, diagramok és prototípusfotók.",
        slot1Title: "Fő látványterv", slot1Text: "Ajánlott: 1600 × 1200 px",
        slot2Title: "Műszaki rajz", slot2Text: "PNG, JPG, WebP vagy SVG",
        slot3Title: "Alkatrészrészlet", slot3Text: "Közeli kép vagy metszeti nézet",
        slot4Title: "További látványterv", slot4Text: "Diagram, render vagy prototípus",
      },
      cookiePreferences: "Süti beállítások", cvTitle: "Önéletrajz",
      showcaseStory: "Bemutató történet", sending: "Küldés...",
      sent: "Az üzenetet sikeresen elküldtük. Köszönjük!",
      formError: "Hiba történt. Kérjük, próbáld újra.",
      networkError: "Hálózati hiba — kérjük, próbáld újra.",
    },
    footer: {
      brand: "Montana Vision",
      rights: "Minden jog fenntartva © Az Ön cége — 2025",
      home: "Kezdőlap",
      about: "Rólunk",
      contact: "Kapcsolat",
      impressum: "Impresszum",
      privacy: "Adatvedelem",
      cookies: "Cookie beallitasok",
      terms: "Feltételek",
    },
  },
};

let currentLang = localStorage.getItem("lang") || "en";
const langBtns = document.querySelectorAll(".langBtn");

const getTranslation = (lang, key) => {
  const parts = key.split(".");
  let value = translations[lang];
  for (const part of parts) {
    value = value?.[part];
  }
  return value;
};

const updateMediaLightboxContent = () => {
  const lightboxTitle = document.getElementById("mediaLightboxTitle");
  const lightboxEyebrow = document.getElementById("mediaLightboxEyebrow");
  const lightboxDescription = document.getElementById("mediaLightboxDescription");
  const lightboxNote = document.getElementById("mediaLightboxNote");

  if (!lightboxTitle || !lightboxEyebrow || !lightboxDescription || !lightboxNote) return;

  if (!currentMediaLightboxKey) {
    lightboxEyebrow.textContent = getTranslation(currentLang, "ui.showcaseStory") || "Showcase story";
    lightboxTitle.textContent = "";
    lightboxDescription.textContent = "";
    lightboxNote.textContent = "";
    return;
  }

  const content =
    getTranslation(currentLang, `ui.lightbox.${currentMediaLightboxKey}`) ||
    getTranslation(currentLang, `showcase.lightbox.${currentMediaLightboxKey}`) ||
    getTranslation("en", `showcase.lightbox.${currentMediaLightboxKey}`);

  if (!content) return;

  lightboxEyebrow.textContent =
    content.eyebrow ||
    getTranslation(currentLang, "ui.showcaseStory") ||
    "Showcase story";
  lightboxTitle.textContent = content.title || "";
  lightboxDescription.textContent = content.text || "";
  lightboxNote.textContent = content.note || "";
};

const setLanguage = (lang) => {
  const activeLang = translations[lang] ? lang : "en";
  currentLang = activeLang;
  localStorage.setItem("lang", activeLang);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const text = getTranslation(activeLang, key);
    if (text) element.textContent = text;
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const key = element.getAttribute("data-i18n-html");
    const text = getTranslation(activeLang, key);
    if (text) element.innerHTML = text;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    const text = getTranslation(activeLang, key);
    if (text) element.setAttribute("placeholder", text);
  });

  document.querySelectorAll("[data-i18n-value]").forEach((element) => {
    const key = element.getAttribute("data-i18n-value");
    const text = getTranslation(activeLang, key);
    if (text) element.setAttribute("value", text);
  });

  langBtns.forEach((btn) => {
    btn.classList.toggle("is-active", btn.getAttribute("data-lang") === activeLang);
  });

  document.documentElement.lang = activeLang;
  updateMediaLightboxContent();
};

document.addEventListener("click", (event) => {
  if (event.target.closest("#footerCookieSettings")) {
    document.getElementById("open_preferences_center")?.click();
    return;
  }
  if (!mobileNav || mobileNav.hidden || !menuBtn) return;
  if (mobileNav.contains(event.target) || menuBtn.contains(event.target)) return;
  mobileNav.hidden = true;
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-label", "Open menu");
});

window.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !mobileNav || mobileNav.hidden) return;
  mobileNav.hidden = true;
  menuBtn?.setAttribute("aria-expanded", "false");
  menuBtn?.focus();
});

const initScrollAutoplayVideos = () => {
  const videos = Array.from(document.querySelectorAll("#showcase video"));
  if (!videos.length) return;

  videos.forEach((video) => {
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
  });

  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          const playPromise = video.play();
          if (playPromise?.catch) playPromise.catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { threshold: [0.2, 0.55, 0.85] }
  );

  videos.forEach((video) => videoObserver.observe(video));
};

const initRevealAnimations = () => {
  const revealTargets = document.querySelectorAll(
    ".mediaTile, .showcaseCard, .cvCard, .aboutGrid__mid p, .aboutQuote, .aboutLead, .aboutCta, .feature, .mediaCard, .personWrap, .contact__left, .form"
  );

  if (!revealTargets.length) return;

  revealTargets.forEach((el) => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));
};

langBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    setLanguage(btn.getAttribute("data-lang"));
  });
});

setLanguage(currentLang);
initScrollAutoplayVideos();
initRevealAnimations();

const initHeroEnergyCanvas = () => {
  const canvas = document.getElementById("heroEnergyCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const particles = [];
  const particleCount = window.innerWidth < 700 ? 48 : 92;
  const mouse = { x: null, y: null };

  const resize = () => {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  };

  const createParticles = () => {
    particles.length = 0;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        size: Math.random() * 1.8 + 0.6,
        pulse: Math.random() * Math.PI * 2,
      });
    }
  };

  const drawConnections = () => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 135) continue;

        const alpha = (1 - distance / 135) * 0.22;
        ctx.strokeStyle = `rgba(183, 239, 153, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  };

  const animate = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    const gradient = ctx.createRadialGradient(
      window.innerWidth * 0.5,
      window.innerHeight * 0.52,
      20,
      window.innerWidth * 0.5,
      window.innerHeight * 0.52,
      window.innerWidth * 0.48
    );

    gradient.addColorStop(0, "rgba(143, 208, 105, 0.08)");
    gradient.addColorStop(1, "rgba(143, 208, 105, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += 0.025;

      if (p.x < -20) p.x = window.innerWidth + 20;
      if (p.x > window.innerWidth + 20) p.x = -20;
      if (p.y < -20) p.y = window.innerHeight + 20;
      if (p.y > window.innerHeight + 20) p.y = -20;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 130) {
          const force = (130 - distance) / 130;
          p.x += (dx / distance) * force * 1.5;
          p.y += (dy / distance) * force * 1.5;
        }
      }

      const alpha = 0.32 + Math.sin(p.pulse) * 0.18;
      ctx.fillStyle = `rgba(183, 239, 153, ${alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    drawConnections();
    requestAnimationFrame(animate);
  };

  window.addEventListener("resize", () => {
    resize();
    createParticles();
  });

  window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  resize();
  createParticles();
  animate();
};

initHeroEnergyCanvas();

const initMediaRail = () => {
  const rail = document.getElementById("mediaRail");
  const prev = document.getElementById("galleryPrev");
  const next = document.getElementById("galleryNext");

  if (!rail) return;

  const scrollByCard = (direction) => {
    const firstTile = rail.querySelector(".mediaTile");
    const amount = firstTile ? firstTile.offsetWidth + 18 : 420;

    rail.scrollBy({
      left: direction * amount,
      behavior: "smooth",
    });
  };

  prev?.addEventListener("click", () => scrollByCard(-1));
  next?.addEventListener("click", () => scrollByCard(1));

  let isDown = false;
  let didDrag = false;
  let startX = 0;
  let scrollLeft = 0;

  rail.addEventListener("mousedown", (event) => {
    if (event.button !== 0) return;

    isDown = true;
    didDrag = false;
    rail.classList.add("is-dragging");

    startX = event.pageX - rail.offsetLeft;
    scrollLeft = rail.scrollLeft;
  });

  rail.addEventListener("mouseleave", () => {
    isDown = false;
    rail.classList.remove("is-dragging");
  });

  rail.addEventListener("mouseup", () => {
    isDown = false;
    rail.classList.remove("is-dragging");

    if (didDrag) {
      rail.dataset.blockClicksUntil = String(Date.now() + 180);
    }
  });

  window.addEventListener("mouseup", () => {
    if (!isDown) return;

    isDown = false;
    rail.classList.remove("is-dragging");

    if (didDrag) {
      rail.dataset.blockClicksUntil = String(Date.now() + 180);
    }
  });

  rail.addEventListener("mousemove", (event) => {
    if (!isDown) return;

    event.preventDefault();

    const x = event.pageX - rail.offsetLeft;
    const walk = (x - startX) * 1.4;

    if (Math.abs(walk) > 4) {
      didDrag = true;
    }

    rail.scrollLeft = scrollLeft - walk;
  });

  rail.addEventListener("dragstart", (event) => {
    if (event.target.closest("img")) {
      event.preventDefault();
    }
  });
};

initMediaRail();

const initMediaLightbox = () => {
  const rail = document.getElementById("mediaRail");
  const usecasesGrid = document.querySelector(".usecasesGrid");

  const lightbox = document.getElementById("mediaLightbox");
  const lightboxImage = document.getElementById("mediaLightboxImage");

  if ((!rail && !usecasesGrid) || !lightbox || !lightboxImage) return;

  const openLightbox = (key, imageSource, imageAlt) => {
    if (!key || !imageSource) return;

    currentMediaLightboxKey = key;
    lightbox.dataset.mediaKey = key;

    lightboxImage.src = imageSource;
    lightboxImage.alt = imageAlt || "Media preview";

    updateMediaLightboxContent();

    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("mediaLightboxOpen");

    requestAnimationFrame(() => {
      lightbox.classList.add("is-open");
    });
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("mediaLightboxOpen");

    currentMediaLightboxKey = null;
    updateMediaLightboxContent();

    window.setTimeout(() => {
      lightbox.hidden = true;
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImage.removeAttribute("src");
      lightboxImage.alt = "";
      lightbox.removeAttribute("data-media-key");
    }, 280);
  };

  rail?.addEventListener("click", (event) => {
    const blockClicksUntil = Number(
      rail.dataset.blockClicksUntil || "0"
    );

    if (Date.now() < blockClicksUntil) return;

    const tile = event.target.closest(".mediaTile");

    if (!tile || tile.classList.contains("mediaTile--video")) {
      return;
    }

    const image = tile.querySelector("img");

    if (!image) return;

    openLightbox(
      image.getAttribute("data-lightbox-key"),
      image.currentSrc || image.src,
      image.alt
    );
  });

  const openUsecaseCard = (card) => {
    if (!card) return;

    openLightbox(
      card.getAttribute("data-lightbox-key"),
      card.getAttribute("data-lightbox-image"),
      card.querySelector("h3")?.textContent || "Use case"
    );
  };

  usecasesGrid?.addEventListener("click", (event) => {
    const card = event.target.closest(".usecaseCard");
    openUsecaseCard(card);
  });

  usecasesGrid?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    const card = event.target.closest(".usecaseCard");

    if (!card) return;

    event.preventDefault();
    openUsecaseCard(card);
  });

  lightbox.addEventListener("click", (event) => {
    const closeTarget = event.target.closest(
      "[data-close-lightbox]"
    );

    if (!closeTarget) return;

    closeLightbox();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }
  });
};

initMediaLightbox();

/* Patent swipe initializer: left=center-right panels */
const initPatentSwipe = () => {
  const rail = document.getElementById('patentSwipe');
  if (!rail) return;
  const prev = document.getElementById('patentPrev');
  const next = document.getElementById('patentNext');
  const panels = Array.from(rail.querySelectorAll('.swipePanel'));
  const dots = Array.from(document.querySelectorAll('[data-patent-dot]'));
  let index = 1; // start center

  const updatePatentState = (newIndex) => {
    index = Math.max(0, Math.min(panels.length - 1, newIndex));
    prev?.toggleAttribute('disabled', index === 0);
    next?.toggleAttribute('disabled', index === panels.length - 1);
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === index);
    });
    rail.setAttribute('aria-label', `Patent view ${index + 1} of ${panels.length}: ${panels[index]?.dataset.panelLabel || ''}`);
  };

  const scrollToIndex = (i) => {
    const panel = panels[i];
    if (!panel) return;
    rail.scrollTo({ left: panel.offsetLeft - (rail.clientWidth - panel.clientWidth)/2, behavior: 'smooth' });
    updatePatentState(i);
  };

  prev?.addEventListener('click', () => scrollToIndex(Math.max(0, index - 1)));
  next?.addEventListener('click', () => scrollToIndex(Math.min(panels.length - 1, index + 1)));

  // allow swipe via wheel/drag
  let isDown = false, startX, scrollLeft;
  rail.addEventListener('mousedown', (e) => { isDown = true; rail.classList.add('is-dragging'); startX = e.pageX - rail.offsetLeft; scrollLeft = rail.scrollLeft; });
  window.addEventListener('mouseup', () => { isDown = false; rail.classList.remove('is-dragging'); });
  rail.addEventListener('mousemove', (e) => { if (!isDown) return; e.preventDefault(); const x = e.pageX - rail.offsetLeft; const walk = (x - startX) * 1.2; rail.scrollLeft = scrollLeft - walk; });

  let scrollTimer;
  rail.addEventListener('scroll', () => {
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(() => {
      const railCenter = rail.scrollLeft + rail.clientWidth / 2;
      const closestIndex = panels.reduce((bestIndex, panel, panelIndex) => {
        const panelCenter = panel.offsetLeft + panel.clientWidth / 2;
        const bestPanel = panels[bestIndex];
        const bestCenter = bestPanel.offsetLeft + bestPanel.clientWidth / 2;
        return Math.abs(panelCenter - railCenter) < Math.abs(bestCenter - railCenter)
          ? panelIndex
          : bestIndex;
      }, 0);
      updatePatentState(closestIndex);
    }, 100);
  }, { passive: true });

  rail.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    scrollToIndex(index + (event.key === 'ArrowRight' ? 1 : -1));
  });

  // center on the middle panel on load (immediate then smooth)
  if (panels[1]) {
    // immediate snap to center to avoid initial left-offset rendering
    rail.scrollLeft = panels[1].offsetLeft - Math.max(0, (rail.clientWidth - panels[1].clientWidth) / 2);
    // then apply a small smooth scroll to ensure consistent behavior across viewports
    setTimeout(() => scrollToIndex(1), 80);
  }
  updatePatentState(1);

  let resizeTimer;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => scrollToIndex(index), 120);
  });
};

initPatentSwipe();
