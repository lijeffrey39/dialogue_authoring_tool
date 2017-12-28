import React from 'react';
import './folders.css';
import {Link} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {ListItem} from 'material-ui/List';
import FileFolder from 'material-ui/svg-icons/file/folder';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Avatar from 'material-ui/Avatar';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
// import FileMenu from './fileMenu.js';
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
			currentLocation: currentUrl, //current location
			folders: [], //list html for folders
			editFolderModalOpen: false, //whether to show the editFolderModal
			editNew: false //whether we are editing a new modal
		}
		this.currentRef = this.database.ref(this.state.currentLocation);
		this.urlToBread(currentUrl);
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
	 * Add a new folder and open the edit folder modal
	 */
	addFolder()
	{
		this.setState({editNew: true}, () => this.editFolder("Untitled"));
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
			if(!self.state.data)
			{
				return;
			}
			var data = Object.keys(self.state.data).map(function(key) {
				var newUrl = self.state.currentLocation + key;
				return (
					<div key={key}>
					<ListItem 
						onClick={() => self.changeUrl(newUrl)}
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

	/**
	 * If the folder is not new, delete data at original name and move data to new name.
	 * If the folder is new, add an empty subfolder.
	 * Update the database and close the modal.
	 */
	handleModalSave()
	{
		if(this.state.editFolderName !== "")
		{
			if(!this.state.editNew)
			{
				var movedData = this.state.data[this.originalName];
				this.database.ref(this.state.currentLocation + this.originalName).set({});
			}
			else
			{
				//needs to have something inside or it will be blank
				var movedData = {Untitled: ""};
			}
			this.database.ref(this.state.currentLocation + this.state.editFolderName).set(movedData);
			this.setState({editFolderModalOpen: false, editNew: false});
		}
	}

	/**
	 * Close the modal
	 */
	handleModalCancel()
	{
		this.setState({editFolderModalOpen: false, editNew: false});
	}

	/**
	 * Delete the current folder and close the modal
	 */
	handleModalDelete()
	{
		this.database.ref(this.state.currentLocation + this.state.editFolderName).set({});
		this.setState({editFolderModalOpen: false, editNew: false});
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
		<div>
          Name
		  <TextField
		  id="namefield"
		  style={{width:'50%', margin:'0 5% 0 25%'}}
          value={this.state.editFolderName}
		  onChange={this.handleNameChange.bind(this)}
		  errorText={(this.state.editFolderName === "" && 'Required') || 
		  			(this.state.editFolderName === "Untitled" && 'Please change the name')}
          />
		  </div>
        </Dialog>
		<div>
			<Divider/>
			{this.state.folders}
		</div>
		</div>
		</MuiThemeProvider>);
	}
}

