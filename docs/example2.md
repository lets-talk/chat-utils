## Iniciar Chat con un inquiry preseleccionado
*(Se muestra como inicializar el widget con un Inquiery preseleccionado)*

Un caso típico de uso es iniciar el widget ya conociendo datos del cliente (por ejemplo porque el mismo se encuentra logueado en nuestro sitio).
Es por dicha razón que resulta útil tener un forma de inicializar el widget con
un Inquiry preseleccionado. Como lo inquiries permiten determinar con mas certeza
que tipo de ayuda necesita un cliente esta configuración permite atender a un cliente por un canal específico sin requerir de una acción del mismoy así derivarlo al canal de atención adecuado.

[cinwell website](//codepen.io/sandinosaso/embed/preview/mxWqqa/?height=550&theme-id=dark&default-tab=js,result&embed-version=2 ':include :type=iframe width=100% height=550px')

## Explicación paso a paso

Ni bien se carga la pagina ejecutamos la inicialización del widget invocando la
función `window.$LT()` esta función recibe como parametro una función callback
que utilizamos inicilizar distintas configuraciones del widget.
Indicamos cual es el widget que deseamos cargar (*widget*)
También indicamos al widget que se inicialize abierto (*display: small*) y con el Inquiry *Sales* (id=280) seleccionado por defecto (*selectedInquiry: 280*):

```javascript
  window.$LT(function(messenger) {
    messenger.setByName('widget');
    messenger.settings({
      display: "small",
      selectedInquiry: 280
    });
  });
```
