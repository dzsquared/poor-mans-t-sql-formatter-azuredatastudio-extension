# Poor Man's T-SQL Formatter - VS Code Extension

This is a Azure Data Studio extension for Poor Man's T-SQL Formatter, a SQL formatting library available in a variety of other editors & IDEs.

This formatter's special focus on T-SQL (the SQL dialect of Microsoft SQL Server... and Sybase/SAP Adaptive Server Enterprise) makes Azure Data Studio a sensible target for support.

This formatter uses the JS library on npm for formatting (https://www.npmjs.com/package/poor-mans-t-sql-formatter), and that is itself a transpilation of the C# library / main project at http://architectshack.com/PoorMansTSqlFormatter.ashx.

## Features

This formatter has the same features under Azure Data Studio as it has under other environments (Visual Studio, SSMS, Notepad++, Atom Editor):

(list to be added - see homepage at http://architectshack.com/PoorMansTSqlFormatter.ashx)

### Extension Settings

The formatter exposes the same settings as in other IDEs / integrations, these can be located and set/overridden in the VS Code settings UI in the normal way.

## Release Notes

Please see the separate file CHANGELOG.md for product release notes.

## Status

* Readme needs some work
* Automated testing needs lots of work
* Performance in the JS environment still needs some work
* -> see (and/or add) issues for the VSCode integration at https://github.com/TaoK/poor-mans-t-sql-formatter-vscode-extension/issues
* -> see (and/or add) issues for the library / formatting functionality and options at https://github.com/TaoK/PoorMansTSqlFormatter/issues

