
import { removeParameter } from './utils';

const EVENT_CATEGORY_MESSAGE_INTERACTION = 'MessageInteraction';

const pluginLTLinkTarget = (tokens: ObjectIndex<Token>, idx: number, defaultLinkTarget: string) => {
  let resultTokens = Object.assign({}, tokens);
  let linkTarget = defaultLinkTarget;
  const href = tokens[idx].attrGet('href');
  // Add LT-link-target custom value
  const linkregx = /[&?]LT-link-target=(_blank|_parent|_self)/;

  const matches = linkregx.exec(href);
  if (matches && matches.length > 0) {

    linkTarget = matches[1] ? matches[1] : defaultLinkTarget;
    let newHref = removeParameter(href, 'LT-link-target');
    // Call encodeURI for more security
    // TODO -> Any idea of safer way of doing this is welcomed
    newHref = encodeURI(newHref);
    // If there is text token (should always be defined) and values is exactly the same that href
    // User did write the link manually and linkify parsed it or intentionally did it (either way we remove the extra query param)
    if (resultTokens[idx+1] && resultTokens[idx+1].type === 'text' && resultTokens[idx+1].content === href) {
      resultTokens[idx+1].content = newHref;
    }

    // We only we set the href if there is a match
    resultTokens[idx].attrSet('href', newHref);
  }

  // We always set the target attribute (if not provided default is used)
  resultTokens[idx].attrPush([ 'target', linkTarget ]);

  return resultTokens;
}

const pluginLTAnalytics = (tokens: ObjectIndex<Token>, idx: number) => {
  let resultTokens = Object.assign({}, tokens);
  const href = tokens[idx].attrGet('href');

  const openAppLinkRegx = /[&?]LT-apps-sdk-method=(.*)/;
  const publicMethodLinkRegx = /[&?]LT-public-method=(.*)/;

  const isOpenAppLink = openAppLinkRegx.exec(href);
  const isPublicMethodLink = publicMethodLinkRegx.exec(href);

  if (!isOpenAppLink && !isPublicMethodLink) {
    // Only if it is not a link to open an app or a public method
    // We set the click to be trackable
    resultTokens[idx].attrPush([ 'onclick', `javascript:window.LTAnalytics.event('${EVENT_CATEGORY_MESSAGE_INTERACTION}', 'click', '${href}')` ]);
  }

  return resultTokens;
}

const pluginLTPublicMethod = (tokens: ObjectIndex<Token>, idx: number) => {
  const href = tokens[idx].attrGet('href');
  // Add LT-link-target custom value
  const linkregx = /[&?]LT-public-method=([a-zA-Z0-9=\/\+]*)/;

  const matches = linkregx.exec(href);
  if (matches && matches.length > 0) {
    // We only we set the href if there is a match
    const methodCallAndArgsEncoded = matches[1] ? matches[1] : false;
    // We do 2 things on click: Open the app and register the analytics event
    const eventHandlerFunction = `javascript:window.$LTSDK.callPublicMethod64('${methodCallAndArgsEncoded}');window.LTAnalytics.event('${EVENT_CATEGORY_MESSAGE_INTERACTION}', 'click', '${href}')`;
    
    tokens[idx].attrSet('href', '#');
    tokens[idx].attrSet('onclick', eventHandlerFunction);
    
    // Remove the target attribute (Firefox would always open a tab if it is present)
    const targetIndex = tokens[idx].attrIndex('target');
    tokens[idx].attrs.splice(targetIndex, 1);
  }
  
  return tokens;
}

const pluginLTAppsSDKMethod = (tokens: ObjectIndex<Token>, idx: number) => {
  const href = tokens[idx].attrGet('href');
  // Add LT-link-target custom value
  const linkregx = /[&?]LT-apps-sdk-method=([a-zA-Z0-9=\/\+]*)/;
  
  const matches = linkregx.exec(href);
  if (matches && matches.length > 0) {
    // We only we set the href if there is a match
    const methodCallAndArgsEncoded = matches[1] ? matches[1] : false;
    var linkClassName = tokens[idx].attrGet('class') ? `${tokens[idx].attrGet('class')} actionable-link` : 'actionable-link';
    // We do 2 things on click: Open the app and register the analytics event
    const eventHandlerFunction = `javascript:window.$AppsSDK.executeSDKEvent64('${methodCallAndArgsEncoded}');window.LTAnalytics.event('${EVENT_CATEGORY_MESSAGE_INTERACTION}', 'click', '${href}'); return false;`;
    tokens[idx].attrSet('href', '#');
    tokens[idx].attrSet('onclick', eventHandlerFunction);
    
    // Remove the target attribute (Firefox would always open a tab if it is present)
    const targetIndex = tokens[idx].attrIndex('target');
    tokens[idx].attrs.splice(targetIndex, 1);
    // Always add the class to style this as a button
    tokens[idx].attrPush([ 'class', linkClassName]);
  }

  return tokens;
}

export {
  // Public methods
  pluginLTLinkTarget,
  pluginLTPublicMethod,
  pluginLTAppsSDKMethod,
  pluginLTAnalytics,
};
