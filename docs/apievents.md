# Eventos del Chat

Usando el método **window.$LT.on** es posible registrar funciones que son invocadas cuando diferentes eventos ocurren:

## api.events.loaded

Este evento es disparado cuando el widget se cargo completamente y esta listo
para comenzar a usar (conversar). Puede ser util si requiere ejecutar alguna
función que requiera que los *[métodos de la api](publicapi)* funcionen inmediatamente.
Podría utilizarlo para enviar un mensaje interno *[addInternalSystemMessage](publicapi#)* al agente apenas se inicia el widget indicando alguna información relevante acerca del contexto/cliente que le permite
mejorar la atención de su cliente.

```javascript
  messenger.on('api.events.loaded', function() {
    window.$LT.addInternalSystemMessage('Cliente con plan:' + clientePlan)
  });
```

## api.events.available

Este evento es disparado en el preciso momento que el widget determina si esta activo o no (según su configuración de horario).
*(Tener en cuenta que estar activo es diferente a mostrarse. Para que el widget se muestre debe estar activo y no haberse inicializado con display hidden)*.

Podría utilizarlo para mostrar un botón en su sitio que permita a los clientes
abrir un chat para conversar como se muestra en la sección de Ejemplos: *[Ejemplo mostrar botón](example1)*.

```javascript
  messenger.on('api.events.available', function(available) {
    alert('Widget Available:' + available);
  });
```
