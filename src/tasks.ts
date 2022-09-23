import * as vscode from 'vscode';
import { TreeItemLabel } from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class TaskProvider implements vscode.TreeDataProvider<Task>{

  private _onDidChangeTreeData: vscode.EventEmitter<Task | undefined | void> = new vscode.EventEmitter<Task | undefined | void>();
  readonly onDidChangeTreeData: vscode.Event<Task | undefined | void> = this._onDidChangeTreeData.event;

  public constructor(private workspaceRoot: string) { }

  /**  return the UI representation (TreeItem) of the element that gets displayed in the view. */
  getTreeItem(element: Task): vscode.TreeItem {
    return element;
  }

  /** return the children for the given element or root (if no element is passed). */
  getChildren(element?: Task): vscode.ProviderResult<Task[]> { }

  /** */
  getParent?(element: Task): vscode.ProviderResult<Task> {
    throw new Error('Method not implemented.');
  }

  resolveTreeItem?(item: vscode.TreeItem, element: Task, token: vscode.CancellationToken): vscode.ProviderResult<vscode.TreeItem> {
    throw new Error('Method not implemented.');
  }
}

export class Task extends vscode.TreeItem {

  public constructor(
    public label: string | TreeItemLabel,
    public collapsibleState: vscode.TreeItemCollapsibleState) {

    super(label, collapsibleState)
  }

  contextValue = 'task';
}