# 🚧 NOTICE
There are some updates around build process pending merge. Please refer to `com-v4` repo for latest.
We will merge these updates to the boilerplate soon. (And this notice will be gone)

# noon web boilerplate
Next.js 15 | React 19 | Bun

## Getting Started

First, install dependencies:

```bash
bun install
```

Then you can run the development server of `1-simple-app` like:
```bash
bun run simple
```
><small>💡 This should command should be in the package.json scripts </small>

You can start editing the page by modifying `apps/<app>/*`. The page auto-updates as you edit the file.

## Deployment
Before either of the options below, you should configure your deployment parameters:
1. Update cloudbuild.yaml with the correct repo name
2. Update the app names if you haven't already. The folder names, package names within `./package.json` and `./apps/<app>/package.json.`

### Cloud Run
Before you deploy to *.noon.com *.noon.team or *.noon.partners, you should test your app through Cloud Run first.
To do this, you can run:
```bash
./deploy <app>
```
This will deploy the app to Cloud Run and show a URL to the deployed app.
You could also reach the app via `<branch>.<app>.beta.noon.com` - but to enabled this, please reach out to Nipun.

### Kubernetes
Deploying to kubernetes is required to go to production on *.noon.com.
The set up requires a few steps:
1. Reach out to DevOps for help. They will guide you to create the infra config for the app.
2. A proper Docker config is required for the app to deploy, but this should work as-is, unless you require a custom setup.
3. Once the infra config is set up, you can deploy the app using a google chat space eg `deploy mp prd`
