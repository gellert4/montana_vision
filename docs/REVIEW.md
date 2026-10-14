# Montana Vision refinement review

Base: `c92ac2456cba6a1a94bd03e9550cb6a165ede65d`, original `gellert4/montana_vision`.
Branch: `codex/website-refinement-2026-10-14`. No production deployment or merge is included.

## Design decisions

Keep the full-width blue/red Montana hero, existing section sequence, founder story, palette and multilingual content. Add a quiet editorial introduction beneath the hero rather than obscuring its logo. Reduce floating, twinkling and decorative animation; simplify corners and shadows. Keep all source assets.

The implementation adds media categories, keyboard activation, document search, actual technical illustrations, source links, purpose-specific inquiry selection and accessible field labels. The original main experience remains a static site with no framework or runtime dependencies. Development-only DOM tests use linkedom.

### Benchmark review, 14 October 2026

- [Achates Power](https://achatespower.com/): clear paths from applications to technology papers and partnerships. Adopted direct access to original publications and a topic-specific inquiry path. This is a relevant propulsion benchmark, not a claim that Montana competes at the same scale.
- [AVL e-mobility engineering](https://www.avl.com/en/engineering/e-mobility-engineering): engineering services grouped around an understandable capability and collaboration path. Adopted clearer hierarchy and engineering-focused media discovery; did not copy copywriting or visuals.
- [Cummins technology](https://www.cummins.com/en-na/technology/solutions): useful technology navigation and application framing. Retained Montana's own identity and project material rather than importing their claims.

## Source review

Inspected the original HTML, behaviour code, asset inventory, image contact sheet and first pages of all eight PDFs. `patent3.pdf` has extractable text; other patent covers and the CV were visually inspected. This is not a full technical or legal examination of every page of the 19-page US document.

- `patent6.pdf`: WO 2023/118534 A1, PCT/EP2022/087654, filed 22 December 2022, priority DE 10 2021 134 521.9, published 29 June 2023. Cover lists NEWGREEN AG and NEWGREEN AMERICAN INC.
- `patent2.pdf`: WO 2023/118525 A1, related connecting-rod material.
- `patent3.pdf`: DE 10 2021 134 521 A1, diesel engine with injection and charging.
- `patent1.pdf`: US 2025/0341180 A1, published application, 6 November 2025; cover names Stephan Geschke. Do not treat this as evidence that every filing belongs to NEWGREEN AG.
- `patent4.pdf`: AT 007 203 U1; third-party background reference (AVL named on cover), not Montana-owned IP.
- `patent5.pdf`: DE 34 05 715 A1; third-party historical background reference, not Montana-owned IP.
- The diploma supports the Diplom-Ingenieur designation; do not infer a completed doctorate from it.

Original claims of 18.5:1 compression, 2,500 bar pressure, forged steel, a passed 1,000-hour/550°C test, and up to 12% emissions reduction were not substantiated by the reviewed source material. They are replaced in visible content with publication-backed descriptions. Historical translation strings remain in the original dictionary for traceability but reviewed overrides control all languages. Do not reintroduce numerical performance claims without evidence identifying the test method, baseline and operating conditions.

## Privacy and legal implementation

Removed TermsFeed's implied-consent configuration, which enabled functionality, tracking and targeting on load despite a contrary privacy statement. Removed externally requested Google Fonts. Language selection now lives only in memory; no persistent preference storage. No analytics, advertising or external video embeds are introduced, so there is no misleading consent banner for nonexistent tracking. The footer links to an accurate storage explanation.

The existing Web3Forms integration remains; a just-in-time privacy explanation and direct email alternative are provided. No automatic outbound form submission occurs. Technical tests mock transport. The processor's current public policy describes India-based operations, international infrastructure, anti-spam subprocessors and potentially lengthy retention; these are disclosed, not hidden behind a checkbox.

Privacy, operator notice and website-use terms are available in English, German and Hungarian. Removed the obsolete blanket German TMG citation from a Swiss operator's imprint. Terms are informational website terms, not invented sales or licence conditions.

Sources:
- [FDPIC: privacy statements on the internet](https://www.edoeb.admin.ch/de/datenschutzerklaerungen-im-internet)
- [FDPIC: cookies guidance](https://www.edoeb.admin.ch/de/cookies-praktische-tipps)
- [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [GitHub privacy](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement)
- [Web3Forms privacy](https://web3forms.com/privacy)

## Release gates: owner review required

This branch is a review candidate, not a certification of legal compliance.

1. Confirm whether NEWGREEN AG is the actual operator/controller of Montana Vision, its current address and representative authority. Supply the applicable register, register number and UID. Existing contact details are preserved, not independently certified.
2. Confirm GitHub Pages is the production host; review service terms, lawful processing and applicable international-transfer arrangements. A different host requires updating the notice.
3. Review/accept the processor agreement and transfer safeguards for Web3Forms; confirm account configuration, mailbox recipient, optional integrations and deletion/retention settings. Establish the controller's own inquiry deletion schedule and email-provider disclosure. These settings are not accessible from repository code.
4. Verify rights to the vehicle renderings, manufacturer marks, photography, logo, CV publication and all supplied documents. The US, PCT and third-party documents must not be conflated as one owned portfolio. Public availability is not a reuse licence.
5. Verify founder biography, doctorate/research wording, historical achievements and environmental claims against approved source material. Existing biography has not been independently certified.
6. Obtain jurisdiction-specific legal review for Swiss operation and any EU targeting. Finalize notices after the above facts are confirmed; remove review-version notices only when resolved.
7. Complete real-browser desktop/mobile visual QA and a deliberately authorized form-delivery test. No emails were sent in this work.
8. Review film accessibility: supply/approve a transcript and captions. The existing sound track is retained; playback no longer starts automatically. This work does not claim WCAG conformance.

## Assets and testing

All originals are retained. Referenced images have WebP derivatives. The 112-second LFS film is also supplied as a roughly 7.6 MB H.264/AAC derivative with fast-start metadata and explicit non-LFS attributes, because GitHub Pages does not serve LFS pointers as video. The film loads only when requested (`preload="none"`); the gallery uses a local poster. Existing audio is retained.

Run `npm install` then `npm test` and `npm run check`. Tests execute actual scripts against a lightweight DOM, exercise all three languages, filters, document search and menu, validate local resource links and labels, and mock form success/failure and duplicate-submit handling. They intentionally do not send inquiries.

Browser QA was unavailable under the environment's Sites guidance: managed Linux requires the control-browser capability, which was not exposed. No browser screenshot, visual regression, real layout measurement, or cross-browser compatibility result is claimed. Existing CSS has accumulated overrides; this change adds an isolated refinement stylesheet instead of attempting an unverified complete rewrite.
