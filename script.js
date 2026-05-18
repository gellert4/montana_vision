const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
const cvModal = document.getElementById("cvModal");
const openCvBtn = document.getElementById("openCvBtn");
const cvFrame = cvModal?.querySelector(".cvModal__frame");
const topbar = document.querySelector(".topbar");

// Cookie handling is now managed by TermsFeed Cookie Consent (script in head)
// No custom cookie logic needed

menuBtn?.addEventListener("click", () => {
  const isHidden = mobileNav?.hasAttribute("hidden");
  if (!mobileNav) return;

  if (isHidden) mobileNav.removeAttribute("hidden");
  else mobileNav.setAttribute("hidden", "true");
});

mobileNav?.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (!a) return;
  mobileNav.setAttribute("hidden", "true");
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

openCvBtn?.addEventListener("click", openCvModal);

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
      ownerTitle: "Owner Spotlight: Stephan",
      carsTitle: "Cars & Performance",
      video1Title: "Owner Video",
      video2Title: "Company & Technology Video",
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
      titleRole: "Founder, Inventor, Motorsport Engineer",
      lead:
        "Born in Berlin in 1960, Stephan Geschke combines championship-level powerboat racing experience with mechanical engineering, marine performance, combustion research, and long-term propulsion development.",
      stat1: "German Champion",
      stat2: "European Champion",
      stat3: "World Champion",
      stat4: "6 Heures de Paris Winner",
      bornLabel: "Born",
      bornValue: "January 27, 1960",
      baseLabel: "Base",
      baseValue: "Staad, Switzerland",
      roleLabel: "Current Role",
      roleValue: "Founder, NEWGREEN AG / INC / Ltd",
      doctoralLabel: "Doctoral Track",
      doctoralValue: "Mechanical Engineering since 2022",
      racingLabel: "Racing Legacy",
      racingValue: "Powerboat performance background",
      cvBtn: "Open full CV (PDF)",
      timeline1Range: "1976 - 1984",
      timeline1Title: "Powerboat Racing",
      timeline1Text: "Active race driver with national, European, and world championship results.",
      timeline2Range: "1987 - 2000",
      timeline2Title: "Geschke Marine Performance",
      timeline2Text: "Boat and engine trading, repair, maintenance, and early emissions research.",
      timeline3Range: "2005 - 2011",
      timeline3Title: "Pro-One AG",
      timeline3Text: "Prototype development, hybrid-drive research, and early vehicle technology work.",
      timeline4Range: "2021 - Present",
      timeline4Title: "NEWGREEN",
      timeline4Text: "Combustion optimization, patent development, and Montana Motors prototyping.",
    },
    contact: {
      title: "REACH OUT TO SHAPE<br />YOUR INDUSTRY",
      phone: "+41 76 505 09 00",
      email: "s.geschke@newgreen.eu",
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
    footer: {
      brand: "Montana Vision | NEWGREEN",
      rights: "All Rights Reserved © Your Company — 2025",
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
      ownerTitle: "Inhaber im Fokus: Stephan",
      carsTitle: "Autos & Performance",
      video1Title: "Inhaber-Video",
      video2Title: "Unternehmen & Technologie Video",
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
      titleRole: "Gründer, Erfinder, Motorsport-Ingenieur",
      lead:
        "Geboren 1960 in Berlin, verbindet Stephan Geschke Erfahrung aus dem Powerboat-Spitzensport mit Maschinenbau, Marine-Performance, Verbrennungsforschung und langfristiger Antriebsentwicklung.",
      stat1: "Deutscher Meister",
      stat2: "Europameister",
      stat3: "Weltmeister",
      stat4: "Sieger 6 Heures de Paris",
      bornLabel: "Geboren",
      bornValue: "27. Januar 1960",
      baseLabel: "Standort",
      baseValue: "Staad, Schweiz",
      roleLabel: "Aktuelle Rolle",
      roleValue: "Gründer, NEWGREEN AG / INC / Ltd",
      doctoralLabel: "Promotion",
      doctoralValue: "Maschinenbau seit 2022",
      racingLabel: "Rennsport-Erbe",
      racingValue: "Powerboat-Performance-Hintergrund",
      cvBtn: "Vollständigen CV öffnen (PDF)",
      timeline1Range: "1976 - 1984",
      timeline1Title: "Powerboat-Rennsport",
      timeline1Text: "Aktiver Rennfahrer mit nationalen, europäischen und Weltmeisterschaftserfolgen.",
      timeline2Range: "1987 - 2000",
      timeline2Title: "Geschke Marine Performance",
      timeline2Text: "Boots- und Motorhandel, Reparatur, Wartung und frühe Emissionsforschung.",
      timeline3Range: "2005 - 2011",
      timeline3Title: "Pro-One AG",
      timeline3Text: "Prototypenentwicklung, Hybridantriebsforschung und frühe Fahrzeugtechnologie.",
      timeline4Range: "2021 - Heute",
      timeline4Title: "NEWGREEN",
      timeline4Text: "Verbrennungsoptimierung, Patententwicklung und Montana-Motors-Prototyping.",
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
      ownerTitle: "Tulajdonos reflektorfényben: Stephan",
      carsTitle: "Autók és teljesítmény",
      video1Title: "Tulajdonosi videó",
      video2Title: "Cég és technológia videó",
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
      titleRole: "Alapító, feltaláló, motorsport mérnök",
      lead:
        "Az 1960-ban Berlinben született Stephan Geschke a csúcsszintű motorcsónak-versenyzői tapasztalatot ötvözi a gépészmérnöki, tengeri teljesítmény-, égéskutatási és hosszú távú hajtásfejlesztési munkával.",
      stat1: "Német bajnok",
      stat2: "Európa-bajnok",
      stat3: "Világbajnok",
      stat4: "6 Heures de Paris győztes",
      bornLabel: "Született",
      bornValue: "1960. január 27.",
      baseLabel: "Bázis",
      baseValue: "Staad, Svájc",
      roleLabel: "Jelenlegi szerep",
      roleValue: "Alapító, NEWGREEN AG / INC / Ltd",
      doctoralLabel: "Doktori képzés",
      doctoralValue: "Gépészmérnökség 2022 óta",
      racingLabel: "Versenyörökség",
      racingValue: "Motorcsónakos teljesítmény háttér",
      cvBtn: "Teljes CV megnyitása (PDF)",
      timeline1Range: "1976 - 1984",
      timeline1Title: "Motorcsónak versenyzés",
      timeline1Text: "Aktív versenyző nemzeti, európai és világbajnoki eredményekkel.",
      timeline2Range: "1987 - 2000",
      timeline2Title: "Geschke Marine Performance",
      timeline2Text: "Hajó- és motor-kereskedelem, javítás, karbantartás és korai emissziós kutatás.",
      timeline3Range: "2005 - 2011",
      timeline3Title: "Pro-One AG",
      timeline3Text: "Prototípus-fejlesztés, hibrid hajtás kutatás és korai járműtechnológiai munka.",
      timeline4Range: "2021 - Jelenleg",
      timeline4Title: "NEWGREEN",
      timeline4Text: "Égésoptimalizálás, szabadalomfejlesztés és Montana Motors prototípus-fejlesztés.",
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
};

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
    ".showcaseCard, .cvCard, .aboutGrid__mid p, .aboutQuote, .aboutLead, .aboutCta, .feature, .mediaCard, .personWrap, .contact__left, .form"
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
    if (didDrag) rail.dataset.blockClicksUntil = String(Date.now() + 180);
  });

  window.addEventListener("mouseup", () => {
    if (!isDown) return;
    isDown = false;
    rail.classList.remove("is-dragging");
    if (didDrag) rail.dataset.blockClicksUntil = String(Date.now() + 180);
  });

  rail.addEventListener("mousemove", (event) => {
    if (!isDown) return;
    event.preventDefault();
    const x = event.pageX - rail.offsetLeft;
    const walk = (x - startX) * 1.4;
    if (Math.abs(walk) > 4) didDrag = true;
    rail.scrollLeft = scrollLeft - walk;
  });

  rail.addEventListener("dragstart", (event) => {
    if (event.target.closest("img")) event.preventDefault();
  });
};

initMediaRail();

const initMediaLightbox = () => {
  const rail = document.getElementById("mediaRail");
  const lightbox = document.getElementById("mediaLightbox");
  const lightboxImage = document.getElementById("mediaLightboxImage");

  if (!rail || !lightbox || !lightboxImage) return;

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("mediaLightboxOpen");

    window.setTimeout(() => {
      lightbox.hidden = true;
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImage.removeAttribute("src");
      lightboxImage.alt = "";
    }, 280);
  };

  rail.addEventListener("click", (event) => {
    const blockClicksUntil = Number(rail.dataset.blockClicksUntil || "0");
    if (Date.now() < blockClicksUntil) return;

    const tile = event.target.closest(".mediaTile");
    if (!tile || tile.classList.contains("mediaTile--video")) return;

    const image = tile.querySelector("img");
    if (!image) return;

    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || "Media preview";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("mediaLightboxOpen");

    requestAnimationFrame(() => {
      lightbox.classList.add("is-open");
    });
  });

  lightbox.addEventListener("click", (event) => {
    const closeTarget = event.target.closest("[data-close-lightbox]");
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
