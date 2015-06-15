var React = require( 'react' );
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Dropzone = require('react-dropzone');

var Install = React.createClass({
	displayName: 'Install',
	onDrop: function (files) {
		console.log('Received files: ', files);
	},
	onHover: function () {
		console.log('hover');
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
