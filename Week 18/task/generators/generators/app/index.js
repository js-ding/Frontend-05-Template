const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
        // this.option('babel'); // This method adds support for a `--babel` flag
    }

    async initPackage() {
        const answers = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "Your project name",
                default: this.appname // Default to current folder name
            }
        ]);

        const pkgJson = {
            "name": answers.name,
            "version": "",
            "description": "",
            "main": "index.js",
            "scripts": {
                "start": "webpack --config ./webpack.config.js",
                "test": "mocha --require @babel/register",
                "coverage": "nyc mocha"
            },
            "keywords": [],
            "author": "",
            "license": "ISC",
            "devDependencies": {},
            "dependencies": {}
        };

        // Extend or create package.json file in destination path
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
        this.npmInstall(['vue'], { 'save-dev': false });
        this.npmInstall([
            'webpack',
            'webpack-cli',
            'vue-loader',
            'vue-template-compiler',
            'css-loader',
            'vue-style-loader',
            'copy-webpack-plugin'
        ], { 'save-dev': true });
        this.npmInstall(['mocha'], { 'save-dev': true });
        this.npmInstall(['nyc'], { 'save-dev': true });
        this.npmInstall([
            '@babel/core',
            '@babel/preset-env',
            '@babel/register',
            '@istanbuljs/nyc-config-babel',
            'babel-plugin-istanbul',
            'babel-loader',
        ], { 'save-dev': true });

        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('src/index.html'),
            { title: answers.name },
        );
        this.fs.copyTpl(
            this.templatePath('main.js'),
            this.destinationPath('src/main.js'),
        );
        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js'),
        );
        this.fs.copyTpl(
            this.templatePath('Hello.vue'),
            this.destinationPath('src/Hello.vue'),
        );
        this.fs.copyTpl(
            this.templatePath('.gitignore'),
            this.destinationPath('.gitignore'),
        );
        this.fs.copyTpl(
            this.templatePath('.nycrc'),
            this.destinationPath('.nycrc'),
        );
        this.fs.copyTpl(
            this.templatePath('.babelrc'),
            this.destinationPath('.babelrc'),
        );
        this.fs.copyTpl(
            this.templatePath('sample.test.js'),
            this.destinationPath('test/sample.test.js'),
        );
    };
};
