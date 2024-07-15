# Flashnode: AI-Powered Flashcards for Hashnode Posts

<p align="center"><img src="https://github.com/user-attachments/assets/9eecde0a-98a9-4f4e-8bb6-0d4f7d26e11f" alt="Logo" /></p>

## What is Flashnode🤔

Flashnode is a Chrome extension that leverages ChatGPT to create custom flashcards for any Hashnode post.

<p align="center"><img src="https://github.com/user-attachments/assets/1256a449-0c5b-498d-8eb7-198b7d377274" alt="Logo" /></p>

Each flashcard set is saved by default, and users can view all saved sets in the Flashnode web app.

> 💡 This repository contains both the Chrome extension as well as the web app (inside `extension` and `web-app` subdirectories).

## Main features

### Extension

#### 👉 Enabled Only for Hashnode Posts

The extension detects a specific `link` tag inside the `<head>` of a page to determine whether it contains a Hashnode post. 

```HTML
<link rel="author" href="https://hashnode.com/@username" />
```

If this tag is not found, the extension is "disabled," and the popup only shows links to Hashnode and the Flashnode web app.

<p align="center"><img src="https://github.com/user-attachments/assets/c32f1024-60c8-4714-a2f6-fc799eb2ccd5" alt="Logo" /></p>

#### 👉 AI-Generated Flashcards

Flashnode uses ChatGPT to generate questions and answers about a given Hashnode post, displaying them as 'flashcards'.

#### 👉 Page Blurring

To prevent "cheating🤓", the Hashnode page is blurred when you open the extension. The page is unblurred once you close the extension.

https://github.com/user-attachments/assets/182c3cac-d177-4881-a4d3-7ef317e29ceb

#### 👉 Storing Flashcards using `chrome.storage`

All flashcards are stored by default using chrome.storage and can be viewed in the Flashnode web app. Users can also choose not to save a flashcard set using the toggle switch in the upper right-hand corner.

https://github.com/user-attachments/assets/3403bf64-3dae-49ad-b2c4-c0cf939d8972

### Web App

#### 👉 View All Saved Flashcards

Users can view all saved flashcards using this web app, which uses `chrome.runtime.sendMessage` to retrieve them.

#### 👉 Delete Flashcards

Users can delete any flashcard.

https://github.com/user-attachments/assets/ab13610e-339d-408a-933e-57261d84bd7b

#### 👉 Updates Without Page Refresh

When new flashcards are saved while the web app is open, the new sets are displayed immediately without needing to refresh the page.

## How To Run Flashnode Locally🏃

To run Flashnode locally, you will need `NodeJS` installed and OpenAI Key.

### Step 1: Clone this Repository

```sh
git clone https://github.com/filip-melka/flashnode.git
```

### Step 2: Run the Extension Locally

-  Navigate to [chrome://extensions](chrome://extensions/)
-  Click on 'Load unpacked' and select the `extension` subdirectory
-  Pin the extension for easy access from the extensions panel next to the search bar
### Step 3: Install web app dependencies

- `cd` into the `web-app` subdirectory and run:

```sh
npm install
```

### Step 4: Set Environment Variables

-   Inside the `web-app` subdirectory create a `.env.local` file

```
NEXT_PUBLIC_EXTENSION_ID=[extension-id]
OPENAI_KEY=[your openai-key]
```

### Step 5: Run the development server

```sh
npm run dev
```

That's it! You're now running Flashnode locally 🎉
