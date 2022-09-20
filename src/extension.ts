// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { InputBoxOptions } from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "focus" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let startFocus = vscode.commands.registerCommand('focus.startFocus', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Time to Focus!');

		// call constructor & start focus session
	});

	let showIcon = vscode.commands.registerCommand('focus.showIcon', () => {
		// call the start focus functi
		let options: InputBoxOptions = {
			prompt: "Type in your task name here! (*≧ω≦)",
		}
		
		vscode.window.showInputBox(options).then((value: any) => {
			if (!value) return;
			const taskName = value;
		});
	});

	context.subscriptions.push(startFocus);
	context.subscriptions.push(showIcon);
}

// this method is called when your extension is deactivated
export function deactivate() {}
