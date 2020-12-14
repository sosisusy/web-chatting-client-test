const path = require("path")

const mode = process.env.NODE_ENV || "development"

console.log(mode)

module.exports = {
    mode: mode,
    entry: path.join(__dirname, "src/index.js"),
    output: {
        filename: "index.js",
        path: path.join(__dirname, "dist"),
    },
}