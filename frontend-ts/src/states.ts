// 2.2.4. UI States Rendering (Loading, 404, Error)
export function renderLoading(): string {
  return `
    <div class="state-container">
      <div class="state-spinner"></div>
      <h3 class="state-title">Завантаження Liora...</h3>
      <p class="state-text">Отримуємо актуальні дані та бестселери догляду.</p>
    </div>
  `
}

export function renderNotFound(): string {
  return `
    <div class="state-container">
      <h2 class="state-title" style="font-size: 3.5rem;">404</h2>
      <h3 style="font-family:var(--font-serif); font-size:1.6rem; margin-bottom:12px;">Сторінку не знайдено</h3>
      <p class="state-text">Можливо, адреса застаріла або сторінку було переміщено.</p>
      <a href="/" class="btn-primary">Повернутися на головну</a>
    </div>
  `
}

export function renderError(message: string): string {
  return `
    <div class="state-container">
      <h3 class="state-title" style="color: #a3384f;">Щось пішло не так</h3>
      <p class="state-text">${message}</p>
      <button id="retry-btn" class="btn-primary">Спробувати ще</button>
    </div>
  `
}
