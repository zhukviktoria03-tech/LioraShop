import type { Block, ProductItem } from './types'
import { renderHero } from './blocks/hero/hero'
import { renderPhilosophy } from './blocks/philosophy/philosophy'
import { renderBestsellers } from './blocks/bestsellers/bestsellers'
import { renderRoutine } from './blocks/routine/routine'
import { renderCta } from './blocks/cta/cta'

// 2.2.3. Dispatcher for blocks
export function renderBlock(block: Block, products: ProductItem[]): string {
  switch (block.blockType) {
    case 'hero':
      return renderHero(block)
    case 'philosophy':
      return renderPhilosophy(block)
    case 'bestsellers':
      return renderBestsellers(block, products)
    case 'routine':
      return renderRoutine(block)
    case 'cta':
      return renderCta(block)
    default:
      console.warn('Невідомий блок:', block)
      return ''
  }
}

export function renderBlocks(blocks: Block[], products: ProductItem[]): string {
  return blocks.map((b) => renderBlock(b, products)).join('')
}
