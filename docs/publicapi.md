# Api Metodos Publicos

La api también permite controlar la visibilidad del chat y la escritura de mensajes internos, es decir, mensajes que son invisibles para el cliente. Esta funcionalidad es muy útil para registrar acciones relevantes automáticamente gatillados por eventos (ej: navegación, clicks, etc).

## *openApp(appNamespace: string): Promise<any>*

Permite abrir una o varias aplicaciones indicando el namespace que permite identificarla.
Te recomendamos leer la especicicación de namespaces para apps:
*[Apps Namespace](appsnamespace)*


*Ejemplo:*
```javascript
  openApp('lt.survey.top-center');
```

## *closeApp(): Promise*
Permite cerrar la app. Devuelve una promesa que se resuelve si 
se ejecuto correctamente (el manejador de apps recibió la petición)

*Ejemplo:*
```javascript
  closeApp()
    .then(() => { console.log('App closed') })
    .fail((e) => console.log('Error closing app:', e))
```

## *getAppSettings(): Promise*

Obtiene las settings de una app. Tener en cuenta que estas settings son las que por defecto se configuraron por la app, una forma de sobrescribirlas facilmente es hacer:

*Ejemplo:*
```javascript
    getAppSettings().then((event) => {
      const { data } = event;
      const { initialData } = data;
      
      const configuration = JSON.parse(data.payload);
      const mergedConfiguration = initialData ? { ...configuration, ...initialData.payload } : configuration;
    }).catch((error) => {
      console.error('Error getting my settings:', error);
    });
```

En el ejemplo de arriba se pisan las settings que hubiera con lo que venga en initialData (el que me abrió me paso data inicial) 

## *notify(eventName: string, data: any): Promise*

Permite a una aplicación notificar que un evento ocurrió. Si hay alguna regla que abre otra app y que depende de mi evento, esta regla es evaluada con la data que proporciono como segundo argumento de la función.

*Ejemplo:*
```javascript
  notify('lt.appEvent.gotClientValues', [
    {
      key: 'key1',
      value: { user_name: 'User' }
    }
  ])
```
