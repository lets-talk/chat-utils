import React from 'react';
import path from 'path';
import Loadable from 'react-loadable';
import LoadingComponent from '../Loading';

const LoadableMessageList = Loadable({
  loader: () => import('./index'),
  loading: LoadingComponent,
  serverSideRequirePath: path.resolve(__dirname, './index'),
});

const MessageList = (props) => (<LoadableMessageList {...props} />);

export default MessageList;
