const cracoAlias = require("craco-alias");

export default {
    plugins: [
        {
            plugin: cracoAlias,
            options: {
                baseUrl: "./src",
                source: "tsconfig",
                tsConfigPath: "./tsconfig.json",
            },
        },
    ],
};