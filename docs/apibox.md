# Chat Box - Eventos de Comportamiento

Cuando se instancia un widget es posible definir funciones propias(código propio de la lógica de su sitio web) que serán ejecutadas cuando distintos eventos ocurran. Para ello se debe utilizar el método **messenger.on** en el momento de instanciar el widget:

```javascript
  window.$LT(function(messenger) {
    ...
    messenger.on(EVENT_NAME, function() {
      // Haz algo asombroso cuando este evento ocurre
      console.info('Ocurrió el evento EVENT_NAME');
    });
    ...
  });
```
Valores posibles de EVENT_NAME son: *'api.box.hide'*, *'api.box.show'*, *'api.box.minimize'*, *'api.box.expand'*.

Estos eventos corresponden a distintos comportamientos del box del widget: cuando se expande *('api.box.expand')*, se minimiza *('api.box.minimize')*, se oculta *('api.box.hide')* o se muestra *('api.box.show')*

## api.box.show

```javascript
  messenger.on('api.box.show', function() {
    // Haz algo asombroso cuando este evento suceda
    console.info('api.box.show executed');
  });
```

## api.box.hide

Este evento se dispara cuando el widget se oculta. Este evento puede ocurrir por ejemplo cuando se invoca al método [window.$LT.setDisplayState('minimized')](publicapi#windowltsetdisplaystatestring)

```javascript
  messenger.on('api.box.hide', function() {
    // Haz algo asombroso cuando este evento suceda
    console.info('api.box.hide executed');
  });
```

## api.box.expand

Este evento se dispara cuando el widget se expande. Este evento puede ocurrir cuando el usuario hace click en el widget estando este en el estado minimizado o cuando se invoca al método [window.$LT.setDisplayState('small')](publicapi#windowltsetdisplaystatestring)

![Box Expand example](_media/api.box.expand.gif)

```javascript
  messenger.on('api.box.expand', function() {
    // Haz algo asombroso cuando este evento suceda
    console.info('api.box.expand executed');
  });
```

## api.box.minimize

Este evento se dispara cuando el widget se minimize. Este evento puede ocurrir cuando el usuario hace click en el widget estando este en el estado expandido o cuando se invoca al método [window.$LT.setDisplayState('minimized')](publicapi#windowltsetdisplaystatestring)

![Box Minimize example](_media/api.box.minimize.gif)

```javascript
  messenger.on('api.box.minimize', function() {
    // Haz algo asombroso cuando este evento suceda
    console.info('api.box.minimize executed');
  });
```
