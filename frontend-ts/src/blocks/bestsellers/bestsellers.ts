import type { BestsellersBlock, ProductItem } from '../../types'
import './bestsellers.css'

export function renderBestsellers(block: BestsellersBlock, products: ProductItem[] = []): string {
  const displayedProducts = products.slice(0, block.limit)

  const itemsHtml = displayedProducts
    .map((item) => {
      const imgHtml = item.image?.url
        ? `<img src="${item.image.url}" alt="${item.image.alt || item.title}" style="max-height:100%; object-fit:contain;" />`
        : `
          <div class="product-bottle-silhouette">
            <span class="product-bottle-label">LIORA</span>
            <span style="font-size:0.65rem; color:#888;">${item.volume}</span>
          </div>
        `

      return `
        <article class="product-card">
          <div class="product-img-box">
            ${imgHtml}
          </div>
          <span class="product-category">${item.category}</span>
          <h3 class="product-name">${item.title}</h3>
          <p class="product-tagline">${item.tagline || ''}</p>
          <div class="product-meta">
            <span class="product-price">${item.price} грн</span>
            <span class="product-vol">${item.volume}</span>
          </div>
          <a href="${item.djangoUrl}" target="_blank" class="product-buy-btn">
            Купити на LioraShop &rarr;
          </a>
        </article>
      `
    })
    .join('')

  return `
    <section id="bestsellers" class="bestsellers-section">
      <div class="container">
        <div class="bestsellers-header">
          <h2 class="bestsellers-title">${block.title}</h2>
          ${block.subtitle ? `<p class="bestsellers-subtitle">${block.subtitle}</p>` : ''}
        </div>
        <div class="bestsellers-grid">
          ${itemsHtml}
        </div>
      </div>
    </section>
  `
}
