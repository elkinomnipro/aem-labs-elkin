const fs = require('fs');
const path = require('path');

const LIBRARIES = [
  { package: 'preact', folder: 'preact' },
  { package: 'htm', folder: 'htm' },
];

function copyLibrary(lib) {
  // Define the library folder
  const libDir = path.join('scripts', lib.folder);

  // Remove existing lib folder
  if (fs.existsSync(libDir)) {
    fs.rmSync(libDir, { recursive: true });
  }

  // Create scripts/lib directory if not exists
  fs.mkdirSync(libDir, { recursive: true });

  // Copy specified files from node_modules/lib to scripts/lib
  fs.readdirSync(path.join('node_modules', lib.package), { withFileTypes: true }).forEach((file) => {
    fs.cpSync(path.join('node_modules', lib.package, file.name), path.join(libDir, file.name), {
      recursive: true,
      filter: (src) => (!src.endsWith('package.json')),
    });
  });

  // eslint-disable-next-line no-console
  console.info(`✅ Library ${lib.package} installed successfully!`, '\n');
}

function checkSourceMaps() {
  const hlxIgnorePath = '.hlxignore';
  if (!fs.existsSync(hlxIgnorePath) || !fs.readFileSync(hlxIgnorePath, 'utf-8').includes('*.map')) {
    // eslint-disable-next-line no-console
    console.info('⚠️ Sourcemaps may be added to the repo. WARNING: Please remove the *.map files or add "*.map" to .hlxignore before going live!\n');
  }
}

function checkPackageLockForArtifactory() {
  return new Promise((resolve, reject) => {
    fs.readFile('package-lock.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      try {
        const packageLock = JSON.parse(data);
        let found = false;
        Object.keys(packageLock.packages).forEach((packageName) => {
          const packageInfo = packageLock.packages[packageName];
          if (packageInfo.resolved && packageInfo.resolved.includes('artifactory')) {
            // eslint-disable-next-line no-console
            console.warn(`Warning: artifactory found in resolved property for package ${packageName}`);
            found = true;
          }
        });
        resolve(found);
      } catch (error) {
        reject(error);
      }
    });
  });
}

LIBRARIES.forEach((lib) => {
  copyLibrary(lib);
});

checkSourceMaps();

checkPackageLockForArtifactory()
  .then((found) => {
    if (!found) {
      // eslint-disable-next-line no-console
      console.info('✅ Libraries installed successfully!', '\n');
      process.exit(0);
    } else {
    // eslint-disable-next-line no-console
      console.error('🚨 Fix artifactory references before committing! 🚨');
      process.exit(1);
    }
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Error:', error);
    process.exit(1);
  });
