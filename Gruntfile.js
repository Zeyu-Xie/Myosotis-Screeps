module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'xie.zeyu20@gmail.com',
                token: 'dbb7bcd1-abdb-47ca-a719-e0e0c542bd19',
                branch: 'tutorial-5',
                //server: 'season'
            },
            dist: {
                src: ['tutorial-5/*.js']
            }
        }
    });
}