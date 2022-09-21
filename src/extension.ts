// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import {catimer} from './catimer';

let statusBarItem: vscode.StatusBarItem;
let catTimer: catimer;
let counter : { min: number, sec : number };

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
		};
		
		vscode.window.showInputBox(options).then(async (value: any) => {
			if (!value) return;
			catTimer.setTaskName = value;
			catTimer.changeStatus;
			updateStatusBar();
			for (let i = 0; i < 4; i++) {
				startTimer("work");
				await new Promise((resolve, reject) => setTimeout(resolve, 1000 * 25 * 60));
				startTimer("break");
				await new Promise((resolve, reject) => setTimeout(resolve, 1000 * 5 * 60));

			}
			startTimer("long break");
			await new Promise((resolve, reject) => setTimeout(resolve, 1000 * 20 * 60));
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

function startTimer(sessionType : String) {
	let minutes : number;
	if (sessionType === "work") {
		minutes = catTimer.workLength;
		catTimer.setSubSessionName("work");
	} else if (sessionType === "break") {
		minutes = catTimer.breakLength;
		catTimer.setSubSessionName("break");
	} else {
		minutes = catTimer.longBreakLength;
		catTimer.setSubSessionName("long break");
	}
	counter = { min: minutes, sec: 0 };
	let intervalId = setInterval(() => {
		if (counter.sec - 1 === -1) {
			counter.min -= 1;
			counter.sec = 59;
		} else {
			counter.sec -= 1;
		}
		if (counter.min === 0 && counter.sec === 0) {
			clearInterval(intervalId);
		}
		catTimer.setTimeRemaining(counter.min, counter.sec);
		updateStatusBar();

	}, 1000);
  }

  // Called every time the status bar needs to be updated
function updateStatusBar(): void {
	let statusSymbol = catTimer.isRunning ? '$(play)' : '$(debug-pause)';
	statusBarItem.text = `Remained ${catTimer.subSessionName} time: ` + 
						`${catTimer.timeRemaining} ` +
						statusSymbol + 
						`Session: ${catTimer.sessionNumber}/${catTimer.maxSessions} ` +
						`Task: ${catTimer.taskName}`;
	statusBarItem.show();
}

function delay(arg0: number) {
	throw new Error('Function not implemented.');
}
