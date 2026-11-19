interface TrailOptions { perspective?: number; totalTrailElements: number }
export class TrailImage {
  constructor(element: HTMLElement, options: TrailOptions)
  DOM: { trailElems: NodeListOf<HTMLElement> }
  reset(): void
}
export class TrailText extends TrailImage {}
