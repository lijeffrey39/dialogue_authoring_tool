import React from 'react';
import './fileMenu.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import SelectField from 'material-ui/SelectField';

export default class FileMenu extends React.Component 
{
	constructor(props) 
	{
		super(props);
		this.state = {
			open: true, 
			searchInputData: [],
			phaseInputData: [],
			phases : [
				'Problem 1',
				'Problem 2',
				'Problem 3',
			],
			taskStratInputData: [],
			taskStrats : [
				'Give Hint',
				'Positive Feedback',
				'Negative Feedback',
			],
			socialStratInputData: [],
			socialStrats : [
				'SD',
				'QE',
				'VSN',
			]
		};
	}
	
	//updates the autocomplete based on input
	handleUpdateInput = (value) => {
		this.setState({
			//change to have past results?
		  	searchInputData: [
				value,
				value + value,
				value + value + value,
		  	],
		});
	};

	//handles changes to dropdowns
	handlePhaseChange = (event, index, phaseInputData) => this.setState({phaseInputData});
	handleTaskStratChange = (event, index, taskStratInputData) => this.setState({taskStratInputData});
	handleSocialStratChange = (event, index, socialStratInputData) => this.setState({socialStratInputData});

	menuItems(data, input) {
		return data.map((value) => (
		  <MenuItem
			key={value}
			insetChildren={true}
			checked={input && input.indexOf(value) > -1}
			value={value}
			primaryText={value}
		  />
		));
	  }

	render() {
		return (
		<div className='fileMenu'>
			<MuiThemeProvider>
				<Drawer open={this.state.open}>
					<AutoComplete
          				hintText="Search"
          				dataSource={this.state.searchInputData}
          				onUpdateInput={this.handleUpdateInput}
        			/>
					<p>
						Filter by Tags
					</p>
					<SelectField
        				multiple={true}
        				hintText="Select a phase"
        				value={this.state.phaseInputData}
        				onChange={this.handlePhaseChange}
      				>
        				{this.menuItems(this.state.phases, this.state.phaseInputData)}
      				</SelectField>

					<SelectField
        				multiple={true}
        				hintText="Select a Task Strategy"
        				value={this.state.taskStratInputData}
        				onChange={this.handleTaskStratChange}
      				>
        				{this.menuItems(this.state.taskStrats, this.state.taskStratInputData)}
      				</SelectField>

					  <SelectField
        				multiple={true}
        				hintText="Select a Social Strategy"
        				value={this.state.socialStratInputData}
        				onChange={this.handleSocialStratChange}
      				>
        				{this.menuItems(this.state.socialStrats, this.state.socialStratInputData)}
      				</SelectField>


			  		
				</Drawer>
			</MuiThemeProvider>
		  </div>
		);
	}
}