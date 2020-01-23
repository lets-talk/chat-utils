import {
  pluginLTLinkTarget,
  pluginLTPublicMethod,
  pluginLTAppsSDKMethod,
  pluginLTAnalytics,
} from './plugins';

export default function applyLetsTalkPlugins(tokens: ObjectIndex<Token>, idx: string): ObjectIndex<Token> {
  let newTokens = pluginLTLinkTarget(tokens, idx, '_blank');
  newTokens = pluginLTPublicMethod(newTokens, idx);
  newTokens = pluginLTAnalytics(newTokens, idx);
  newTokens = pluginLTAppsSDKMethod(newTokens, idx);
  return newTokens;
}
