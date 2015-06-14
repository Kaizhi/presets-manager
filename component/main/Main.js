var React = require( 'react' );
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Main = React.createClass({
	displayName: 'Main',
	render: function() {
		return (
			<div>
				<aside>
					<ul className="sections">
						<li><Link to="install"><span><i className="fa fa-download"></i></span></Link></li>
						<li><Link to="manage"><span><i className="fa fa-list"></i></span></Link></li>
						<li><Link to="settings"><span><i className="fa fa-cog"></i></span></Link></li>
					</ul>
				</aside>
				<div className="content">
					<RouteHandler/>
				</div>
			</div>
		);
	}
});

module.exports = Main;
