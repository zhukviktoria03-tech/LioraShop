import './styles/global.css'
import type { PageState } from './types'
import { getPageBySlug, getBestsellers, getCommon, getStoreUrl, setStoreBaseUrl } from './api'
import { renderBlocks } from './render'
import { renderLoading, renderNotFound, renderError } from './states'

const app = document.querySelector<HTMLDivElement>('#app')

function configureStoreLinks(): void {
  document.querySelectorAll<HTMLAnchorElement>('[data-store-path]').forEach((link) => {
    link.href = getStoreUrl(link.dataset.storePath || '/')
  })
}

configureStoreLinks()

if (!app) {
  throw new Error('Кореневий елемент #app не знайдено в DOM')
}

// 2.2.4. Finite state machine logic
async function load(slug: string = 'home'): Promise<void> {
  renderUI({ status: 'loading' })

  try {
    const [page, bestsellers, common] = await Promise.all([
      getPageBySlug(slug),
      getBestsellers(3),
      getCommon().catch(() => null),
    ])

    setStoreBaseUrl(common?.djangoStoreBaseUrl)
    configureStoreLinks()
    renderUI({ status: 'success', data: page, bestsellers })
  } catch (error: any) {
    if (error?.status === 404) {
      renderUI({ status: 'notFound' })
    } else {
      renderUI({
        status: 'error',
        message: error?.message || 'Не вдалося встановити звʼязок із сервером',
      })
    }
  }
}

function renderUI(state: PageState): void {
  if (!app) return

  switch (state.status) {
    case 'loading':
      app.innerHTML = renderLoading()
      break

    case 'success':
      app.innerHTML = renderBlocks(state.data.layout, state.bestsellers)
      break

    case 'notFound':
      app.innerHTML = renderNotFound()
      break

    case 'error':
      app.innerHTML = renderError(state.message)
      document.querySelector('#retry-btn')?.addEventListener('click', () => {
        load('home')
      })
      break
  }
}

// Визначення слага сторінки з URL
const pathname = window.location.pathname.replace(/^\/|\/$/g, '')
const initialSlug = pathname || 'home'

load(initialSlug)
