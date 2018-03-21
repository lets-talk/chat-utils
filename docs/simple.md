## Insertar el Script en su sitio

Instalación básica copiar el código generado por Let's Talk para los sitios públicos:

*En algún lugar dentro del HEAD de su sitio web*:
```html
<!-- Begin of LetsTalk script -->
<script type="application/javascript" async defer>
 
//var LT_WIDGET_SRC = 'https://sudominio.com/lets_talk_widget.js';//Descomentar si el js se encuetra en un servidor externo  

var LT_WIDGET_SRC = 'https://[organization_subdomain].letsta.lk/widget.js';//Comentar si el js se encuetra en nuestro server 

(function(l,t){if(l.$LT)return;function ls(){a=!1;s=t.createElement('script');s.type='text/javascript';s.src=LT_WIDGET_SRC;s.async=!0;s.defer=!0;k=document.getElementsByTagName('script')[0];k.parentNode.insertBefore(s,k)}
var lt=l.$LT=function(callback){if(typeof callback==='function'){mock.initCallBack=callback}}
lt.enqueue=function(){mock.stack.push(arguments);mock.times.push(+new Date)}
lt.settings=function(settings){lt.enqueue('userSettings',settings)};lt.chatMetadata=function(getMetadata){if(typeof getMetadata==='function'){lt.enqueue('metadata',getMetadata())}};lt.setByName=function(name){mock.name=name};var mock=lt._={name:!1,initCallBack:!1,stack:[],times:[+new Date],};if(t.body){ls()}else{if(l.attachEvent){l.attachEvent('onload',ls)}else{l.addEventListener('load',ls,!1)}}})(window,document);
window.$LT(function(messenger){
    messenger.setByName([widget_name])
});
</script>
<!-- End of LetsTalk script -->
```

Recuerde en el script de arriba debe remplazar los valores de
**[organization_subdomain]** y **[widget_name]** por los los valores propios de la instancia a implementar.

Si utilizara su propio server para hostear el widget.js solo basta agregar la siguiente linea antes del script indicado arriba:

```javascript
var LT_WIDGET_SRC = 'https://sudominio.com/lets_talk_widget.js';
```
