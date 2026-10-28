import type { HeroBlock } from '../../types'
import { getStoreUrl } from '../../api'
import './hero.css'

export function renderHero(block: HeroBlock): string {
  const badgeHtml = block.badge ? `<span class="hero-badge">${block.badge}</span>` : ''
  const imageUrl = block.image?.sizes?.tablet?.url || block.image?.url

  const mediaHtml = imageUrl
    ? `<div class="hero-card-preview"><img src="${imageUrl}" alt="${block.image?.alt || 'Liora'}" style="max-width:100%; border-radius:16px;" /></div>`
    : `
      <div class="hero-card-preview">
        <div class="hero-mock-bottle">
          <div class="hero-mock-label">LIORA</div>
          <div class="hero-mock-sub">Легка вуаль SPF 50</div>
          <div style="font-size:0.7rem; color:#888; margin-top:8px;">50 мл</div>
        </div>
        <p style="font-family:var(--font-serif); font-size:1.1rem; color:var(--color-primary);">Чиста рутина без запаху</p>
        <span style="font-size:0.85rem; color:var(--color-text-muted);">Відновлення ліпідного шару шкіри</span>
      </div>
    `

  return `
    <section class="hero-section">
      <div class="container hero-grid">
        <div class="hero-content">
          ${badgeHtml}
          <h1 class="hero-title">${block.heading}</h1>
          <p class="hero-desc">${block.subheading || ''}</p>
          <div class="hero-actions">
            <a href="${getStoreUrl(block.ctaLink)}" target="_blank" rel="noopener noreferrer" class="btn-primary">${block.ctaText} &rarr;</a>
            <a href="#philosophy" class="btn-secondary">Дізнатися більше</a>
          </div>
        </div>
        <div class="hero-visual">
          ${mediaHtml}
        </div>
      </div>
    </section>
  `
}
