import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NewEditor from './fileMenu.js';

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

	<div>
		hi
		<NewEditor></NewEditor>
	</div>
	/*
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
	*/
);

export default editor;