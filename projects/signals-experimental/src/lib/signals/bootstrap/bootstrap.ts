import { CustomChangeDetectionMode } from '@angular-architects/signals-experimental/core-hook';
import { DOCUMENT } from '@angular/common';
import { ApplicationRef, destroyPlatform } from '@angular/core';

let bootstrapFn: () => Promise<ApplicationRef>;
let doc: Document;
let selector: string;
let mode: CustomChangeDetectionMode;

export function bootstrapWithChangeDetectionStrategy(
  bootFn: () => Promise<ApplicationRef>,
  rootComponentSelector: string,
  changeDetectionMode: CustomChangeDetectionMode = CustomChangeDetectionMode.Zone
): Promise<ApplicationRef> {
  bootstrapFn = bootFn;
  selector = rootComponentSelector;
  mode = changeDetectionMode;

  return bootFn()
    .then(appRef => {
      doc = appRef.injector.get(DOCUMENT);
      return appRef;
    });
}

export function rebootstrapWithChangeDetectionStrategy(changeDetectionMode: CustomChangeDetectionMode): void {
  mode = changeDetectionMode;
  destroyPlatform();
  doc?.body.prepend(
    doc.createElement(selector)
  );
  bootstrapFn();
}

export function getChangeDetectionMode(): CustomChangeDetectionMode {
  return mode;
}
