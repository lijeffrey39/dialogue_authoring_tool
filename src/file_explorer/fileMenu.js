import React from 'react';
//import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import SelectField from 'material-ui/SelectField';

export default class DrawerSimpleExample extends React.Component 
{
	constructor(props) 
	{
		super(props);
		this.state = {
			open: true, 
			searchInputData: [],
			phasesInputData: [],
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
	
	//toggles the drawer 
	handleToggle = () => this.setState({open: !this.state.open});
	
	//updates the autocomplete based on input
	handleUpdateInput = (value) => {
		this.setState({
		  	searchInputData: [
				value,
				value + value,
				value + value + value,
		  	],
		});
	};

	handlePhaseChange = (event, index, values) => this.setState({values});

	menuItems(values) {
		return values.map((value) => (
		  <MenuItem
			key={value}
			insetChildren={true}
			checked={this.phaseInputData && this.phaseInputData.indexOf(value) > -1}
			value={value}
			primaryText={value}
		  />
		));
	  }

	render() {
		return (
		<div>
			<MuiThemeProvider>
				<RaisedButton
			  		label="Toggle Drawer"
			  		onClick={this.handleToggle}
				/>
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
        				value={this.state.phasesInputData}
        				onChange={this.handlePhaseChange}
      				>
        				{this.menuItems(this.state.phases)}
      				</SelectField>


			  		
				</Drawer>
			</MuiThemeProvider>
		  </div>
		);
	  }
	}