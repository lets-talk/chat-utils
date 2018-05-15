import React from 'react';
import path from 'path';
import Loadable from 'react-loadable';
import LoadingComponent from '../Loading';

const sleep = (duration) => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, duration);
});

const LoadableConversationList = Loadable({
  loader: () => sleep(5 * 1000).then(() => import('./index')),
  loading: LoadingComponent,
  serverSideRequirePath: path.resolve(__dirname, './index'),
});

const ConversationList = (props) => (<LoadableConversationList {...props} />);

export default ConversationList;
