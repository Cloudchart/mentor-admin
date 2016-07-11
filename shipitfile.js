module.exports = function(shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-shared')(shipit);
  require('shipit-npm')(shipit);

  shipit.initConfig({

    staging: {
      servers: 'app@mentor-staging.cochart.net',
      workspace: '/tmp/mentor-admin',
      deployTo: '/home/app/mentor-admin',
      repositoryUrl: 'git@github.com:Cloudchart/mentor-admin.git',
      keepReleases: 2,
      // shallowClone: true,
      shared: {
        overwrite: true,
        dirs: ['node_modules', 'public/uploads'],
        files: ['.env'],
      },
      npm: {
        remote: true,
        installFlags: '--production',
        triggerEvent: 'sharedEnd',
      },
    },

  })

  shipit.on('published', function() {
    return shipit.remote(`
      cd ${shipit.currentPath} &&
      forever stop mentor-admin-web &&
      forever start --append --uid "mentor-admin-web" bin/www
    `)
  })

}
