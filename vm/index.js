'use strict'

var OpenAppHackBaseGenerator = require('../lib/BaseOpenAppHackGenerator')

var oahVMOptions

module.exports = OpenAppHackBaseGenerator.extend({
  prompting: {
    prompts: function () {
      var done = this.async()
      var prompts = [
        this._createInputPrompt('name', 'Role name?', this.appname),
      ]
      this.prompt(prompts, function (answers) {
        oahVMOptions = answers
        oahVMOptions.license = this.licenseOptions.license
        done()
      }.bind(this))
    }
  },

  writing: {
    createReadme: function () {
      this._copyTemplateToDesination('README.md.ejs', 'README.md',
              oahVMOptions)
    },
    createConfig: function () {
      this._copyTemplateToDesination('oah-config.yml.ejs', 'oah-config.yml',
              oahVMOptions)
    },
    createProvisioning: function () {
      this._copyTemplateToDesination('provisioning/oah-install.yml.ejs', 'provisioning/oah-install.yml')
      this._copyTemplateToDesination('provisioning/oah-main.yml.ejs', 'provisioning/oah-main.yml')
      this._copyTemplateToDesination('provisioning/oah-remove.yml.ejs', 'provisioning/oah-remove.yml')
      this._copyTemplateToDesination('provisioning/oah-reset.yml.ejs', 'provisioning/oah-reset.yml')
      this._copyTemplateToDesination('provisioning/oah-requirements.yml.ejs', 'provisioning/oah-reqirements.yml')

    },

    createHost: function () {
      this._copyTemplateToDesination('host/vagrant/Vagrantfile.ejs', 'host/vagrant/Vagrantfile', oahVMOptions)
      this._copyTemplateToDesination('host/docker/Dockerfile.ejs', 'host/docker/Dockerfile', oahVMOptions)
      this._copyTemplateToDesination('host/runc/makefile.ejs', 'host/runc/makefile', oahVMOptions)

    },

    createHandlers: function () {
      this._copyTemplateToDesination('provisioning/handlers/main.yml.ejs', 'provisioning/handlers/main.yml')
    },

    createFiles: function () {
      this._createEmptyFile('provisioning/files/.gitkeep')
    },

    createTemplates: function () {
      this._createEmptyFile('provisioning/templates/.gitkeep')
    },

    createVars: function () {
      this._copyTemplateToDesination('provisioning/vars/main.yml.ejs', 'provisioning/vars/main.yml')
    },

    createDefaults: function () {
      this._copyTemplateToDesination('provisioning/defaults/main.yml.ejs', 'provisioning/defaults/main.yml')
    }
  }
})
