// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { getConfigValue, ThemeConfig, updateConfig } from "./config/config"
import { catimer } from './catimer';

let statusBarItem: vscode.StatusBarItem;
let catTimer: catimer;
let counter: { min: number, sec: number };
let sub_session_count: number;
let currentTimeout: number;

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
		vscode.window.showInformationMessage('Time to Focus!');

		let options: vscode.InputBoxOptions = {
			prompt: "Type in your task name to start the focus session! (*≧ω≦)",
		};

		vscode.window.showInputBox(options).then(async (value: any) => {
			if (!value) return;
			catTimer.setTaskName = value;
			updateStatusBar();
			vscode.window.showInformationMessage('Click status bar to start your work sesion!');
		});
	});

	// initialize timer 
	catTimer = new catimer();

	// create status bar and command to click on it
	const statusBarClick = 'sample.showSelectionCount';
	context.subscriptions.push(vscode.commands.registerCommand(statusBarClick, () => { toggleTimer(); }));
	// create a new status bar item that we can now manage
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.command = statusBarClick;
	statusBarItem.tooltip = "Toggle CAT timer play/pause";

	sub_session_count = 0;
	
	context.subscriptions.push(startFocus);
	context.subscriptions.push(statusBarItem);

	  // Subscribe to configuration changes
	  context.subscriptions.push(
		vscode.workspace.onDidChangeConfiguration(onDidChangeConfiguration)
	  );

	  // Initialize from the current configuration
	  onDidChangeConfiguration();
}

function onDidChangeConfiguration() {
	const config = vscode.workspace.getConfiguration("focus");
	const workLengthSetting = getConfigValue("work_length_setting", config);
	const breakLengthSetting = getConfigValue("break_length_setting", config);
	const longBreakLengthSetting = getConfigValue(
	  "long_break_length_setting",
	  config
	);
	const maxSessionsSetting = getConfigValue("max_sessions_setting", config);
	catTimer.workLength = workLengthSetting;
	catTimer.breakLength = breakLengthSetting;
	catTimer.longBreakLength = longBreakLengthSetting;
	catTimer.maxSessions = maxSessionsSetting;
}

async function startInfinitetimer() {
	while(!catTimer.isPaused) {

		let currmin = 0;
		let currsec = 0;

		if (catTimer.remainingMin > 0 || catTimer.remainingSec > 0) {
			currmin = catTimer.remainingMin;
			currsec = catTimer.remainingSec;
		}
		else if(catTimer.sessionType === 1) {
			currmin = catTimer.workLength;
			currsec = 0;
		}
		else if (catTimer.sessionType === 2) {
			currmin = catTimer.breakLength;
			currsec = 0;
		}
		else if (catTimer.sessionType === 3) {
			currmin = catTimer.longBreakLength;
			currsec = 0;
		}

		// start the session
		startTimer(currmin, currsec);
		currentTimeout = await new Promise((resolve, reject) => setTimeout(resolve, 1000 * (currmin * 60 + currsec)));
		if(catTimer.isPaused) {break;}

		// increment if not paused
		if(catTimer.sessionType === 1) {
			catTimer.setSessionNumber((catTimer.sessionNumber % catTimer.maxSessions) + 1);
			if (catTimer.sessionNumber === 1){
				catTimer.setSessionType(3);
				vscode.window.showInformationMessage("You finished a whole cycle! Time for an extended break!");
			}
			else {
				catTimer.setSessionType(2);
				vscode.window.showInformationMessage("Time to take a break!");
			}
		}
		else {
			catTimer.setSessionType(1);
			vscode.window.showInformationMessage("Time to work!");
		}
	}
}

// this method is called when your extension is deactivated
export function deactivate() {
	statusBarItem.dispose();
}

function startTimer(minutes: number, seconds: number) {
	counter = { min: minutes, sec: seconds };
	var intervalId = setInterval(() => {
		console.log(intervalId + " " + counter.min + " " + counter.sec)

		// keep on setting remaining time 
		catTimer.setTimeRemaining(counter.min, counter.sec);
		updateStatusBar();

		if (counter.sec - 1 === -1) {
			counter.min -= 1;
			counter.sec = 59;
		} else {
			counter.sec -= 1;
		}

		if ((counter.min === 0 && counter.sec === 0) || catTimer.isPaused)  {
			if (!catTimer.isPaused) {
				toggleTimer();
			}
			clearInterval(intervalId);
			clearTimeout(currentTimeout);
		}
	}, 1000);
}

function toggleTimer(): void {
	catTimer.changeStatus();
	vscode.window.showInformationMessage(`Cat timer is now ` + (catTimer.isPaused ? 'paused - click status bar to resume' : 'running'));

	updateStatusBar();

	if (!catTimer.isPaused)
		{startInfinitetimer();}
}

// Called every time the status bar needs to be updated
function updateStatusBar(): void {
	let statusSymbol = catTimer.isPaused ? '$(play) ' : '$(debug-pause) ';
	let sessionStatus = catTimer.sessionType === 1 ? `Session: ${catTimer.sessionNumber}/${catTimer.maxSessions}` : "Take a Break!";
	
	statusBarItem.text = statusSymbol +
		sessionStatus +
		` - Remaining time: ` +
		`${catTimer.timeRemaining} ` +
		` Task: ${catTimer.taskName}`;

	statusBarItem.show();
}

function delay(arg0: number) {
	throw new Error('Function not implemented.');
}