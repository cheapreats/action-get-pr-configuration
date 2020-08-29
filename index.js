const core                                         = require('@actions/core');
const {getPullRequestAssociatedWithContext}        = require('./utilities/github');
const {getConfigurationString, parseConfiguration} = require('./utilities/parser');

async function main() {

    // Get PR information.
    const pullRequest = await getPullRequestAssociatedWithContext();
    if (!pullRequest) {
        return console.log(`Push is not associated with a pull request, skipping check.`);
    }

    const configString  = getConfigurationString(pullRequest.body);
    const configuration = parseConfiguration(configString);

    console.log(`The PR is ${JSON.stringify(pullRequest, undefined, 2)}`);
    console.log(`The PR configuration is ${JSON.stringify(configuration, undefined, 2)}`);

    core.setOutput('pr', JSON.stringify({
        number: pullRequest.number,
        title: pullRequest.title,
        body: pullRequest.body,
        configuration: configuration,
    }));

}

main().catch(e => core.setFailed(e));
