import React, { Component } from 'react';
import './fileMenu.css';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import editorStyles from './editorStyles.css';



const staticToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin];
const text = 'The toolbar above the editor can be used for formatting text, as in conventional static editors  …';

export default class NewEditor extends Component {
	state = {
	    editorState: createEditorStateWithText(text),
	};

	onChange = (editorState) => {
	    this.setState({ editorState });	
	};

	render() {
		return (
			<div className={editorStyles.editor} onClick={this.focus}> 
				<Editor
					editorState={this.state.editorState}
					onChange={this.onChange}
					plugins={plugins}
					ref={(element) => { this.editor = element; }}
				/>
				<InlineToolbar />
			</div>
		); 
	}
	
}