const core                  = require('@actions/core');
const {getOctokit, context} = require('@actions/github');

module.exports = {

    /**
     * Returns the pull request associated with current context, null if no PR is associated with it.
     * @returns {!Promise<?{number: !number, title: !string, body: !string}>}
     */
    getPullRequestAssociatedWithContext: async function () {

        // If the context already have PR, just return the data.
        if (context.payload.pull_request) {
            return {
                number: context.payload.pull_request.number,
                title: context.payload.pull_request.title || '',
                body: context.payload.pull_request.body || ''
            }
        }

        const token = core.getInput('github-token', {required: true});
        const sha   = core.getInput('sha');

        const client = getOctokit(token, {});

        const result = await client.repos.listPullRequestsAssociatedWithCommit({
            owner: context.repo.owner,
            repo: context.repo.repo,
            commit_sha: sha || context.sha,
        });

        const pr = result.data.length > 0 && result.data[0];

        if (pr) {
            return {
                number: pr.number,
                title: pr.title,
                body: pr.body,
            };
        }
    }

}
