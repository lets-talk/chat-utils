# Build your own React Component library with lerna and storybook

We will be building our own component library in React. We will then publish them on NPM so that they will be available for all.
Here are the few libraries we are going to use.

1. Lerna : for publishing npm modules
2. Storybook and its addons for independent component development
3. jest for testing

# Setup Project
```
git clone https://github.com/ankur-kushwaha/react-component-library.git
cd react-component-library
npm install or yarn
//after the installation complete
npm run storybook or yarn storybook
```

This will start a server at port 9001. Here is the user interface.

I have added a component called Button which takes single prop to update the background color of button. Similarity you can add multiple components and properties.
You can also test you component by changing the input arguments in the right side box. Type green and see changes.

# Folder Structure

The packages folder will contains all the components.
All components should be complete on their own. Like they must have a package.json to maintain their version.
Package.json file should have a main property set to point the entry point.
Its always better to compile the es6 source-code to es5 using babel.
All these optimization has been done in Button component.

# Storybook Enhancement using Addons
1. addon-knobs: Storybook Addon Knobs allow you to edit React props dynamically using the Storybook UI. You can also use Knobs as a dynamic variable inside stories in Storybook.

2. addon-storyshots: StoryShots adds automatic Jest Snapshot Testing for Storybook.

3. addon-info : Storybook Info Addon will show additional information for your stories in Storybook. Useful when you want to display usage or other types of documentation alongside your story.

4. addon-options: The Options addon can be used to set configure the Storybook UI.

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
lerna bootstrap
lerna publish
```
It will check which component has changed,then
specify the version.
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
