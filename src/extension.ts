// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { getConfigValue, ThemeConfig, updateConfig } from './config/config';

import {catimer} from './catimer';

let statusBarItem: vscode.StatusBarItem;
let catTimer: catimer;

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

	// initialize timer 
	catTimer = new catimer();
	// create a new status bar item that we can now manage
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);

	let showIcon = vscode.commands.registerCommand('focus.showIcon', () => {
		// call the start focus functi
		let options: vscode.InputBoxOptions = {
			prompt: "Type in your task name to start the focus session! (*≧ω≦)",
		}
		
		vscode.window.showInputBox(options).then((value: any) => {
			if (!value) return;
			catTimer.setTaskName = value;
			const config = vscode.workspace.getConfiguration('focus');
   			const workLengthSetting = getConfigValue("work_length_setting", config);
			catTimer.changeStatus;
			updateStatusBar();

			// Test to check if settings are populating and being passed downstream.
			vscode.commands.executeCommand( 'workbench.action.openSettings', 'focus' );
			console.log("setting val: " + workLengthSetting);
		});
	});

	context.subscriptions.push(startFocus);
	context.subscriptions.push(showIcon);
	context.subscriptions.push(statusBarItem);
}

// this method is called when your extension is deactivated
export function deactivate() {
	statusBarItem.dispose();
}

// Create event handler for when settings change through options page, then update it here.

// Called every time the status bar needs to be updated
function updateStatusBar(): void {
	let statusSymbol = catTimer.isRunning ? '$(play)' : '$(debug-pause)';
	statusBarItem.text =`${catTimer.timeRemaining} ` +
						statusSymbol + 
						`Session: ${catTimer.sessionNumber}/${catTimer.maxSessions} ` +
						`Task: ${catTimer.taskName}`;
	statusBarItem.show();
}