# Chat Box Behavior Events

Using the **on** method allows you to listen for different kind of
events that the widget triggers:

## api.box.show

```javascript
  messenger.on('api.box.show', function(api.box.show) {
    // Haz algo asombroso cuando este evento suceda
    console.info('api.box.show executed');
  });
```

## api.box.hide

```javascript
  messenger.on('api.box.hide', function(api.box.hide) {
    // Haz algo asombroso cuando este evento suceda
    console.info('api.box.hide executed');
  });
```

## api.box.expand

![Box Expand example](_media/api.box.expand.gif)

```javascript
  messenger.on('api.box.expand', function() {
    // Haz algo asombroso cuando este evento suceda
    console.info('api.box.expand executed');
  });
```

## api.box.minimize

![Box Minimize example](_media/api.box.minimize.gif)

```javascript
  messenger.on('api.box.minimize', function() {
    // Haz algo asombroso cuando este evento suceda
    console.info('api.box.minimize executed');
  });
```
