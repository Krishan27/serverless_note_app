'use strict';

module.exports.hello = (event, context, callback) => {
	console.log('Hello World');
	callback(null, 'Hello World');
};