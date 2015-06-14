var React = require( 'react' );
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Settings = React.createClass({
	displayName: 'Settings',
	render: function() {
		return <h3>Settings</h3>;
	}
});

module.exports = Settings;
