# Api Metodos Publicos

La api también permite controlar la visibilidad del chat y la escritura de mensajes internos, es decir, mensajes que son invisibles para el cliente. Esta funcionalidad es muy útil para registrar acciones relevantes automáticamente gatillados por eventos (ej: navegación, clicks, etc).

## window.$LT.setDisplayState([string])
*Los valores posibles que se pueden usar son: **hidden**, **minimized**, **small** *


**Hidden**

Oculta el box del chat sin destruir la sesión que tenga abierta.

*Ejemplo:*
```javascript
  window.$LT.setDisplayState('hidden');
```

![Box Hidden example](_media/setDisplayStateHidden.gif)

**Minimized**

Pone box del chat en estado minificado, esto es cerrado pero visible.

*Ejemplo:*
```javascript
  window.$LT.setDisplayState('minimized');
```

![Box Minimized example](_media/setDisplayStateMinimized.gif)

**Small**

Pone box del chat en estado expandido, esto es abierto y visible.

*Ejemplo:*
```javascript
  window.$LT.setDisplayState('small');
```

![Box Expand example](_media/setDisplayStateSmall.gif)

## window.$LT.addChatMetaData([object], bool)
Una vez que el chat está instalado y activo en la web se le puede enviar metadata que será agregada a la conversación en curso o bien a una futura que se pudiera iniciar en la sesión. Esta metadata puede ser una serie de valores definidos como par `clave: valor`. Estos valores quedarán disponibles en los reportes de las conversaciones. Además esta función acepta un segundo argumento booleano que indica si la adición de la metadata debe ser registtrada como mensaje interno en la conversación para informar al agente; con `true` se agrega el mensaje y con `false` se omite.

*Ejemplo:*
```javascript
  window.$LT.addChatMetaData({
    tipo_cliente: 'pago',
    nivel: 'VIP'
  }, true);
```

## window.$LT.addInternalSystemMessage([message])

*Ejemplo:*
```javascript
  window.$LT.addInternalSystemMessage('Ejemplo mensaje interno');
```

## window.$LT.startConversation([initialObject])

*Ejemplo:*
```javascript
  window.$LT.startConversation({
    inquiry: [inquiry_id],
  });
```

## window.$LT.logout()

*Ejemplo:*
```javascript
  window.$LT.logout();
```

## window.$LT.isAvailable()

**Atención este método no es recomendable y será <span style="color:red">obsoleto proximamente<span>.** Para chequear si el widget esta disponible se recomienda
el usa del evento *[api.events.availabe](apievents#apieventsavailable)*.

*Ejemplo:*
```javascript
  window.$LT.isAvailable();
```
