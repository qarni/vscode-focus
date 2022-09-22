import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class TaskProvider implements vscode.TreeDataProvider<Task> {

    onDidChangeTreeData?: vscode.Event<void | Task | Task[] | null | undefined> | undefined;

    getTreeItem(element: Task): vscode.TreeItem | Thenable<vscode.TreeItem> {
        throw new Error('Method not implemented.');
    }
    getChildren(element?: Task | undefined): vscode.ProviderResult<Task[]> {
        throw new Error('Method not implemented.');
    }
    getParent?(element: Task): vscode.ProviderResult<Task> {
        throw new Error('Method not implemented.');
    }
    resolveTreeItem?(item: vscode.TreeItem, element: Task, token: vscode.CancellationToken): vscode.ProviderResult<vscode.TreeItem> {
        throw new Error('Method not implemented.');
    }
}

export class Task extends vscode.TreeItem {
    contextValue = 'task';
}