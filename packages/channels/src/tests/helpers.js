const createIframe = ({ iframeId }) => {
  const iframe = document.createElement('iframe');
  iframe.id = iframeId;
  document.body.appendChild(iframe);
};

export { createIframe };
