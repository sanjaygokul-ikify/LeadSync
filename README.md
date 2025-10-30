# LeadFlow CRM - Local Development Setup

This guide explains how to run the LeadFlow CRM application on your local machine.

## Prerequisites

- [Node.js](https://nodejs.org/) (which includes npm) installed on your computer.

## Setup Instructions

### Step 1: Configure Your API Key

1.  Open the `config.js` file in your project folder.
2.  Get your API key from Google AI Studio: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
3.  Paste your API key into the `API_KEY` field, replacing `"YOUR_API_KEY_HERE"`.
4.  Save the `config.js` file.

### Step 2: Install Dependencies

Open your terminal or command prompt in the project's root directory and run the following command to install the necessary local web server:

```bash
npm install
```

### Step 3: Run the Application

After the installation is complete, run this command to start the web server:

```bash
npm start
```

This will automatically open the application in your default web browser. If it doesn't, navigate to the URL shown in your terminal (usually `http://127.0.0.1:8080`).

You can now use the application locally.