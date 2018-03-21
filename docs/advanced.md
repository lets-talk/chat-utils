# Instalación Avanzada Web Chat Let’s Talk

Además de la opción básica, el chat web acepta una serie de parámetros adicionales para la customización gráfica, pero también para la operación.

## Variables de Instalación
En las distintas fases y versiones de instalación de hace referencia a variables entre paréntesis cuadrados `[]`, esto quiere decir que se deben usar variables propias de la instancia a implementar. En caso de no contar con estas variables comunicarse con la/el encargada/o del proyecto o con soporte@ltmessenger.com.

```
[organization_subdomain]: bci
[widget_name]: viaje-planes
[consumer_key]: pr2z4utwkBapd680nc5Jkg
[consumer_token]: BvNMzM9LfFs8WHbSzee9Rw
```

## Sesión de usuario

Let's Talk provee a cada cliente con una pareja **(key, token)** que permite integrar su propia logica de authenticación de usuarios.

Deberá proveer dicha pareja al momento de la inicialización del chat:

```javascript
window.$LT(function(messenger) {
  messenger.setByName("[widget_name]");
  messenger.settings({
  	consumer: {
    	  key:   '[consumer_key]',
    	  token: '[consumer_token]'
  	}
  });
});
```

Al inicializar el widget con **consumer** setting **el visitante no tendrá que iniciar sesión** en el widget.

## Atributos del usuario

En particular, para sitios que posean una **sesión con usuario identificado**, es decir, donde ya se sabe quién es el visitante el widget permite ser inicializado con una sesión activa para el visitante autorizada por las credenciales de la misma organización.
Para esto se debe entregar un objeto **visitor** que sólo será aceptado si viene con las credenciales correctas del consumer (la organización) como se vió en el ejemplo anterior.
Los valores para **name** y **email** son requeridos en el objecto visitor, mientras que attrs puede omitirse.

*Ejemplo*:

```javascript
window.$LT(function(messenger) {
  messenger.setByName("[widget_name]");
  messenger.settings({
  	eager_loading: true,
  	consumer: {
    	  key:   '[consumer_key]',
    	  token: '[consumer_token]'
  	},
  	visitor: {
    	  name:  'Client Demo',
    	  email: 'client.demo@letsta.lk',
      	attrs: {
          sucursal => 'Sucursal Providencia',
          tipoBanca => 'Banca Personal',
          convenio => 'Convenio Pyme',
      	}
  	}
  });
});
```

Además se le agregará a su perfil la información del objeto **visitor.attrs**. Esta información puede ser muy valiosa para el agente que reciba la conversación ya que le brinda mayor contexto sobre con quien va a interactuar.

El uso esperado es que la web de la organización complete el objeto visitor con los datos necesarios antes de inicializar el widget.

## Atributos del contexto

En la función **chatMetadata** se pueden adicionar parámetros personalizados que se mostrarán como un mensaje interno al inicio de la conversación. El objetivo es brindar información relevante al agente que atenderá al cliente.

*Ejemplo:*

```javascript
messenger.chatMetadata(function() {
  return {
    empresa: window.location.href.match(/pyme/) ? 'pyme': 'no-pyme',
  }
});
```
En el ejemplo se envía el atributo empresa con el valor pyme o no-pyme dependiendo de la url de carga del widget, lo que indicará al agente si se inició la conversación en el portal pyme o no-pyme.
