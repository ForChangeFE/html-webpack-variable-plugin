/**
 * @author: zhazheng
 * @since: 2018/11/18
 * inject variables in process.env to window/global
 */
interface Options {
  map?: string;
}
function VariablePlugin(options: Options) {
  let varsMap = {};

  try {
    // should pass json with options.map
    const map = options.map || "{}";
    varsMap = JSON.parse(map);
  } catch (error) {
    throw new TypeError(
      `[html-webpack-variable-plugin]: Option is invalid. Should pass json with options.map.`
    );
  }

  const varsStr = Object.keys(varsMap).reduce((accumulator, key) => {
    return (accumulator += `${key}='${varsMap[key]}';`);
  }, "");

  this.script = varsStr;
}

VariablePlugin.prototype.apply = function(compiler) {
  const self = this;
  compiler.plugin("compilation", function(compilation) {
    compilation.plugin("html-webpack-plugin-before-html-processing", function(
      htmlPluginData,
      callback
    ) {
      htmlPluginData.html = htmlPluginData.html.replace(
        "<head>",
        `<head><script>${self.script}</script>`
      );
      callback(null, htmlPluginData);
    });
  });
};

module.exports = VariablePlugin;
