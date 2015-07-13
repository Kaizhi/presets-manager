var React = require( 'react' );
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Main = React.createClass({
	displayName: 'Main',
	render: function() {
		return (
			<div className="content">
				<RouteHandler/>
			</div>
		);
	}
});

module.exports = Main;
