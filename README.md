# NoteNest

**NoteNest** is a modern and intuitive web application built with the MERN stack that allows users to create, manage, and organize their notes seamlessly. It comes packed with features such as CRUD operations, note pinning, rich text editing, search functionality, tag-based sorting, and a light/dark mode toggle.

![image](https://github.com/Akshansh029/NoteNest-app/assets/145496594/45195907-9fe4-43d9-99c7-4d5f6f3a1505)


## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Project Structure](#project-structure)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Screenshots](#screenshots)
7. [Contributing](#contributing)

## Features

### CRUD Operations
- **Create New Note:** Add new notes with ease.
- **Read Note:** View existing notes.
- **Edit Note:** Update your notes as needed.
- **Delete Note:** Remove notes that are no longer needed.

### Pin Important Notes
- Pin notes to keep them at the top of your list for easy access.

### Rich Text Editor
- Write notes with a rich text editor that supports formatting, images, and more.

### Search Feature
- Quickly find notes using the search functionality.

### Sort Notes Using Tags
- Organize and sort your notes using custom tags.

### Light/Dark Mode
- Toggle between light and dark modes for a comfortable viewing experience.

## Technologies Used

- **Frontend:** React, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, MongoDB
- **Rich Text Editor:** [Quill](https://quilljs.com/)

## Project Structure
- NoteNest
  - client
    - dist
    - node_modules (folder contents not shown)
    - public
    - src
      - assets
      - components
      - pages
      - utils
      - App.css
      - App.jsx
      - index.css
      - main.jsx
    .eslintignore 
    index.html
    .gitignore 
    package-lock.json 
    package.json 
    README.md
    postcss.config.json
    tailwind.config.js 
  - server  
    - models  
    - node_modules (folder contents not shown)  
    - .env  
    - app.js  
    - config.json  
    - gitignore  
    - package-lock.json  
    - package.json  


## Installation

1. Clone the repository
    ```bash
    git clone [https://github.com/your-username/NoteNest.git](https://github.com/Akshansh029/NoteNest-app.git)
    ```

2. Navigate to the project directory
    ```bash
    cd NoteNest-app
    ```

3. Install dependencies for both client and server
    ```bash
    cd client
    npm install
    cd ../server
    npm install
    ```

4. Create a `.env` file in the server directory and add your MongoDB URI and other environment variables:
    ```env
    MONGO_URI=your-mongodb-uri
    PORT=5000
    ```

5. Start the development server
    ```bash
    cd server
    npm run dev
    ```

6. Start the client application
    ```bash
    cd ../client
    npm start
    ```

## Usage

- **Creating a Note:** Click on the "New Note" button, fill in the details in the rich text editor, and save.
- **Editing a Note:** Click on the note you want to edit, make changes, and save.
- **Deleting a Note:** Click on the delete icon next to the note you wish to remove.
- **Pinning a Note:** Click on the pin icon to pin a note.
- **Searching Notes:** Use the search bar at the top to find notes.
- **Sorting Notes:** Use tags to sort and filter notes.
- **Toggle Light/Dark Mode:** Use the switch in the header to toggle between light and dark modes.

## Screenshots

### Home Page
![image](https://github.com/Akshansh029/NoteNest-app/assets/145496594/92947820-6cb9-4aef-8d38-b90e99a49480)


### Rich Text Editor
![image](https://github.com/Akshansh029/NoteNest-app/assets/145496594/2df6b544-e073-436c-991a-d9b2bd4aa2c4)


### Light/Dark Mode
![image](https://github.com/Akshansh029/NoteNest-app/assets/145496594/7fe0e9a1-36e0-4ab4-920d-5aa4d0f4e180)


## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your changes.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

# Thank you
