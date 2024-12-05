/** @type {import('next').NextConfig} */

const { IS_DOCKER, _APP, _ASSET_TAG, _BRANCH_NAME, _COMMIT_SHA, _REPO } = process.env;

const nextConfig = {
    compiler: {
        removeConsole: false,
    },
    output: 'standalone',
    experimental: {
        reactCompiler: true,
    },
    env: {
        _APP,
        _BRANCH_NAME,
        _COMMIT_SHA,
    },
};

// If we are running in a docker container:
if (!!IS_DOCKER && !!_ASSET_TAG) {
    nextConfig.assetPrefix = `https://f.nooncdn.com/s/app/2024/${_REPO}/${_ASSET_TAG}/${_APP}/_next/_static/`;
    nextConfig.generateBuildId = async () => _ASSET_TAG;
}

module.exports = nextConfig;
