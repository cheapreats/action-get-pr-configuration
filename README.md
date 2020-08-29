# Get PR Configuration

A GitHub action to get PR configuration from pull-request description.

PR configuration looks like the following, written after description.
```
PR_CONFIG:
WANT_LGTM=ALL
IGNORE_INTEGRATION_TESTS=true
```

This action will output a JSON string named `pr` in the following format.
```javascript
{
    "number": 1,
    "title": "Your PR title",
    "body": "PR description body.",
    "configuration": {
        "KEY": "VALUE"
    } // The configuration object.
}
```

## How to Use

To use this action, use the following template

```yaml
get_pr_configuration:
  runs-on: ubuntu-latest
  name: Get PR configuration
  steps:
    - name: Get configuration action step
      id: getPrConfiguration
      uses: cheapreats/action-get-pr-configuration@v1.3
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
```
