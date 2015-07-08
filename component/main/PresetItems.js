var React = require( 'react' );
var fs = window.require('fs');
var path = window.require('path');

var PresetItems = React.createClass({
	statics: {
		deleteFolderRecursive: function (folderPath) {
			if( fs.existsSync(folderPath) ) {
				fs.readdirSync(folderPath).forEach(function(file,index){
					var curPath = path.join(folderPath, file);
					if (fs.lstatSync(curPath).isDirectory()) { // recurse
						deleteFolderRecursive(curPath);
					} else { // delete file
						fs.unlinkSync(curPath);
					}
				});

				fs.rmdirSync(folderPath);
			}
		},
	},

	getInitialState: function () {
		return {
			presetsList: this.props.presetsList || []
		};
	},

	onClick: function (evt) {
		if (evt.target.classList.contains('fa')) {
			this.deletePreset(evt);
			return;
		}
	},

	deletePreset: function (evt) {

		var list = this.state.presetsList,
			itemIndex = evt.target.parentNode.dataset.presetindex;

		this.constructor.deleteFolderRecursive(path.join(this.props.presetsPath, list[itemIndex]));
		list.splice(itemIndex, 1);

		this.setState({
			presetsList: list
		});
	},

	render: function() {
		function item(itemText, index) {
			return (
				<li key={index}>
					{itemText}
					<span className="actions" data-presetindex={index}><i className="fa fa-trash-o"></i></span>
				</li>
			);
		};
		return <ul onClick={this.onClick} className="presets-list">{this.state.presetsList.map(item)}</ul>;
	}
});

module.exports = PresetItems;
