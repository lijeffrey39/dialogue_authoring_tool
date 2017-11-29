import React from 'react';
import './utterances.css';
import {Link} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import FileMenu from './fileMenu.js';
import firebase from '../fire.js';

export default class Utterances extends React.Component 
{
	constructor(props) 
	{
		super(props);
		this.database = firebase.database();

		//make sure the url ends with /
		var currentUrl = props.match.url.endsWith("/") ? props.match.url : props.match.url + "/";
		this.state = 
		{
			currentLocation: currentUrl
		}

		this.currentRef = this.database.ref(this.state.currentLocation);
		this.urlToBread(currentUrl);
		//set it to test
		//greeting.set('test');
	}

	urlToBread(s)
	{
		console.log(s);
		var split = s.split("/");
		split = split.filter((val) => val);
		this.state.breadcrumbs = split.map(function(word) {
			return " > " + word;
		});
		console.log(this.state.breadcrumbs);
	}
	

	componentDidMount()
	{
		var self = this;
		//read the value
		this.currentRef.on('value', function(value){
			self.state.data = value.val();
			var data = Object.keys(self.state.data).map(function(key) {
				var newUrl = self.state.currentLocation + key;
				return (
					<Link key={key} 
						to={newUrl}> 
						{key} </Link>);
				});
			self.setState({folders: data});
		});
	}
	
	render()
	{
		return (
		<div className="file_explorer">
		<h1> <Link to="/" style={{color:"black"}}>Home</Link>{this.state.breadcrumbs} </h1>
		<MuiThemeProvider>
			<div>
			<Divider/>
			{this.state.folders}
			</div>
		</MuiThemeProvider>
		{/* <FileMenu></FileMenu> */}
		</div>);
	}
}

