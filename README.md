# Chat Utils

We will be building our own collection of utilities we use in our apps. We will then publish them on NPM so that they will be available for all.

# Build status

[![CircleCI](https://circleci.com/gh/lets-talk/chat-utils.svg?style=svg)](https://circleci.com/gh/lets-talk/chat-utils)


# Greenkeeper

[![Greenkeeper badge](https://badges.greenkeeper.io/lets-talk/chat-utils.svg)](https://greenkeeper.io/)

# Code Coverage

**packages/markdown-plugins**

[![CodeCoverage](https://lets-talk.github.io/chat-utils/_media/markdownit-plugins-code-coverage-badge.svg)](https://circleci.com/gh/lets-talk/chat-utils/tree/master)


Collection of utilities we use in our chat.

# Repository Tools

We will be building our own component library in React. We will then publish them on NPM so that they will be available for all.

Here are the few libraries we are going to use.

1. Lerna : for publishing npm modules
2. Storybook and its addons for independent component development
3. jest for testing

# Setup Project
```
git clone https://github.com/lets-talk/lt-chat-utils
cd chat-utils
npm install or yarn
```

# Folder Structure

The packages folder will contains all the components.
All components should be complete on their own. Like they must have a package.json to maintain their version.
package.json file should have a main property set to point the entry point.
Its always better to compile the es6 source-code to es5 using babel.
All these optimization has been done in the components.

# Publishing Components
So we have completed the steps for creating the independent components. Now its time to publish them. Here we are going to use lerna . Lerna can identify the components which have changed and suggest you to update the version in their package.json before publish them.
You can maintain different version for each component.
Before publish, run the below command to login to npm
```
npm login
```

You must create account on npm first, and your npm credentials here
```
//first commit your changes in git repo
git remote add origin <your git repo>
git commit -am "done"
git push
//setup lerna for new components
//You can install lerna globally `npm install -g lerna` or use from node modules: `node_modules/lerna/bin/lerna.js publish`
lerna bootstrap
lerna publish
```
It will check which component has changed, then specify the version.
Type y and hit enter
Packages published to npm registry.

## In case:
* You are getting error as you are not authorized to publish . This means that the package name is already taken.
* If you are using @something/button This means that the package is scoped. This requires an access to private registry account on npm.
* If you want to setup your own private NPM registery. You can setup sinopia on your machine
```
npm install -g sinopia
// then run the sinopia and it will start the npm private server
sinopia
// if you want to handle sinopia crashes automatically. You can use // pm2 to manage that
npm install -g pm2
pm2 pm2 start sinopia
```

# References
* Lerna: https://lernajs.io/
* Storybook: https://storybook.js.org/
* PM2: https://github.com/Unitech/pm2
* Sinopia: https://github.com/rlidwka/sinopia

