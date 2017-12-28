import React from 'react';
import './folders.css';
import {Link} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import FileFolder from 'material-ui/svg-icons/file/folder';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Avatar from 'material-ui/Avatar';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
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
			folders: [],
			editFolderModalOpen: false
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
		this.state.breadcrumbs = [(<Link key="home" to="/" style={{color:"white"}}>Home </Link>)];
		var split = s.split("/");
		split = split.filter((val) => val);
		var url = "/";
		for(var i = 0; i < split.length; i++)
		{
			url += split[i] + "/";
			this.state.breadcrumbs.push(<RightArrow key={i} color={"white"}/>);
			this.state.breadcrumbs.push(<Link key={split[i]} to={url} style={{color:"white"}}> {split[i]} </Link>);
		}
	}

	/**
	 * onclick Function for each folder to change to new url
	 * @param {String} newUrl 
	 */
	changeUrl(newUrl)
	{
		window.location.href=newUrl;
	}

	/**
	 * Add an untitled folder
	 * potentially dangerous because updating this.state.folders before it is fetched from firebase
	 */
	addFolder()
	{
		var self = this;
		var temp = this.state.folders;
		temp.unshift(
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
			var data = Object.keys(self.state.data).map(function(key, index) {
				var newUrl = self.state.currentLocation + key;
				return (
					<div key={key}>
					<ListItem 
						onClick={() => self.changeUrl(newUrl)}
						onKeyboardFocus={() => void(0)}
        				leftAvatar={<Avatar icon={<FileFolder />} />}
						primaryText={key}
						rightIconButton={<IconButton><Edit onClick={() => self.editFolder(key)}/></IconButton>}
      				/>
						<Divider />
					</div> );
				});
			self.setState({folders: data});
		});
	}

	/**
	 * Open modal to allow edits to folder
	 * @param {Number} name of data in array
	 */
	editFolder(name)
	{
		this.originalName = name;
		this.setState({editFolderModalOpen: true, editFolderName: name});
	}

	handleModalSave()
	{
		var temp = this.state.data;
		var movedData = this.state.data[this.originalName];
		temp[this.originalName] = {};
		temp[this.state.editFolderName] = movedData;
		this.setState({editFolderModalOpen: false, data: temp});
	}

	handleModalCancel()
	{
		this.setState({editFolderModalOpen: false});
	}

	handleModalDelete()
	{
		
	}

	/**
	 * Handles changes in the name text field on the edit folder modal
	 * @param {*} event 
	 */
	handleNameChange(event)
	{
		this.setState({editFolderName: event.target.value});
	}
	
	render()
	{
		const actions=(<div><RaisedButton 
			label="Save" 
			primary={true}
			onClick={this.handleModalSave.bind(this)}
			/>
		<RaisedButton 
			label="Cancel" 
			onClick={this.handleModalCancel.bind(this)}
			style={{margin:"10px"}}
			/>
		<RaisedButton 
			label="Delete" 
			backgroundColor="#EF3434"
			labelColor="rgb(255,255,255)"
			onClick={this.handleModalDelete.bind(this)}
			/></div>);
		return (
		<MuiThemeProvider>
		<div className="folders">
		<AppBar
			title={this.state.breadcrumbs}
    		iconElementRight={
			<FloatingActionButton 
				mini={true}
				backgroundColor="white"
				iconStyle={{fill: "#1FBCD3"}}
				onClick={() => this.addFolder()}>
				  <ContentAdd />
			</FloatingActionButton>}
  		/>
		<Dialog
          title="Edit Folder"
          actions={actions}
          modal={false}
          open={this.state.editFolderModalOpen}
        >
          Name
		  <TextField
		  id="namefield"
		  style={{width:'50%', margin:'0 5% 0 25%'}}
          value={this.state.editFolderName}
		  onChange={this.handleNameChange.bind(this)}
          />
        </Dialog>
		<div>
			<Divider/>
			{this.state.folders}
		</div>
		</div>
		</MuiThemeProvider>);
	}
}

