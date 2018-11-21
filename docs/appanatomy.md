# Anatomia de las Apps

Una web app para letstalk es una aplicación que puede ser embebida en un sitio y con la que se puede interactuar a través del uso de cierta API.

Una app esta descripta por la siguiente información:

```typescript
export type App = {
  id: number;
  name: string;
  slug: string;
  payload_type: PayloadType;
  payload: string;
  settings: Settings;
  organization_id: Number;
  source: string;
  initialData: any;
}
```

### Tipos de payload:

Los tipos de paylod determinan el tipo de applicación, así el PayloadType puede ser sólo uno entre los siguientes tipos válidos:

```javascript
export type PayloadType = 'html' | 'json' | 'markdown' | 'lt-basic-container' | 'lt-basic-container-multimedia';
```

### Posiciones de las Apps:

```typescript
export type offsetX = {
  relationType: relationTypeX;
  value: number;
}

export type offsetY = {
  relationType: relationTypeY;
  value: number;
}

export type RelativeToElementPosition = {
  type: 'relative-to-element';
  payload: {
    relativeId: string;
    floatType: HTMLFloatType;
    offsetX: offsetX,
    offsetY: offsetY,
  }
}

export type RelativeToPlacePosition = {
  type: 'relative-to-position';
  payload: {
    positionId: string;
    offset: Position,
  }
}

export type FixedToTopPosition = {
  type: 'fixed-to-top-position';
  payload: {
    offset: Position,
  }
}

export type FixedToCenterPosition = {
  type: 'fixed-to-center-position';
  payload: {
    offset: Position,
  }
}

export type AppPosition =
  RelativeToElementPosition |
  RelativeToPlacePosition |
  FixedToTopPosition |
  FixedToCenterPosition;
```

import { AppPosition, relationTypeY } from './types';
export type PayloadType = 'html' | 'json' | 'markdown' | 'lt-basic-container' | 'lt-basic-container-multimedia';
export type relationTypeX = 'LL' | 'LR' | 'RL' | 'RR';
export type relationTypeY = 'TT' | 'TB' | 'BT' | 'BB';

export type ObjectIndex = {
  [key:string]: string;
}

export type AppSize = {
  width: string;
  height: string;
}

export type Settings = {
  css: string;
  inlineCss: ObjectIndex;
  position: AppPosition;
  size: AppSize;
}

export type Position = {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export enum HTMLFloatType {
  fixed = "fixed",
  default = "default"
};

export type offsetX = {
  relationType: relationTypeX;
  value: number;
}

export type offsetY = {
  relationType: relationTypeY;
  value: number;
}

export type RelativeToElementPosition = {
  type: 'relative-to-element';
  payload: {
    relativeId: string;
    floatType: HTMLFloatType;
    offsetX: offsetX,
    offsetY: offsetY,
  }
}

export type RelativeToPlacePosition = {
  type: 'relative-to-position';
  payload: {
    positionId: string;
    offset: Position,
  }
}

export type FixedToTopPosition = {
  type: 'fixed-to-top-position';
  payload: {
    offset: Position,
  }
}

export type FixedToCenterPosition = {
  type: 'fixed-to-center-position';
  payload: {
    offset: Position,
  }
}

export type AppPosition =
  RelativeToElementPosition |
  RelativeToPlacePosition |
  FixedToTopPosition |
  FixedToCenterPosition;

export type App = {
  id: number;
  name: string;
  slug: string;
  payload_type: PayloadType;
  payload: string;
  settings: Settings;
  organization_id: Number;
  source: string;
  initialData: any;
}

export type Size = {
  width: number;
  height: number;
}

export type GridCell = {
  id: string;
  apps: App[];
  position: Position;
  size: Size;
}

export type GridSettings = {
  columns: number;
  gutter: number;
  padding: number;
  positions: string[];
}

export type Grid<T> = {
  settings: GridSettings;
  cells: T[];
}

export interface AddAppsStrategy {
  add(app: App, apps: App[]): App[];
}

export interface PositionStrategy {
  getPositionProps(app: App, cell?: GridCell): ObjectIndex;
  shouldAddNewPosition(): boolean;
  getNameId(app: App): string;
  mountStrategy(): AddAppsStrategy;
}

export type PromisedFunction = (appId: number) => Promise<any>;

export const makeHTMLFloatType = (rawString: string): HTMLFloatType => {
  switch (rawString) {
    case HTMLFloatType.fixed:
    case HTMLFloatType.default:
      return rawString;

    default:
      throw Error('Invalid float type');
  }
}



export type Size = {
  width: number;
  height: number;
}

export type GridCell = {
  id: string;
  apps: App[];
  position: Position;
  size: Size;
}

export type GridSettings = {
  columns: number;
  gutter: number;
  padding: number;
  positions: string[];
}

export type Grid<T> = {
  settings: GridSettings;
  cells: T[];
}

export interface AddAppsStrategy {
  add(app: App, apps: App[]): App[];
}

export interface PositionStrategy {
  getPositionProps(app: App, cell?: GridCell): ObjectIndex;
  shouldAddNewPosition(): boolean;
  getNameId(app: App): string;
  mountStrategy(): AddAppsStrategy;
}
```
## Especificación del formato de namespace

Los namespaces de las apps de LetsTalk estan formadas por 3 partes:
1. El proveedor (en nuestro caso siempre `lt`)
2. Un identificador de la app (el `slug`)
3. Un identificador de la posición de la app en la pantalla

Un namespace tiene **SIEMPRE** estas 3 partes, asi su composición es:

`'lt.[IDENTIFICADOR_APP].[IDENTIFICADOR_POSICION]'`

Donde [IDENTIFICADOR_APP] e [IDENTIFICADOR_POSICION] pueden ser:

1. `String exactas` que coincidan con los valores reales (que corresponde a una aplicación específica)
2. Una `expresión regular` que coincida con parte del identificador
3. El valor `*` que es un comodín que indica cualquier valor posible

Ejemplos:

Obtiene `todas` las apps:

```javascript
  'lt.*.*'
```

Obtiene las apps que están en alguna posición `top`:

```javascript
  'lt.*.*top*'
```

Obtiene las apps cuyo slug contiene la palabra `survey`:

```javascript
  'lt.*survey*.*'
```

Obtiene las apps que están en la posición `absolute-mid-center`:

```javascript
  'lt.*.absolute-mid-center'
```