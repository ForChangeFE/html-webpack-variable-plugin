function VariablePlugin(options) {
    var varsMap = {};
    try {
        // should pass json with options.map
        var map = options.map || "{}";
        varsMap = JSON.parse(map);
    }
    catch (error) {
        throw new TypeError("[html-webpack-variable-plugin]: Option is invalid. Should pass json with options.map.");
    }
    var varsStr = Object.keys(varsMap).reduce(function (accumulator, key) {
        return (accumulator += key + "='" + varsMap[key] + "';");
    }, "");
    this.script = varsStr;
}
VariablePlugin.prototype.apply = function (compiler) {
    var self = this;
    compiler.plugin("compilation", function (compilation) {
        compilation.plugin("html-webpack-plugin-before-html-processing", function (htmlPluginData, callback) {
            htmlPluginData.html = htmlPluginData.html.replace("<head>", "<head><script>" + self.script + "</script>");
            callback(null, htmlPluginData);
        });
    });
};
module.exports = VariablePlugin;
