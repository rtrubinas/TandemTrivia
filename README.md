# Tandem Trivia

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Requirements](#requirements)
* [Issues](#issues)

## General info
This project is a quiz app for Tandem's Apprenticeship Code Challenge.
	
## Technologies
Project is created with:
* Javascript version 1.5
* HTML version 5.2
* CSS version 2.1
	
## Setup
1. Download and extract the zip file.
2. Open the folder using VS Code.
3. Install Live Server by Ritwick Dey extension (skip this step if it's already installed).
4. Select index.html in the VS Code explorer bar.
5. Click "Go Live" in the lower right corner of the VS Code status bar.

or

1. Download and extract the zip file.
2. Install Python3 from https://www.python.org/
3. Open the command line at the extracted TandemTrivia folder
4. Type "python -m http.server", sans quotes, and press enter
5. In your web browser's address bar, go to http://localhost:8000/index.html

## Issues
* Correct answer is not highlighted when an incorrect answer is chosen.
* JSON file is inaccessible from web browser, due to CORS error. A localhost server is required.
* Encoding errors in text when sourcing questions from Open Trivia Database.
