import React from 'react';
import './fileExplorer.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import FileMenu from './fileMenu.js';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';


const style = {
  paper: {
    display: 'inline-block',
    float: 'left',
    margin: '16px 32px 16px 0',
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  },
};

const editor = () => (

	<div className="file_explorer">
		<h1>Dialogue Editor</h1>
		<MuiThemeProvider>
			<Divider/>
			      <Menu>
			        <MenuItem primaryText="Break" leftIcon={<RemoveRedEye />} />
			        <MenuItem primaryText="Rate" leftIcon={<PersonAdd />} />
			        <MenuItem primaryText="Pitch" leftIcon={<ContentLink />} />
			        <MenuItem primaryText="Volume" leftIcon={<ContentCopy />} />
			        <MenuItem primaryText="Emphasis" leftIcon={<Download />} />
			        <Divider />
			      </Menu>
			<TextField
		      hintText="Enter dialogue here"
		      multiLine={true}
		      rows={2}
		      rowsMax={4}
		    />
		</MuiThemeProvider>
		<FileMenu></FileMenu>
		<div>
		</div>
    </div>
);

export default editor;