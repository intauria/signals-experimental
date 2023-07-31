import { DOCUMENT } from "@angular/common";
import { Injectable, inject } from "@angular/core";
import { CD_VISUALIZER_GLOBAL_STYLES } from "./cd-visualizer.styles";


@Injectable({
  providedIn: 'root'
})
export class CdVisualizerService {
  private doc = inject(DOCUMENT);
  private head = this.doc.head;
  private stylesCache: Record<string, boolean> = {};
  private colors = [
    'green', 'pink', 'brown', 'blue', 'gold', 'gray', 'orange', 'purple'
  ];
  private colorIndex = 0;

  constructor() {
    this.addGlobalStyles();
  }

  private addStyleToHead(key: string, stylesStr: string) {
    if (!this.stylesCache[key]) {
      const style = this.doc.createElement('style');
      style.textContent = stylesStr;
      this.head.appendChild(style);
      this.stylesCache[key] = true;
    }
  }

  private addGlobalStyles(): void {
    this.addStyleToHead(
      CD_VISUALIZER_GLOBAL_STYLES.key,
      CD_VISUALIZER_GLOBAL_STYLES.definition
    );
  }

  getColor(): string {
    this.colorIndex = this.colorIndex >= this.colors.length ? 0 : this.colorIndex;
    return this.colors[this.colorIndex++];
  }
}
