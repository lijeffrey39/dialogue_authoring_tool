import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Folders from './file_explorer/folders.js';
import Utterances from './file_explorer/utterances.js';
import Editor from './editor/editor.js';


const App = () => (
	<BrowserRouter>
	<div className="App">
		<Route exact path="/" component={Folders}/>
		<Route exact path="/:page" component={Folders}/>
		<Route exact path="/:page/:page" component={Utterances}/>
		<Route exact path="/:page/:page/:page" component={Editor}/>
  </div>
	</BrowserRouter>
);

export default App;
