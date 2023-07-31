
export const FLAGS = 2;
export const PARENT = 3;
export const T_HOST = 6;
export const CONTEXT = 8;
export const INJECTOR = 9;

export interface LView<T = unknown> extends Array<any> {}

export const enum ChangeDetectionMode {
  Global,
  Targeted,
  BugToForceRefreshAndIgnoreViewFlags
}

export const enum TNodeType {
  Text = 0b1,
  Element = 0b10,
  Container = 0b100,
  ElementContainer = 0b1000,
  Projection = 0b10000,
  Icu = 0b100000,
  Placeholder = 0b1000000,
  AnyRNode = 0b11,        // Text | Element,
  AnyContainer = 0b1100,  // Container | ElementContainer, // See:
}
