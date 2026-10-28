import type { PhilosophyBlock } from '../../types'
import './philosophy.css'

export function renderPhilosophy(block: PhilosophyBlock): string {
  const featuresHtml = block.features
    .map(
      (feat, index) => `
      <div class="feature-card">
        <div class="feature-icon-badge">0${index + 1}</div>
        <h3 class="feature-card-title">${feat.title}</h3>
        <p class="feature-card-text">${feat.text}</p>
      </div>
    `
    )
    .join('')

  return `
    <section id="philosophy" class="philosophy-section">
      <div class="container">
        <div class="philosophy-header">
          <h2 class="philosophy-title">${block.title}</h2>
          <p class="philosophy-desc">${block.description}</p>
        </div>
        <div class="features-grid">
          ${featuresHtml}
        </div>
      </div>
    </section>
  `
}
