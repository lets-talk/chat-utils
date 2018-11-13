const checkImageExists = (imageURL) => {
  return new Promise(resolve => {
    const img = new Image();
    img.addEventListener('load', () => resolve(true));
    img.addEventListener('error', () => resolve(false));
    img.src = `${imageURL}?${Date.now()}`;
  });
}

const ajax = {};
ajax.x = function () {
  if (typeof XMLHttpRequest !== 'undefined') {
    return new XMLHttpRequest();
  }
  var versions = [
    "MSXML2.XmlHttp.6.0",
    "MSXML2.XmlHttp.5.0",
    "MSXML2.XmlHttp.4.0",
    "MSXML2.XmlHttp.3.0",
    "MSXML2.XmlHttp.2.0",
    "Microsoft.XmlHttp"
  ];

  var xhr;
  for (var i = 0; i < versions.length; i++) {
    try {
      xhr = new ActiveXObject(versions[i]);
      break;
    } catch (e) {
    }
  }
  xhr.timeout = 2000; // time in milliseconds
  return xhr;
};


ajax.send = function (url, callback, method, data, async, opts) {
  if (async === undefined) {
    async = true;
  }
  const x = ajax.x();
  x.open(method, url, async);
  x.onreadystatechange = function (r) {
    if (x.readyState == 4) {
      callback(x)
    }
  };
  if (method == 'POST') {
    x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  }
  const headers = opts.headers;
  if (headers) {
    for (const key in headers) {
      if (opts.hasOwnProperty(key)) {
        x.setRequestHeader(key, headers[key]);
      }
    }
  }
  x.send(data)
};

ajax.get = function (url, callback, async) {
  ajax.send(url, callback, 'GET', null, async, false)
};

const showServerStatus = (server, status, statusText) => {
  if (status === 200) {
    document.getElementById(`server-${server.id}`).className = 'check_success';
    document.getElementById(`server-${server.id}`).innerHTML = `El dominio ${server.url} esta OK`;
  } else {
    document.getElementById(`server-${server.id}`).className = 'check_error';
    document.getElementById(`server-${server.id}`).innerHTML = `El dominio ${server.url} tiene problemas: ${statusText}`;
  }
}

const checkDomains = (servers) => {
  servers.map((server) => {
    if (server.checkType === 'image') {
      checkImageExists(server.imageURL).then(reachable => {
        if (reachable) {
          showServerStatus(server, 200, `Server ${server.url} OK`);
        } else {
          showServerStatus(server, 500, `Server ${server.url} NOT ok`);
        }
      });
    } else if (server.checkType === 'url') {
      try {
        ajax.get(server.url, function(response) {
          showServerStatus(server, response.status, response.statusText);
        }, true);
      } catch (error) {
        showServerStatus(server, 500, error);
      }
    }
  });
};

export {
  checkDomains,
};