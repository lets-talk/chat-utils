
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
export {
  // Public methods
  pluginLTLinkTarget,
};
