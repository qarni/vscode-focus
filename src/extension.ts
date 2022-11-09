// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { getConfigValue, ThemeConfig, updateConfig } from "./config/config"
import { catimer } from './catimer';

let statusBarItem: vscode.StatusBarItem;
let catTimer: catimer;
let counter: { min: number, sec: number };
let sub_session_count: number;

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
			startInfinitetimer();
		});
	});

	// TODO
	// Add the call when click pause. change the catTimer.paused to change the boolean. click it twice --> call the starttimer

	context.subscriptions.push(startFocus);
	context.subscriptions.push(showIcon);
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
	catTimer.breakLength = longBreakLengthSetting;
	catTimer.breakLength = maxSessionsSetting;
}


async function startInfinitetimer() {
	// start from the given time 
	while (!catTimer.isPaused) {
		//finish the current paused session or the brand new session
		startTimer(catTimer.remainingMin, catTimer.remainingSec);
		await new Promise((resolve, reject) => setTimeout(resolve, 1000 * (catTimer.remainingMin * 60 + catTimer.remainingSec)));
		// finish the rest sessions
		for (let i = catTimer.sessionNumber; i < catTimer.maxSessions; i++) {
			catTimer.increaseSessionNumber(i);
			if (i % 2 === 1) {
				// WORK
				startTimer(catTimer.workLength, 0);
				await new Promise((resolve, reject) => setTimeout(resolve, 1000 * catTimer.workLength * 60));
			} else {
				// BREAK
				startTimer(catTimer.breakLength, 0);
				await new Promise((resolve, reject) => setTimeout(resolve, 1000 * catTimer.breakLength * 60));
			}
		}
		// long break
		catTimer.increaseSessionNumber(1); // set the session back to 1. 
		startTimer(catTimer.longBreakLength, 0);
		await new Promise((resolve, reject) => setTimeout(resolve, 1000 * catTimer.longBreakLength * 60));
	}
}

// this method is called when your extension is deactivated
export function deactivate() {
	statusBarItem.dispose();
}

function startTimer(minutes: number, seconds: number) {
	counter = { min: minutes, sec: seconds };
	let intervalId = setInterval(() => {

		if (catTimer.isPaused || (counter.min === 0 && counter.sec === 0))
			clearInterval(intervalId);

		// keep on setting remaining time 
		catTimer.setTimeRemaining(counter.min, counter.sec);
		updateStatusBar();


		if (counter.sec - 1 === -1) {
			counter.min -= 1;
			counter.sec = 59;
		} else {
			counter.sec -= 1;
		}

	}, 1000);
}

function toggleTimer(): void {
	catTimer.changeStatus();
	vscode.window.showInformationMessage(`Cat timer is now ` + (catTimer.isPaused ? 'paused' : 'resumed'));

	updateStatusBar();

	if (!catTimer.isPaused)
		startInfinitetimer();
}

// Called every time the status bar needs to be updated
function updateStatusBar(): void {
	let statusSymbol = catTimer.isPaused ? '$(play)' : '$(debug-pause)';
	statusBarItem.text = statusSymbol +
		`Remaining time: ` +
		`${catTimer.timeRemaining} ` +
		`Session: ${catTimer.sessionNumber}/${catTimer.maxSessions} ` +
		`Task: ${catTimer.taskName}`;
	statusBarItem.show();
}

function delay(arg0: number) {
	throw new Error('Function not implemented.');
}