import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { CdVisualizerService } from './cd-visualizer.service';


export interface CdvVisualizerViewTitle {
  viewType: string;
  viewDetails: string;
}

@Directive({
  selector: '[cdVisualizer]',
  standalone: true,
  exportAs: 'cdv'
})
export class CdVisualizerDirective {
  @Input() cdVisualizer: unknown;
  @Input() viewTitle: CdvVisualizerViewTitle = {
    viewType: '',
    viewDetails: ''
  };
  private doc = inject(DOCUMENT);
  private cdVisualizerService = inject(CdVisualizerService);
  private hostElement = inject(ElementRef<HTMLElement>).nativeElement;
  private cdvCircle!: HTMLElement;
  private cdCounter = 0;
  count = this._count.bind(this);
  ngZone = inject(NgZone, { optional: true });

  constructor() {
    this.createHtmlElement(this.cdVisualizerService.getColor());
  }

  private createHtmlElement(color: string): void {
    this.cdvCircle = document.createElement('div');
    this.cdvCircle.classList.add('cdv-circle');
    this.cdvCircle.classList.add(`cdv-circle-${ color }`);
    const container = document.createElement('div');
    container.classList.add('cdv-container');
    container.classList.add(`cdv-container-${ color }`);
    setTimeout(() => {
      const title = this.doc.createElement('div');
      title.classList.add('cdv-title');
      title.append(this.doc.createTextNode(this.viewTitle.viewType));
      title.append(this.doc.createElement('br'));
      title.append(this.doc.createTextNode(this.viewTitle.viewDetails));
      container.append(title);
    });
    container.append(this.cdvCircle);
    this.hostElement.classList.add('cd-visualizer');
    this.hostElement.classList.add(`cdv-border-${ color }`);
    this.hostElement.prepend(container);
  }

  private _count() {
    this.cdCounter++;
    this.cdvCircle.classList.remove('cdv-explode');
    this.cdvCircle.textContent = this.cdCounter.toString();
    const addClass = (() => requestAnimationFrame(() => this.cdvCircle.classList.add('cdv-explode'))).bind(this);
    this.ngZone?.runOutsideAngular(addClass) || addClass();
  }
}

export function injectCdCounter(viewTitle: CdvVisualizerViewTitle) {
  const dir = inject(CdVisualizerDirective);
  dir.viewTitle = viewTitle;
  return dir.count;
}
