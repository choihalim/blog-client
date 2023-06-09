# Phase 4 Full-Stack Blogging Platform
Created by Halim Choi and Ryan Rojas

#### SETUP

- Run `npm install` and `npm start` in your terminal.
```console
$ npm install
$ npm start
```

#### USER STORY
- You must log in to use the platform.

As a user I can: 
 - View all posts on the platform
 - Create a new post with a title, body, search tags, and type
 - Like any blog post by any other user
 - Search the platform for any user or blog I want to read
 - Delete any of my own blog posts
#
#### DATABASE INFO
 The database used for this project was created with Flask and SQLAlchemy

#
#### COMPONENT HIERARCHY 

- App 
    - Authentication
    - Home
    - BlogForm
    - BlogDetail
    - BlogContainer
        - BlogCard