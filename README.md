# My Firebase Auth

Built with create-react-app

## Setup

1. Create `.env.js` with `firebaseConfig` (firebase project - api keys)
2. Add line `export default firebaseConfig;` after pasting api config
    - ex:

        ```js
            const firebaseConfig = {
                ...
            }
            export default firebaseConfig;
        ```

## Available Scripts

In the project directory, you can run:

### `npm start`

- Run locally
- [http://localhost:3000](http://localhost:3000)

### `npm test`

- Run Unit Testing

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
