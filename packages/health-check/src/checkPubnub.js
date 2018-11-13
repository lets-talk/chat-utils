import PubNub from 'pubnub';

const connectionData = {
  //Channel granted forever for authkey '2D672o9K'
  channel: 'client-test',
  uuid: 'web_client',
  authKey: '2D672o9K',
  subkey: 'sub-c-1491a222-7c85-11e7-9d24-02ee2ddab7fe',
  pubkey: 'pub-c-dc6ad3d8-08e4-42d9-915b-53d39d42d66f'
};

const showPubnubStatus = (statusType, statusCode, statusText) => {
  if (statusCode === 200) {
    document.getElementById(`pubnub-${statusType}`).className = 'check_success';
  } else {
    document.getElementById(`pubnub-${statusType}`).className = 'check_error';
  }
  document.getElementById(`pubnub-${statusType}`).innerHTML = statusText;
}

const checkPubnub = (pubnubChecks) => {
  const pubnub = new PubNub({
    publishKey   : connectionData.pubkey,
    subscribeKey : connectionData.subkey,
    uuid: connectionData.uuid,
    authKey: connectionData.authKey,
    ssl: true,
    restore: true
  });
  
  pubnub.addListener({
    status: function(statusEvent) {
      if (statusEvent.category === "PNConnectedCategory") {
        showPubnubStatus('client-can-connect', 200, 'El cliente se puede conectar a PubNub');
      }else{
        showPubnubStatus('client-can-connect', 500, `El cliente no se puede conectar a PubNub. Error: ${statusEvent.category}`);
      }
    },    
  });
  
  pubnub.subscribe({
    channels: [connectionData.channel]
  });
}

export {
  checkPubnub
};