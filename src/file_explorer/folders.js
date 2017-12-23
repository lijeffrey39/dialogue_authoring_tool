import React from 'react';
import './folders.css';
import {Link} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import FileFolder from 'material-ui/svg-icons/file/folder';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Add from 'material-ui/svg-icons/content/add-circle';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import FileMenu from './fileMenu.js';
import firebase from '../fire.js';

export default class Folders extends React.Component 
{
	constructor(props) 
	{
		super(props);

		//count of untitled folders for keys
		this.untitledCount = 0;
		this.database = firebase.database();

		//make sure the url ends with /
		var currentUrl = props.match.url.endsWith("/") ? props.match.url : props.match.url + "/";
		this.state = 
		{
			currentLocation: currentUrl,
			folders: []
		}
		//get ssml
		this.currentRef = this.database.ref(this.state.currentLocation);
		this.urlToBread(currentUrl);

		//set it to test
		//greeting.set('test');
	}
	
	/**
	 * Changes string s to html for breadcrumbs
	 * @param {String} s url
	 */
	urlToBread(s)
	{
		this.state.breadcrumbs = [(<Link key="home" to="/" style={{color:"black"}}>Home </Link>)];
		var split = s.split("/");
		split = split.filter((val) => val);
		var url = "/";
		for(var i = 0; i < split.length; i++)
		{
			url += split[i];
			this.state.breadcrumbs.push(<RightArrow/>);
			this.state.breadcrumbs.push(<Link key={split[i]} to={url} style={{color:"black"}}> {split[i]} </Link>);
		}
	}

	/**
	 * onclick Function for each folder to change to new url
	 * @param {String} newUrl 
	 */
	changeUrl(newUrl)
	{
		console.log(newUrl);
		window.location.href=newUrl;
	}

	/**
	 * Add an untitled folder
	 * potentially dangerous because updating this.state.folders before it is fetched from firebase
	 */
	addFolder()
	{
		console.log("addFolder");
		var self = this;
		var temp = this.state.folders;
		temp.push(
		  <div key={this.untitledCount}>
		  <ListItem onClick={() => self.changeUrl(this.state.currentLocation + "Untitled")}
			  leftAvatar={<Avatar icon={<FileFolder />} />}
			  primaryText={'Untitled'}
			/>
			  <Divider />
		  </div> 
		);
		this.untitledCount++;
		this.setState({folders:temp});
		console.log(this.state.folders);
	}

	/**
	 * format data into list after data has been retrieved
	 */
	componentDidMount()
	{
		var self = this;
		//read the value
		this.currentRef.on('value', function(value){
			self.state.data = value.val();
			var data = Object.keys(self.state.data).map(function(key) {
				var newUrl = self.state.currentLocation + key;
				return (
					<div key={key}>
					<ListItem onClick={() => self.changeUrl(newUrl)}
        				leftAvatar={<Avatar icon={<FileFolder />} />}
        				primaryText={key}
      				/>
						<Divider />
					</div> );
				});
			self.setState({folders: data});
		});
	}

	
	render()
	{
		return (
		<MuiThemeProvider>
		<div className="file_explorer">
		<h2> {this.state.breadcrumbs}
		<IconButton 
			disableTouchRipple={true}
			onClick={() => this.addFolder()}
			iconStyle={{color:"#44aa77", width:"60px", height:"60px"}}>
			<Add />
		</IconButton>  </h2>
		<div>
			<Divider/>
			{this.state.folders}
		</div>
		
		{/* <FileMenu></FileMenu>		 */}
		</div>
		</MuiThemeProvider>);
	}
}

