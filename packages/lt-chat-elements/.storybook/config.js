import { configure, setAddon } from "@storybook/react";
import infoAddon, { setDefaults } from "@storybook/addon-info";
import { setOptions } from "@storybook/addon-options";

// addon-info
setDefaults({
  header: false, // Toggles display of header with component name and description
  inline: false,
});

// stories loader
const req = require.context('../lib/components', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

setOptions({
  name: "Storybook",
  url: "https://test.com",
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: true,
  sortStoriesByKind: true
});

setAddon(infoAddon);

configure(loadStories, module);
