( function () {
	var React = require( 'react' );
	var remote = window.require( 'remote' );
	var Router = require('react-router'),
		Route = Router.Route,
		DefaultRoute = Router.DefaultRoute;

	// Components
	var Main = require( './main/Main.js' );
	var Install = require( './main/Install.js' );
	var Manage = require( './main/Manage.js' );
	var Settings = require( './main/Settings.js' );

	window.remote = remote;
	window.React = React;


	// declare our top-level routes and their hierarchy
	var routes = (
		<Route path="/" handler={Main}>
			<DefaultRoute handler={Install}/>
			<Route name="install" handler={Install}/>
			<Route name="manage" handler={Manage}/>
	    	<Route name="settings" handler={Settings}/>
		</Route>
	);

	Router.run(routes, Router.HashLocation, function (Root) {
		React.render(<Root/>, document.body);
	});

} )();
