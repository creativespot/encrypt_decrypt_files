# Boilerplate

**Electron, ReactJs, Webpack, AmazeUI, Golang**

Working encrypt-decrypt application, featuring
- an Election app
- ReactJs to generate views
- AmazeUI css framework
- Webpack for bundling JS, CSS and other public assets
- Go compiled application for backend logic handling, communicating with Electron app through nodejs childprocess

**Structure**

```bash
assets/
    index.js            Webpack entry point
    css/
    fonts/
    img/
    js/
    jsx/
        components/     Reusable components
        pages/          Individual pages
        main.jsx        Initial page render
        pages.jsx       All page-contents should be registered in this file
dist/                   Webpack output location
features/               Reusable main process modules
logic/                  Go complied backend (and related files)
main_process/           Main process related modules - automatically required on Electron startup
index.html              Base HTML template for Electron
main.js                 Electron entry script
renderer.js             Electron renderer functions loaded on startup
webpack.config.js       Webpack config file
package.json            Nodejs/Npm package file
.babelrc                Babel config file
    
```


## To Use

**Note:** Currently, only works in Windows environment. 

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/creativespot/encrypt_decrypt_files
# Go into the repository
cd encrypt_decrypt_files
# Install dependencies
npm install
# Run the app
npm start


# Alternative, run the app in production environment
npm run start-prod
```


#### License

Copyright 2016

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
