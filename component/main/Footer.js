var React = require( 'react' );
var ipc = window.require('ipc');

var Footer = React.createClass({
	closeApp: function () {
		ipc.send('app:event', 'close');
	},
	render: function() {
		return (
	      	<footer>
	      		<ul className="actions primary">
	      			<li onCLick={this.props.installPreset}><span><i className="fa fa-plus"></i></span></li>
	      		</ul>
	      		<ul className="actions secondary">
	      			<li><span><i className="fa fa-folder-open-o"></i></span></li>
	      			<li><span><i className="fa fa-refresh"></i></span></li>
	      			<li><span><i className="fa fa-question-circle"></i></span></li>
	      			<li onClick={this.closeApp}><span><i className="fa fa-times"></i></span></li>
	      		</ul>
	      	</footer>
		);
	}
});

module.exports = Footer;
