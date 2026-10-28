import type { CtaBlock } from '../../types'
import './cta.css'

export function renderCta(block: CtaBlock): string {
  return `
    <section class="cta-section">
      <div class="container">
        <div class="cta-box">
          <h2 class="cta-headline">${block.headline}</h2>
          ${block.caption ? `<p class="cta-caption">${block.caption}</p>` : ''}
          <a href="${block.targetUrl}" target="_blank" class="btn-primary">
            ${block.buttonLabel} &rarr;
          </a>
        </div>
      </div>
    </section>
  `
}
