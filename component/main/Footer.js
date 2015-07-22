var React = require( 'react' );
var ipc = window.require('ipc');

var Footer = React.createClass({
	closeApp: function () {
		ipc.sendSync('app:eventSync', 'close');
	},
	render: function() {
		return (
	      	<footer>
	      		<ul className="actions primary">
	      			<li onClick={this.props.selectFiles}><span><i className="fa fa-plus"></i></span></li>
	      		</ul>
	      		<ul className="actions secondary">
	      			<li onClick={this.props.refresh}><span><i className="fa fa-refresh"></i></span></li>
	      			// <li onClick={this.toggleInfo}><span><i className="fa fa-question-circle"></i></span></li>
	      			<li onClick={this.closeApp}><span><i className="fa fa-times"></i></span></li>
	      		</ul>
	      	</footer>
		);
	}
});

module.exports = Footer;
