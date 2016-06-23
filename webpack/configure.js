'use strict';
const path = require('path');
const configure = {
    HOST: 'localhost',
    PORT: 8090,
    NODE_HOST: 'localhost',
    NODE_PORT: 9090,
    ROOT: (fp) => path.join(__dirname, '../', fp || ''),
    BUILD: (fp) => path.join(__dirname, '../build/', fp || ''),
    CLIENT: (fp) => path.join(__dirname, '../client/', fp || ''),
    SERVER: (fp) => path.join(__dirname, '../server/', fp || '')
};

configure.PATH = 'http://' + (configure.HOST) + (( configure.PORT == '' ) ? '/' : ':' + (configure.PORT) + '/');
configure.NODE_PATH = 'http://' + (configure.NODE_HOST) + (( configure.NODE_PORT == '' ) ? '/' : ':' + configure.NODE_PORT + '/');

module.exports = configure;

