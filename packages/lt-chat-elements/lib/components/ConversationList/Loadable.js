import React from 'react';
import path from 'path';
import Loadable from 'react-loadable';
import LoadingComponent from '../Loading';

const LoadableConversationList = Loadable({
  loader: () => import('./index'),
  loading: LoadingComponent,
  serverSideRequirePath: path.resolve(__dirname, './index'),
});

const ConversationList = (props) => (<LoadableConversationList {...props} />);

export default ConversationList;
