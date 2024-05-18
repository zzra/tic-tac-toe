# React Tic-Tac-Toe Project

## Current State 

determing how to test react using unit tests, currently e2e using playwright/codeceptjs
* cannot remove functions as they are dependant on react states, to remove them for unit testing would require repeating all of the logic in both a library and in the react, better served by e2e tests

## Testing
Uses codeceptjs and playwright
* due to nature of app could exhaustively test with combinatorics, not necessary

Setup for WSL
* see https://medium.com/@matthewkleinsmith/headful-playwright-with-wsl-4bf697a44ecf