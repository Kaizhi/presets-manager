var React = require( 'react' );

var Footer = React.createClass({

	render: function() {
		return (
	      	<footer>
	      		<ul className="sections">
	      			<li><span><i className="fa fa-question-circle"></i></span></li>
	      			<li><span><i className="fa fa-folder-open-o"></i></span></li>
	      			<li><span><i className="fa fa-refresh"></i></span></li>
	      		</ul>
	      	</footer>
		);
	}
});

module.exports = Footer;
