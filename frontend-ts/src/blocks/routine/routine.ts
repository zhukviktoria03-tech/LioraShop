import type { RoutineBlock } from '../../types'
import './routine.css'

export function renderRoutine(block: RoutineBlock): string {
  const stepsHtml = block.steps
    .map(
      (step) => `
      <div class="routine-step-card">
        <div class="step-num">${step.stepNumber}</div>
        <h3 class="step-name">${step.name}</h3>
        <p class="step-tip">${step.tip}</p>
      </div>
    `
    )
    .join('')

  return `
    <section id="routine" class="routine-section">
      <div class="container">
        <div class="routine-header">
          <h2 class="routine-title">${block.title}</h2>
        </div>
        <div class="routine-grid">
          ${stepsHtml}
        </div>
      </div>
    </section>
  `
}
