'use strict';
import * as vscode from 'vscode';
import * as sqlops from 'sqlops';
import * as sqlFormatter from 'poor-mans-t-sql-formatter';


export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "poor-mans-tsql-formatter" is now active!');

    context.subscriptions.push(vscode.commands.registerCommand('extension.formatSql', () => {
        let editor = vscode.window.activeTextEditor;
        let doc = editor.document;
    
        let useSelection = !editor.selection.isEmpty;
        let selectionActivePoint = editor.selection.active;
        let inputSql = useSelection ? doc.getText(editor.selection) : doc.getText();
    
        let oldOffset = doc.offsetAt(selectionActivePoint);
        let oldOffsetPercent = inputSql.length == 0 ? 0 : (oldOffset / inputSql.length);
        
        let libResult;
    
        let extensionSettingsObject = vscode.workspace.getConfiguration("poor-mans-t-sql-formatter");
    
        return new Promise((resolve, reject) => {
          if (extensionSettingsObject.expectedLanguages
            && !extensionSettingsObject.expectedLanguages.find(l => l === doc.languageId || l === "*")
            )
            vscode.window.showWarningMessage("The language of the file you are attempting to format does not match the formatter's configuration. Would you like to format anyway?", "Format Anyway")
            .then(selectedAction => {
              if (selectedAction === "Format Anyway")
                resolve(true);
              else
                resolve(false);
            });
          else
            resolve(true);
          
        }).then(formatDespiteMismatch => {
          if (!formatDespiteMismatch)
            return;
    
          libResult = sqlFormatter.formatSql(inputSql, collectOptions(extensionSettingsObject));
    
          return new Promise((resolve, reject) => {
          if (extensionSettingsObject.confirmOnError
            && libResult.errorFound
            )
            vscode.window.showWarningMessage("The content you are attempting to format was not successfully parsed, and the formatted result may not match the original intent. Would you like to format anyway?", "Format Anyway")
            .then(selectedAction => {
              if (selectedAction === "Format Anyway")
                resolve(true);
              else
                resolve(false);
            });
          else
            resolve(true);
          }).then(formatDespiteError => {
            if (formatDespiteError) {
              editor.edit(mutator => {
                mutator.replace(useSelection ? editor.selection : getWholeDocRange(doc), libResult.text)
              }).then(editCompleted => {
                  if (!useSelection) {
                    //put the cursor back in approximately the same (relative) place we found it...
                    let newOffset = oldOffsetPercent * libResult.text.length;
                    let newPosition = doc.positionAt(newOffset);
                    editor.selection = new vscode.Selection(newPosition, newPosition);
                  }
              });
            }
          });
        }).catch(e => {console.log(e); throw e;});
      }));
    
}

function getWholeDocRange(doc) {
    var firstLine = doc.lineAt(0);
    var lastLine = doc.lineAt(doc.lineCount - 1);
    return new vscode.Range(0, firstLine.range.start.character, doc.lineCount - 1, lastLine.range.end.character);
  }
  
  function mergeInProperties(targetObject, sourceObject) {
    for (var attrname in sourceObject) {
      targetObject[attrname] = sourceObject[attrname];
    }
  }
  
  function collectOptions(extensionOptions) {
    var optionsReturn = {
      "errorOutputPrefix": extensionOptions.errorOutputPrefix,  
      "formattingType": extensionOptions.formattingType
    };
    mergeInProperties(optionsReturn, extensionOptions.min);
    mergeInProperties(optionsReturn, extensionOptions.std);
    return optionsReturn;
  }

// this method is called when your extension is deactivated
export function deactivate() {
}