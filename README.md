# Montana Vision

Static multilingual engineering website. Open `index.html` via a local static server. Production remains on the existing GitHub Pages setup.

This review branch preserves the original design direction and adds media filters, a source-document library, accessible form labels and dialogs, optimized local media and revised legal pages.

**Before merging or publishing:** read [the review and release gates](docs/REVIEW.md). The operator identity, processor arrangements and content rights require confirmation. This is not a legal-compliance certification.

## Development checks

```sh
npm install
npm test
npm run check
```

No runtime dependencies or build step. Tests use a lightweight DOM and mocked form transport, not a real browser. Changes are isolated from `main` until explicitly reviewed and merged.
