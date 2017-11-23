import React from 'react';
import path from 'path';
import Loadable from 'react-loadable';
import LoadingComponent from '../Loading';

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

const LoadableMessageList = Loadable({
  loader: () => sleep(5000).then(() => import('./index')),
  loading: LoadingComponent,
  serverSideRequirePath: path.resolve(__dirname, './index'),
});

const MessageList = (props) => (<LoadableMessageList {...props} />);

export default MessageList;
