# html-webpack-variable-plugin
inject variables in process.env to window/global

## Installation
`npm install html-webpack-variable-plugin --save-dev`
or
`yarn add html-webpack-variable-plugin --dev`

## Usage
```js
// webpack.config.js
// construct a json with all variables that you want to pass into window/global.
process.env.VARS = JSON.stringify({
  foo: process.env.FOO,
  version: 'xxxx',
})
module.exports = {
  // ...
  plugins: [
    new HtmlWebpackVariablePlugin(process.env.VARS ? {
			map: process.env.VARS,
		} : {})
  ]
}
```

```js
// in your web app
// ...
console.log(window.foo) // exactly be equal to process.env.FOO
console.log(window.version) // xxxx
```

## Notice
fit with `html-webpack-plugin@2.29.0`