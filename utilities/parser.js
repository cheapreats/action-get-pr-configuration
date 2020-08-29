const PR_CONFIG_TOKEN = /PR_CONFIG:\r?\n/g;

module.exports = {

    /**
     * Given PR body, return the configuration string.
     * @param prBody
     * @returns {null|*|string}
     */
    getConfigurationString: function (prBody) {
        const tokens = prBody.split(PR_CONFIG_TOKEN);
        // If the token length is less than 2, then it means no CE_CONFIG key is found.
        if (tokens.length < 2) {
            return '';
        }
        // Otherwise, the last segment will be the valid configuration.
        return tokens[tokens.length - 1];
    },

    /**
     * Given configuration string, parse to a JS object.
     * @param configString
     * @returns {any}
     */
    parseConfiguration: function (configString) {
        let configuration = {};
        const lines       = configString.split(/\r?\n/g);
        for (const line of lines) {
            if (line) {
                const tokens             = line.split('=');
                configuration[tokens[0]] = tokens[1];
            }
        }
        return configuration;
    }

}
