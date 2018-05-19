module.exports = function (grunt) {

  // Load grunt tasks automatically
  require("load-grunt-tasks")(grunt);
  require("time-grunt")(grunt);

  // Project configuration.
  grunt.initConfig({
    "pkg": grunt.file.readJSON("package.json"),

    "shell": {
      "lab": {
        "command": "./node_modules/.bin/lab --verbose --colors -S -r console -r html -o stdout -o coverage.html --threshold 97",
        "options": {
          "execOptions": {
            "maxBuffer": Infinity
          }
        }
      }
    },

    "eslint": {
      "options": {
        "cache": true
      },
      "target": [
        "src/**/*.js",
        "test/**/*.js",
        "*.js"
      ]
    },

    "watch": {
      "es6": {
        "files": ["src/**/*.js", "test/**/*.js"],
        "tasks": ["eslintNewer", "shell:lab"],
        "options": {
          "interrupt": true
        }
      },
      "test": {
        "files": [
          "src/**/*.js",
          "test/**/*.js"
        ],
        "tasks": ["test"]
      }
    },

    "jsinspect": {
      "js": {
        "options": {
          "threshold": 40,
          "identifiers": true,
          "literals": true,
          "minInstances": 2
        },
        "src": [
          "src/**/*.js",
          "test/**/*.js"
        ]
      }
    }
  });

  // Watch task for speed!
  grunt.registerTask("eslintNewer", [
    "newer:eslint"
  ]);

  // Default task(s).
  grunt.registerTask("default", [
    "build",
    "test"
  ]);

  // Common build task
  grunt.registerTask("build", [
    "eslint",
    "jsinspect"
  ]);

  grunt.registerTask("test", [
    "env:test",
    "shell:lab"
  ]);
};
