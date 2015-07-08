var React = require( 'react' );
var fs = window.require('fs');
var path = window.require('path');

var PresetItem = React.createClass({
	getInitialState: function () {
		return {
			deleting: false
		};
	},

	confirmDelete: function (evt) {
		this.setState({
			deleting: true
		});
	},

	cancelDelete: function (evt) {
		this.setState({
			deleting: false
		});
	},

	render: function() {
		var isDeleting = "";
		if (this.state.deleting){
			isDeleting = "deleting"
		}

		return (
			<li className={isDeleting}>
				{this.props.itemText}
				<span onClick={this.confirmDelete} className="actions" data-presetindex={this.props.index}><i className="fa fa-trash-o"></i></span>
				<div className="confirm-delete">
					<p>Are you sure?</p>
					<button onClick={this.props.deletePreset}>Confirm</button>
					<button onClick={this.cancelDelete}>Cancel</button>
				</div>
			</li>
		);
	}
});

module.exports = PresetItem;
