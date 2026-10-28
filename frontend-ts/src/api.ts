import type { Page, ProductItem } from './types'

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')
let DJANGO_STORE_URL = (import.meta.env.VITE_DJANGO_STORE_URL || 'http://localhost:8000').replace(
  /\/+$/,
  '',
)

export type CommonData = {
  djangoStoreBaseUrl?: string
  djangoStoreUrls?: Record<string, string>
}

export function setStoreBaseUrl(url?: string): void {
  if (url) {
    DJANGO_STORE_URL = url.replace(/\/+$/, '')
  }
}

export function getStoreUrl(pathOrUrl: string): string {
  const storeBase = `${DJANGO_STORE_URL}/`
  const target = new URL(pathOrUrl, storeBase)
  const configuredStore = new URL(storeBase)
  const isLocalHost = ['localhost', '127.0.0.1'].includes(target.hostname)
  const storeIsRemote = !['localhost', '127.0.0.1'].includes(configuredStore.hostname)

  if (isLocalHost && storeIsRemote) {
    return new URL(`${target.pathname}${target.search}${target.hash}`, storeBase).toString()
  }

  return target.toString()
}

export const getCommon = (): Promise<CommonData> => fetchJson<CommonData>('/api/common')

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message)
    this.name = 'ApiError'
  }
}

// 2.3.5. Generic Fetch Function
export async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    signal: AbortSignal.timeout(10000),
  })
  if (!response.ok) {
    throw new ApiError(`Помилка запиту (${response.status}): ${response.statusText}`, response.status)
  }
  return (await response.json()) as T
}

export const getPageBySlug = async (slug: string): Promise<Page> => {
  try {
    return await fetchJson<Page>(`/api/page-by-slug/${encodeURIComponent(slug)}`)
  } catch (err: any) {
    if (err instanceof ApiError && err.status === 404) {
      return getMockPage(slug)
    }

    if (err?.name === 'TypeError' || err?.name === 'TimeoutError') {
      console.info('Payload CMS недоступна — використовується локальний мок-контент для демонстрації.')
      return getMockPage(slug)
    }
    throw err
  }
}

export const getBestsellers = async (limit: number = 3): Promise<ProductItem[]> => {
  try {
    const products = await fetchJson<ProductItem[]>(`/api/bestsellers?limit=${limit}`)
    return products.length ? products : getMockBestsellers().slice(0, limit)
  } catch (error: any) {
    if (error?.name === 'TypeError' || error?.name === 'TimeoutError') {
      return getMockBestsellers()
    }
    throw error
  }
}

// Мок-дані за замовчуванням (відповідають товарам із Розділу 1 Django)
function getMockPage(slug: string): Page {
  if (slug === 'catalog') {
    return {
      id: 'fallback-catalog',
      title: 'Каталог LioraShop',
      slug,
      layout: [
        {
          blockType: 'hero',
          badge: 'Каталог LioraShop',
          heading: 'Догляд, який розуміє ваша шкіра',
          subheading:
            'Перегляньте повний каталог засобів Liora в офіційному магазині та знайдіть щоденний догляд для себе.',
          ctaText: 'Відкрити каталог',
          ctaLink: getStoreUrl('/katalog/'),
        },
        {
          blockType: 'bestsellers',
          title: 'Популярні засоби',
          subtitle: 'Перевірені формули, які обирають найчастіше.',
          limit: 3,
        },
        {
          blockType: 'cta',
          headline: 'Усі засоби Liora в одному місці',
          caption: 'Перейдіть до повного каталогу та оформіть замовлення в LioraShop.',
          buttonLabel: 'Перейти до LioraShop',
          targetUrl: getStoreUrl('/katalog/'),
        },
      ],
    }
  }

  if (slug !== 'home' && slug !== '') {
    throw new ApiError('Сторінку не знайдено', 404)
  }

  return {
    id: 1,
    title: 'Головна',
    slug: 'home',
    layout: [
      {
        blockType: 'hero',
        badge: 'Справжній фізіологічний догляд',
        heading: 'Шкіра спокійна. Склад читається.',
        subheading:
          'Liora збирає засоби без зайвого аромату та подразників: очищення, тоніки, сироватки, креми, маски, сонцезахист і догляд за тілом. Створено з повагою до природного барʼєру.',
        ctaText: 'Перейти до каталогу LioraShop',
        ctaLink: getStoreUrl('/katalog/'),
      },
      {
        blockType: 'philosophy',
        title: 'Чому саме косметика Liora?',
        description:
          'Ми віримо, що здорова шкіра не потребує агресивних пілінгів чи штучних барвників. Формули Liora відновлюють природні захисні ліпіди.',
        features: [
          {
            title: 'Фізіологічний склад',
            text: 'Цераміди NP, сквалан, жирні кислоти та натуральні рослинні екстракти, які шкіра сприймає як рідні.',
          },
          {
            title: 'Прозора дія',
            text: 'Жодних прихованих ароматизаторів або агресивних сульфатів. Повний склад написано простою мовою.',
          },
          {
            title: 'Сім полиць — одна рутина',
            text: 'Кожен засіб має чітке місце в щоденному догляді: від ранкового гелю до сонцезахисту SPF 50.',
          },
        ],
      },
      {
        blockType: 'bestsellers',
        title: 'Те, що обирають знову і знову',
        subtitle: 'Перевірені формули, які стали фаворитами наших клієнтів в інтернет-магазині Liora.',
        limit: 3,
      },
      {
        blockType: 'routine',
        title: 'Чотири золоті кроки щоденного догляду',
        steps: [
          {
            stepNumber: '01',
            name: 'Очищення',
            tip: 'Мʼякий гель з вівсяними протеїнами або гідрофільна олія без стягнення та відчуття плівки.',
          },
          {
            stepNumber: '02',
            name: 'Тонізація',
            tip: 'Березовий сік і трояндова вода відновлюють гідробаланс відразу після вмивання.',
          },
          {
            stepNumber: '03',
            name: 'Сироватка',
            tip: 'Активна дія: стабільний вітамін C вранці для сяйва або ніацинамід увечері для рівного тону.',
          },
          {
            stepNumber: '04',
            name: 'Крем та SPF',
            tip: 'Крем «Барʼєр» утримує вологу, а невагомий SPF 50 «Легка вуаль» захищає клітини щодня.',
          },
        ],
      },
      {
        blockType: 'cta',
        headline: 'Почніть свій шлях до спокійної шкіри вже сьогодні',
        caption:
          'Замовляйте косметику Liora в нашому офіційному магазині на Django. Швидка доставка Новою поштою, оплата при отриманні та безкоштовна доставка від 1 500 грн.',
        buttonLabel: 'Перейти в магазин LioraShop',
        targetUrl: getStoreUrl('/katalog/'),
      },
    ],
  }
}

function getMockBestsellers(): ProductItem[] {
  return [
    {
      id: 1,
      title: 'Крем «Барʼєр»',
      tagline: 'Щоденний крем із церамідами та скваланом',
      category: 'Креми',
      price: 720,
      volume: '50 мл',
      isBestseller: true,
      djangoUrl: getStoreUrl('/tovar/krem-barier/'),
    },
    {
      id: 2,
      title: 'SPF 50 «Легка вуаль»',
      tagline: 'Щоденний захист нового покоління без білих слідів',
      category: 'Сонцезахист',
      price: 690,
      volume: '50 мл',
      isBestseller: true,
      djangoUrl: getStoreUrl('/tovar/spf-50-lehka-vual/'),
    },
    {
      id: 3,
      title: 'Гель для вмивання «Вівсяний»',
      tagline: 'Делікатне очищення для сухої та чутливої шкіри',
      category: 'Очищення',
      price: 470,
      volume: '150 мл',
      isBestseller: true,
      djangoUrl: getStoreUrl('/tovar/hel-dlia-vmyvannia-vivsianyi/'),
    },
  ]
}
