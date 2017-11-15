import React from 'react';
import './fileExplorer.css';
import {
	BrowserRouter,
	Route,
	Link
  } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import FileMenu from './fileMenu.js';
import firebase from '../fire.js';

export default class FileExplorer extends React.Component 
{
	constructor(props) 
	{
		super(props);
		this.database = firebase.database();
		this.state = 
		{
			currentLocation: "/",
		}
		//get ssml
		this.currentRef = this.database.ref(this.state.currentLocation);
		this.loadData();
		//set it to test
		//greeting.set('test');
	}
	

	loadData()
	{
		var self = this;
		//read the value
		this.currentRef.on('value', function(value){
			self.state.data = value.val();
			var data = Object.keys(self.state.data).map(function(key) {
				var newUrl = self.state.currentLocation + key;
				return (<a href={newUrl} key={key}> {key} </a>);
				});
			self.setState({folders: data});
			console.log(self.state.folders);
		});
	}
	
	render()
	{
		
		return (
		<div className="file_explorer">
		
		{/* this breaks it :(
		<BrowserRouter>
			<div>
				<Route path="/fileExplorer" component={FileExplorer}/>
				<Route path="/editor" component={FileExplorer}/>	
			</div>
		</BrowserRouter> */}
		<h1> Home </h1>
		<MuiThemeProvider>
			<div>
			<Divider/>
			{this.state.folders}
			</div>
		</MuiThemeProvider>
		<FileMenu></FileMenu>
		<div>
		</div>
		</div>);
	}
}

