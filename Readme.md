# NodeJsBackend Projects

## Overview

This workspace contains several small, focused Node.js backend projects and tutorials for learning core Node.js and Express patterns. Each project lives in its own folder with an individual `package.json` and a small example app.

## Projects

1. **01_FileSystem/**
   - Purpose: Practice Node.js filesystem operations.
   - Key topics: reading and writing files with the `fs` module.
   - Entry point: `script.js`

2. **02_CreateServer/**
   - Purpose: Build a basic HTTP server from scratch.
   - Key topics: native Node `http` module, request handling, server setup.
   - Entry point: `script.js`

3. **03_ExpressJs/**
   - Purpose: Learn Express.js fundamentals and routing.
   - Key topics: Express setup, middleware, routing, development with `nodemon`.
   - Entry point: `script.js`

4. **04_MiniProject/**
   - Purpose: Small Express app demonstrating EJS templating and static assets.
   - Key topics: routing, EJS views, static `public` folder, basic CRUD patterns.
   - Entry point: `script.js`
   - Notable folders: `public/` (static assets), `views/` (EJS templates), `files/` (example data files)

5. **05_MongoDB/**
   - Purpose: Example Express app using MongoDB (Mongoose) for user CRUD.
   - Key topics: Mongoose schemas, models, create/update/delete routes.
   - Entry point: `app.js`

6. **06_UserDBProject/**
   - Purpose: Another small user-management Express example using a user model.
   - Key topics: routing, views, basic DB interactions.
   - Entry point: `app.js`

7. **07_Authentication/**
   - Purpose: Learn authentication patterns and concepts.
   - Key topics: authentication flow, password handling, session management.
   - Entry point: `app.js`

8. **08_AuthProject/**
   - Purpose: Full authentication project with user model and views.
   - Key topics: user registration, login, signup forms, middleware, authentication.
   - Entry point: `app.js`
   - Notable folders: `model/` (user schema), `public/` (static assets), `views/` (EJS templates)

9. **09_DataAssociation/**
   - Purpose: Learn data associations and relationships between models.
   - Key topics: one-to-many relationships, Mongoose population, data linking.
   - Entry point: `app.js`
   - Notable folders: `models/` (post and user models with relationships)

## Quick Usage

- Install dependencies for a project by changing into its folder and running:

```bash
cd 04_MiniProject
npm install
```

- Start a project (if it includes a `dev` or `start` script):

```bash
npm run dev
# or
npm start
```

If a project does not include `dev`/`start` scripts, run the entry file directly:

```bash
node script.js
# or
node app.js
```

## Notes

- Each project is intentionally small and self-contained for learning. Inspect the folder `package.json` files to see available scripts for each project.

## Proud Owner 😎

- Portfolio: https://www.anikeshroy.in
- LinkedIn: https://linkedin.com/in/anikeshroy
- Instagram: https://instagram.com/anikesh.royy
- Facebook: https://facebook.com/anikesh.royy
- Email: anikeshworkmail@gmail.com
