import React from 'react';
import path from 'path';
import Loadable from 'react-loadable';
import LoadingComponent from '../Loading';

const LoadableTag = Loadable({
  loader: () => import('./index'),
  loading: LoadingComponent,
  serverSideRequirePath: path.resolve(__dirname, './index'),
});

const Tag = (props) => (<LoadableTag {...props} />);

export default Tag;
