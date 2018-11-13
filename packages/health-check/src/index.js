import {
  checkDomains
} from './checkDomains';

import {
  checkPubnub
} from './checkPubnub';

const servers = [
  {
    id: 1,
    url: 'https://api.letsta.lk/',
    checkType: 'url',
  },
  {
    id: 2,
    url: 'https://www.zoho.com/',
    checkType: 'image',
    imageURL: 'https://www.zoho.com/favicon.ico',
  },
  {
    id: 3,
    url: 'https://www.newrelic.com/',
    checkType: 'image',
    imageURL: 'https://www.newrelic.com/favicon.ico'
  },
  {
    id: 5,
    url: 'https://s3.amazonaws.com/prod.letsta.lk/assets/widget.js',
    checkType: 'url'
  },
  { 
    id: 6,
    url: 'https://cdn.jsdelivr.net/',
    checkType: 'image',
    imageURL: 'https://cdn.jsdelivr.net/favicon.ico'
  },
];

const pubnubChecks = [
  {
    id: 'client-can-connect',
    name: 'El cliente se puede conectar'
  },
];

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    // document ready
    servers.map((server) => {
      const newDiv = window.document.createElement('div');
      newDiv.id = `server-${server.id}`;
      newDiv.className = 'check_info';
      newDiv.innerText = `Chequear dominio ${server.url}`;
      window.document.body.append(newDiv);
    });

    pubnubChecks.map((pubNubType) => {
      const newDiv = window.document.createElement('div');
      newDiv.id = `pubnub-${pubNubType.id}`;
      newDiv.className = 'check_info';
      newDiv.innerText = `Pubnub: ${pubNubType.name}`;
      window.document.body.append(newDiv);
    });
  }
};

const updateAllStartMessages = () => {
  servers.map((server) => {
    document.getElementById(`server-${server.id}`).className = 'check_info';
    document.getElementById(`server-${server.id}`).innerHTML = `Checking Domain ${server.url} ...`;
  });

  pubnubChecks.map((pubNubType) => {
    document.getElementById(`pubnub-${pubNubType.id}`).className = 'check_info';
    document.getElementById(`pubnub-${pubNubType.id}`).innerHTML = `Checking Pubnub ${pubNubType.name} ...`;
  });
}

window.checkHealth = function checkHealth() {
  updateAllStartMessages();
  checkPubnub(pubnubChecks);
  checkDomains(servers);
}

