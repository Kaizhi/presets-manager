var React = require( 'react' );
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Dropzone = require('react-dropzone');

var unzip = window.require('unzip2');
var fs = window.require('fs');
var path = window.require('path');

window.fs = fs;

var Install = React.createClass({
	displayName: 'Install',
	onDrop: function (files) {
		files.forEach(function (file) {
			console.log(path.dirname(file.path));
			fs.createReadStream(file.path).pipe(unzip.Extract({ path: path.dirname(file.path) }));
		});
	},
	render: function() {
		return (
		    <div>
		    	<Dropzone onDrop={this.onDrop} style={{}}>
		        	<div>Try dropping some files here, or click to select files to upload.</div>
		      	</Dropzone>
		    </div>
		);
	}
});

module.exports = Install;
