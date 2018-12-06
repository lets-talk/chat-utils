# Namespaces para las apps

El namespace de una app es una cadena de texto que permite nombrar a una o varias apps. La idea del namespace es que es como una dirección url que permita identificar una app por su nombre y donde esta accesible (en que lugar de la pantalla) 

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

## Ejemplos

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