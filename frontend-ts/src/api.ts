import type { Page, ProductItem } from './types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const DJANGO_STORE_URL = import.meta.env.VITE_DJANGO_STORE_URL || 'http://localhost:8000'

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message)
    this.name = 'ApiError'
  }
}

// 2.3.5. Generic Fetch Function
export async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`)
  if (!response.ok) {
    throw new ApiError(`Помилка запиту (${response.status}): ${response.statusText}`, response.status)
  }
  return (await response.json()) as T
}

export const getPageBySlug = async (slug: string): Promise<Page> => {
  try {
    return await fetchJson<Page>(`/api/page-by-slug/${encodeURIComponent(slug)}`)
  } catch (err: any) {
    // Якщо CMS ще не запущена локально, повертаємо якісні демонстраційні дані бренду Liora
    if (err?.name === 'TypeError' || err?.message?.includes('Failed to fetch')) {
      console.info('Payload CMS недоступна — використовується локальний мок-контент для демонстрації.')
      return getMockPage(slug)
    }
    throw err
  }
}

export const getBestsellers = async (limit: number = 3): Promise<ProductItem[]> => {
  try {
    return await fetchJson<ProductItem[]>(`/api/bestsellers?limit=${limit}`)
  } catch {
    return getMockBestsellers()
  }
}

// Мок-дані за замовчуванням (відповідають товарам із Розділу 1 Django)
function getMockPage(slug: string): Page {
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
        ctaLink: `${DJANGO_STORE_URL}/katalog/`,
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
        targetUrl: `${DJANGO_STORE_URL}/katalog/`,
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
      djangoUrl: `${DJANGO_STORE_URL}/tovar/krem-barier/`,
    },
    {
      id: 2,
      title: 'SPF 50 «Легка вуаль»',
      tagline: 'Щоденний захист нового покоління без білих слідів',
      category: 'Сонцезахист',
      price: 690,
      volume: '50 мл',
      isBestseller: true,
      djangoUrl: `${DJANGO_STORE_URL}/tovar/spf-50-lehka-vual/`,
    },
    {
      id: 3,
      title: 'Гель для вмивання «Вівсяний»',
      tagline: 'Делікатне очищення для сухої та чутливої шкіри',
      category: 'Очищення',
      price: 470,
      volume: '150 мл',
      isBestseller: true,
      djangoUrl: `${DJANGO_STORE_URL}/tovar/hel-dlia-vmyvannia-vivsianyi/`,
    },
  ]
}
