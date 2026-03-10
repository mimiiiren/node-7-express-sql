# Intro to Node.js & Express.js & SQL

## 🚀 Getting Started

Follow these steps to set up the project on your local computer.

---

### 1. Copy the Github repo template into your Github account

Click the **Use this template** button (top right of this page) to create a copy of this repo into your own GitHub account.

<img width="1763" height="239" alt="Make a copy of a Github Repo Template screenshot" src="https://github.com/user-attachments/assets/c673a893-059a-46f3-b601-e2a054622d44" />

---

### 2. Clone your copied repo into your computer

1. Copy the link to your forked repo by clicking on the green Code button on this page

    ![Copy Github repo link screenshot](https://github.com/user-attachments/assets/01f8f297-b1e3-47b9-8947-9c806e0b6db7)

2. Open your Terminal
3. `cd` into your `Documents` folder in your computer
4. `cd` into your `dev` folder
5. Run this command, replacing the link with _your_ forked repo's link

    ```bash
    git clone https://github.com/YOUR-USERNAME/YOUR-FORK.git
    ````
---
   
### 3. Get Ready to Code in VS Code
1. Run `ls` to list all the files and folders in your current folder. You should see your newly cloned repo in the list.
2. Use `cd name-of-your-repo-here` to *change directories* into your newly cloned repo (make sure to type the actual name of the repo)
3. Open your newly cloned repo in VS Code using the `code .` command, if you have it installed. If you don't have it installed, there are also many other ways to do this, using the Finder, the Terminal, or opening directly in VS Code. Use the way is easiest for you.
4. Once your project is open in VS Code, open the Terminal in VS Code. 

---

# 🚀 Steps to Create a Node/Express Server

1. In the Terminal, navigate into the `node-5-express-intro` folder.
2. Check out your `package.json` file to see information about your project. 
    - Double check that it has `"type": "module"` which lets you import Node modules using the `import` keyword and ES Modules Syntax.
    - Check if there are any dependencies listed. 
3. Run `npm install express` to install the express package. Afterwards, you should see `express` listed as a dependency in your `package.json` file. You'll also see your `node_modules` folder generated.
4. Start writing your code!
    - Set up your Express server using boilerplate code
    - Define your API endpoints using `app.get()`
    - Create helper functions for each GET API Endpoint 
---

### How to run your server

1. In the terminal, navigate into the `src` directory that contains your `index.js` file
2. Start the server by running:

   `node index.js`

3. To automatically restart the server when you make changes, use the --watch flag:

   `node --watch index.js`

---

### How to test your API endpoints

1. Make sure the server is running first.
2. To test your API Endpoints, open up the browser and type the Base URL plus the API endpoint in the search bar. 

    Example 1: To test the `/get-all-books` endpoint, you'd type this link:

       https://localhost:3000/get-all-books

    Example 2: To test the `/get-one-book/:index` endpoint and get one book at index 2, you'd type this link:

       https://localhost:3000/get-one-book/2
