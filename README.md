# vue-pug-lint-loader

> Vue pug lint loader for webpack

## Install

```console
$ npm install vue-pug-lint-loader --save-dev
```

## Usage

In your webpack configuration

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: "vue-pug-lint-loader",
        options: require('./.pug-lintrc.js'),
        enforce: "pre"
      },
    ],
  },
  // ...
}
```

To be safe, you should use `enforce: "pre"` section to check source files, not modified
by other loaders (like `pug-loader`)

### Options

You can pass [puglint options](https://github.com/pugjs/pug-lint#configuration-file)
using standard webpack [loader options](https://webpack.js.org/configuration/module/#useentry).

## License
MIT License
