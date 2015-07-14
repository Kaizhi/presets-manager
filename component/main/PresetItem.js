var React = require( 'react' );
var fs = window.require('fs');
var path = window.require('path');

var PresetItem = React.createClass({
	getInitialState: function () {
		return {
			deleting: false,
			expanded: false,
			items: this.props.items
		};
	},

	confirmDelete: function (evt) {
		evt.stopPropagation();

		this.setState({
			deleting: true
		});
	},

	cancelDelete: function (evt) {
		evt.stopPropagation();

		this.setState({
			deleting: false
		});
	},

	toggleExpand: function (evt) {
		if (this.state.expanded) {
			this.setState({
				expanded: false
			});
		} else {
			this.setState({
				expanded: true
			});
		}
	},

	render: function() {
		var classString = '';

		if (this.state.deleting){
			classString += 'deleting';
		}

		if (this.state.expanded) {
			classString += ' expanded';
		}

		function item(item, index) {
			item = path.basename(item, '.lrtemplate');
			return (
				<div key={index + item} index={index}>
					{item}
				</div>
			);
		};

		return (
			<li onClick={this.toggleExpand} className={classString}>
				{this.props.itemText}
				<span onClick={this.confirmDelete} className="actions" data-presetindex={this.props.index}><i className="fa fa-trash-o"></i></span>

				<div className="items-list">
					{this.state.items.map(item)}
				</div>

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
