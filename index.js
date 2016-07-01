const pify = require('pify');
const { join } = require('path');
const { readdir, stat } = require('fs');
const { exec } = require('child_process');

const statAsync = pify(stat);

// TODO: Support scoped packages

function getGlobalModulesPath() {
    return pify(exec)('npm prefix -g').then(path => {
        const pathWithoutEOL = path.replace('\n', '');
        return join(pathWithoutEOL, 'lib/node_modules');
    });
}

function getDirsInDir(path) {
    return pify(readdir)(path).then(files => {
        const pendingStats = files.map(file => statAsync(join(path, file)));

        return Promise.all(pendingStats).then(stats => {
            return stats.reduce((list, fileStat, i) => {
                if (fileStat.isDirectory()) {
                    list.push(files[i]);
                }

                return list;
            }, []);
        });
    });
}

module.exports = function(prefix) {
    return getGlobalModulesPath().then(getDirsInDir).then(packages => {
        return packages.filter(packageName => packageName.startsWith(prefix));
    });
};
