## 📦 Usage & Configuration <a name="usage"></a>

Microbundle includes two commands - `build` (the default) and `watch`. Neither require any options, but you can tailor things to suit your needs a bit if you like.

### `xstate`

Something amazing about `xState` is that you can visualize the machine definition and behavior whiteout need to understand the real code implementation 🎉
[xState Visualizer](https://xstate.js.org/viz/?gist=4e165a26d86dab44acfb95f1c2f78481)

### `microbundle` / `microbundle build`

Unless overridden via the command line, microbundle uses the `source` property in your `package.json` to locate the input file, and the `main` property for the output:

```js
{
  "source": "src/index.js",      // input
  "main": "dist/grid-manager.js",  // output
  "scripts": {
    "build": "microbundle"
  }
}
```

For UMD builds, microbundle will use a camelCase version of the `name` field in your `package.json` as export name. This can be customized using an `"amdName"` key in your `package.json` or the `--name` command line argument.

### `microbundle watch`

Acts just like `microbundle build`, but watches your source files and rebuilds on any change.

### `yarn serve`

Launch a simple http-server at port 9000 to develop insolation without require to be linked to external sources [server](http://localhost:9000/)

### Using with TypeScript

Just point the input to a `.ts` file through either the cli or the `source` key in your `package.json` and you’re done.

Microbundle will generally respect your TypeScript config defined in a `tsconfig.json` file with notable exceptions being the "[target](https://www.typescriptlang.org/tsconfig#target)" and "[module](https://www.typescriptlang.org/tsconfig#module)" settings. To ensure your TypeScript configuration matches the configuration that Microbundle uses internally it's strongly recommended that you set `"module": "ESNext"` and `"target": "ESNext"` in your `tsconfig.json`.

### Specifying builds in `package.json`

Microbundle uses the fields from your `package.json` to figure out where it should place each generated bundle:

```
{
  "main": "dist/grid-manager.js",            // CommonJS bundle
  "umd:main": "dist/grid-manager.umd.js",    // UMD bundle
  "module": "dist/grid-manageroo.m.js",        // ES Modules bundle
  "esmodule": "dist/grid-manager.modern.js", // Modern bundle
  "types": "dist/grid-manager.d.ts"          // TypeScript typings directory
}
```

### Building a single bundle with a fixed output name

By default Microbundle outputs multiple bundles, one bundle per format. A single bundle with a fixed output name can be built like this:

```bash
microbundle -i lib/main.js -o dist/bundle.js --no-pkg-main -f umd
```

### Mangling Properties

To achieve the smallest possible bundle size, libraries often wish to rename internal object properties or class members to smaller names - transforming `this._internalIdValue` to `this._i`. Microbundle doesn't do this by default, however it can be enabled by creating a `mangle.json` file (or a `"mangle"` property in your package.json). Within that file, you can specify a regular expression pattern to control which properties should be mangled. For example: to mangle all property names beginning an underscore:

```json
{
  "mangle": {
    "regex": "^_"
  }
}
```

It's also possible to configure repeatable short names for each mangled property, so that every build of your library has the same output. **See the wiki for a [complete guide to property mangling in Microbundle](https://github.com/developit/microbundle/wiki/mangle.json).**

### All CLI Options <a name="options"></a>

```
Usage
	$ microbundle <command> [options]

Available Commands
	build    Build once and exit
	watch    Rebuilds on any change

For more info, run any command with the `--help` flag
	$ microbundle build --help
	$ microbundle watch --help

Options
	-v, --version    Displays current version
	-i, --entry      Entry module(s)
	-o, --output     Directory to place build files into
	-f, --format     Only build specified formats (any of modern,es,cjs,umd or iife) (default modern,es,cjs,umd)
	-w, --watch      Rebuilds on any change  (default false)
	--pkg-main       Outputs files analog to package.json main entries  (default true)
	--target         Specify your target environment (node or web)  (default web)
	--external       Specify external dependencies, or 'none' (default peerDependencies and dependencies in package.json)
	--globals        Specify globals dependencies, or 'none'
	--define         Replace constants with hard-coded values
	--alias          Map imports to different modules
	--compress       Compress output using Terser
	--no-compress    Disable output compressing
	--strict         Enforce undefined global context and add "use strict"
	--name           Specify name exposed in UMD and IIFE builds
	--cwd            Use an alternative working directory  (default .)
	--sourcemap      Generate source map  (default true)
	--raw            Show raw byte size  (default false)
	--jsx            A custom JSX pragma like React.createElement (default: h)
	--tsconfig       Specify the path to a custom tsconfig.json
	--css-modules    Configures .css to be treated as modules (default: null)
	-h, --help       Displays this message

Examples
	$ microbundle build --globals react=React,jquery=$
	$ microbundle build --define API_KEY=1234
	$ microbundle build --alias react=preact
	$ microbundle watch --no-sourcemap # don't generate sourcemaps
	$ microbundle build --tsconfig tsconfig.build.json
```

## 🛣 Roadmap

Here's what's coming up for Microbundle:

- [ ] Add jest suit and testing env
- [ ] Add unit testing to the library
- [ ] Add watch mode to index.html, now only the grid-manager lib has watch mode

## 🥂 License

[MIT](https://oss.ninja/mit/developit/)

[rollup]: https://github.com/rollup/rollup
[babel]: https://babeljs.io/
[async-to-promises]: https://github.com/rpetrich/babel-plugin-transform-async-to-promises
