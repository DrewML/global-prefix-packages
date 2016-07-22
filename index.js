const { exec } = require('child_process');

function getGlobalPackages() {
    return new Promise((res, rej) => {
        exec('npm ls -g --depth 0 --json', (err, stdout) => {
            // Note: Ignoring error, because certain npm versions, in the event of a warning
            // will exit with status code > 0, but still return the data we need
            const packages = JSON.parse(stdout);
            res(packages.dependencies);
        });
    });
}

function stripNpmScope(name) {
    return name.replace(/@.+\//, '');
}

module.exports = function(prefix) {
    return getGlobalPackages().then(packages => {
        return Object.keys(packages).filter(name => {
            const nameWithoutScope = stripNpmScope(name);
            return nameWithoutScope.substring(0, prefix.length) === prefix
        });
    });
};
