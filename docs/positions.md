# Anatomia de las Posiciones

La librería @lets-talk/widget-manager es la encargada de cargar y descargar aplicaciones de Let's Talk en un dominio dado.

Para esto implementa distintas estrategías tanto para la carga como para la posición de las apps dentro de la pantalla.

## Tipos de Posiciones

Una aplicación puede tener 1 y sólo 1 tipo de posición el que dicatará como la misma es renderizada en la pantalla.

Estos valores son:

1. Relativa a un lugar de una Grilla (se usa una grilla 3x3)
2. Relativa a la posición de otro elemento
3. Absoluta respecto al Top del display
4. Fija en el medio de la pantalla

Esto se puede ver según la definición del tipo position de una app:

```typescript
export type AppPosition =
  RelativeToElementPosition |
  RelativeToPlacePosition |
  FixedToTopPosition |
  FixedToCenterPosition;
```

---

## Posición Relativa a un lugar de la Grilla

Las posiciones se basan en una grilla que define las siguientes celdas disponibles para posicionar aplicaciones:

```typescript
  'top-left'
  'top-center'
  'top-right'
  'mid-left'
  'mid-center'
  'mid-right'
  'bottom-left'
  'bottom-center'
  'bottom-right'
```

Para posicionar una aplicación dentro de la grilla hay que setearle el atributo postion.

### Ejemplo

Para posicionar una app en el cuadrante superior izquierdo pero a 10px de los bordes superior e izquierdo del cuadrante:

```javascript
{
  ...
  type: 'relative-to-position';
  payload: {
    positionId: 'top-left';
    offset: {
      top: 10,
      left: 10,
    },
  }
  ...
}
```

---

## Posición Relativa a Otro Elemento

La posición de la App es relativa a otro elemento en la pantalla. La aplicación opta por mantenerse en una posición que es calculada respecto a la posición de un elemento prexistente.

type: 'relative-to-element';
  payload: {
    relativeId: string;
    floatType: HTMLFloatType;
    offsetX: offsetX,
    offsetY: offsetY,
  }

**Configuración**

Para posicionar una app respecto a otro elemento hay que indicar el identificador de dicho elemento (el attributo id de dicho elemento).

Además hay que especificar el tipo de float que tiene dicho elemento (fixed | default), esto es importante para que el cálculo de la posición de la App respecto al elemento sea el correcto.

Además hay que agregar 2 offsets que es como indicamos de que manera se posiciona respecto a la posición horizontal (offsetX) y vertical (offsetY) del elemento relativo.


```javascript
{
  ...
  type: 'relative-to-element';
  payload: {
    relativeId: 'lt-messenger-iframe',
    floatType: 'fixed',
    offsetX: offsetX,
    offsetY: offsetY,
  }
  ...
}
```

### Tipos de offset

Los offset (tanto el offsetX como el offsetY) indican como se dijo como se relaciona la posición de la aplicación respecto al elemento relativo en terminos de la posición vertical como horizontal.

Así el offset(X|Y) tiene un relationType que indica el tipo de relación y un value que es un numero que indica el offset númerico que marca esa relación.

```javascript
export type offset(X|Y) = {
  relationType: relationType(X|Y);
  value: number;
}
```

Para el **offsetX** los siguiente relationType están disponibles:

```typescript
export type relationTypeX = 'LL' | 'LR' | 'RL' | 'RR';
```

Dónde:

#### 'LL' -> 'Left-Left'

El ***borde izquierdo*** de la app coincide con el ***borde izquierdo*** del elemento relativo

#### 'LR' -> 'Left-Right'

El ***borde izquierdo*** de la app coincide con el ***borde derecho*** del elemento relativo

#### 'RL' -> 'Right-Left'

El ***borde derecho*** de la app coincide con el ***borde izquierdo*** del elemento relativo

#### 'RR' -> 'Right-Right'

El ***borde derecho*** de la app coincide con el ***borde derecho*** del elemento relativo

Para el **offsetY** los siguiente relationType están disponibles:

```typescript
export type relationTypeY = 'TT' | 'TB' | 'BT' | 'BB';
```

Dónde:

#### 'TT' -> 'Top-Top'

El ***borde superior*** de la app coincide con el ***borde superior*** del elemento relativo

#### 'TB' -> 'Top-Bottom'

El ***borde superior*** de la app coincide con el ***borde inferior*** del elemento relativo

#### 'BT' -> 'Bottom-Top'

El ***borde inferior*** de la app coincide con el ***borde superior*** del elemento relativo

#### 'BB' -> 'Bottom-Bottom'

El ***borde inferior*** de la app coincide con el ***borde inferior*** del elemento relativo

### Ejemplo

Ejemplo aplicación sobre el chat que siempre esta arriba y cuyo borde derecho coincida con el borde derecho del chat:


```javascript
{
  ...,
  type: "relative-to-element",
  payload:{  
    relativeId: "lt-messenger-iframe",
    floatType: "fixed",
    offsetX: {  
      relationType: "RR",
      value: 0
    },
    offsetY: {  
      relationType: "BT",
      value: 0
    }  
  }
  ...
}
```

---

## Posición FixedToTop

La posición de la App es fija respecto a la parted superior de la pantalla.

Para definir esta posición se require especificar el offset:

### Ejemplo


```javascript
{
  ...
  type: 'fixed-to-top-position';
  payload: {
    offset: {
      left: 0,
      top: 0
    },
  }
  ...
}
```

---

## Posición FixedToCenter

La posición de la App es fija respecto al centro de la pantalla.

Para definir esta posición se require especificar el offset:

### Ejemplo


```javascript
{
  ...
  type: 'fixed-to-center-position';
  payload: {
    offset: {
      left: 0,
      top: 0
    },
  }
  ...
}
```
