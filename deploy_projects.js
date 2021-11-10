const {spawn} = require('child-process-promise');

async function spawnProcess(cmd, args = []) {
  return new Promise((resolve, reject) => {
    console.info(cmd, args.join(' '));
    const {childProcess} = spawn(cmd, args,
      {capture: ['stdout', 'stderr'], shell: true})
      .then(resolve)
      .catch(err => {
        console.error('[spawn] child errored:', err);
        reject();
      });
    childProcess.stdout.on('data', data => console.info('[spawn] stdout:', data.toString().replace(/\s+$/g, '')));
    childProcess.stderr.on('error', error => console.error('[spawn] stderr:', error.toString().replace(/\s+$/g, '')));
  })
}

async function getProjects() {
  const sitesList = await spawnProcess('firebase', ["hosting:sites:list"]);
  const regEx = /https:\/\/(.*).web.app/g
  const match = sitesList.stdout.match(regEx)
  return match
    .filter(item => item !== 'https://remotion-22fde.web.app')
    .map(item => item.substring('https://'.length, item.indexOf('.web.app'))).reverse()
}

async function deployAll() {
  await spawnProcess("npm", ["run", "set-project"]);
  await spawnProcess("npm", ["run", "deploy-function"])

  const projectUrls = await getProjects()
  for (const project of projectUrls) {
    let replaceOrigin = `"site": (.+)`;
    let replaceDest = `"site": "${project}",`;
    await spawnProcess("sed", ["-i.bak", "-E", `s/${replaceOrigin}/${replaceDest}/g`, "firebase.json"]);
    await spawnProcess("npm", ["run", "deploy-hosting"])
  }
}

deployAll();


