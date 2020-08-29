const core                  = require('@actions/core');
const {getOctokit, context} = require('@actions/github');

module.exports = {

    /**
     * Returns the pull request associated with current context, null if no PR is associated with it.
     * @returns {!Promise<?{number: !number, title: !string, body: !string}>}
     */
    getPullRequestAssociatedWithContext: async function () {
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
