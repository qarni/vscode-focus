// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { getConfigValue, ThemeConfig, updateConfig } from "./config/config";
import { TaskProvider } from './tasks';

import { catimer } from "./catimer";

let statusBarItem: vscode.StatusBarItem;
let catTimer: catimer;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "focus" is now active!');

  // initialize cat timer
  catTimer = new catimer();
  // create a new status bar item that we can now manage
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  statusBarItem.command = "focus.clickStatusBar";
  statusBarItem.tooltip = "Cat Timer Focus Mode";
  let clickStatusBar = vscode.commands.registerCommand(
    "focus.clickStatusBar",
    () => {
      console.log("clicked on status bar");

      vscode.window.showQuickPick(["a"]);
    }
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let startFocus = vscode.commands.registerCommand("focus.startFocus", () => {
    // Display a message box to the user
    vscode.window.showInformationMessage("Time to Focus!");

    // start focus session
    let options: vscode.InputBoxOptions = {
      prompt: "Type in your task name to start the focus session! (*≧ω≦)",
    };

    vscode.window.showInputBox(options).then((value: any) => {
      if (!value) return;
      catTimer.setTaskName = value;
      catTimer.changeStatus;
      updateStatusBar();
    });
  });

  let addTask = vscode.commands.registerCommand("focus.addTask", () => {

  });
  vscode.window.createTreeView('nodeDependencies', {
    treeDataProvider: new NodeDependenciesProvider(rootPath)
  });

  context.subscriptions.push(startFocus);
  context.subscriptions.push(statusBarItem);
  context.subscriptions.push(clickStatusBar);

  // Subscribe to configuration changes
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(onDidChangeConfiguration)
  );

  // Initialize from the current configuration
  onDidChangeConfiguration();
}

// this method is called when your extension is deactivated
export function deactivate() {
  statusBarItem.dispose();
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

  // Test to check if settings are populating and being passed downstream.
  vscode.commands.executeCommand("workbench.action.openSettings", "focus");
}

// Called every time the status bar needs to be updated
function updateStatusBar(): void {
  let statusSymbol = catTimer.isRunning ? "$(play)" : "$(debug-pause)";
  statusBarItem.text =
    `${catTimer.timeRemaining} ` +
    statusSymbol +
    `Session: ${catTimer.sessionNumber}/${catTimer.maxSessions} ` +
    `Task: ${catTimer.taskName}`;
  statusBarItem.show();
}
