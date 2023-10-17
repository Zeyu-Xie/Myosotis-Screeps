module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'xie.zeyu20@gmail.com',
                token: 'dbb7bcd1-abdb-47ca-a719-e0e0c542bd19',
                branch: 'test',
                //server: 'season'
            },
            dist: {
                src: ['dist/*.js']
            }
        }
    });
}