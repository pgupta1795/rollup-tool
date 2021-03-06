# Roll-UP TOOL

Please follow the steps to setup a local demo on your system

### What is this repository for?

- Creating a POC related to rollup of attributes for a PhysicalProduct
- Manipulate data on 3dexperience Cloud
- Frontend : POC uses react and material-ui components
- Backend : POC uses Express, Node as supported library
- Database : Mongodb database is used in POC

### How do I get development set up?

- IDE : VS Code (https://code.visualstudio.com/download)
- Server is responsible for fetching results from enovia using DS webservices
  - Setup Database :
    - Download Mongodb and Compass to view database and interact using command line (https://www.mongodb.com/try/download/community)
    - Configure log and data store paths in <install directory>\bin\mongod.cfg.
    - Edit env variables to add installation/bin path (C:\Program Files\MongoDB\Server\5.0\bin), so that mongod can be used in command line or shell
  - Setup Server :
    - Validate and configure .env according to environment
    - In cmd/vscode cd to rollup-tool/server
    - execute #npm install#
    - execute #npm start#
- Client is responsible for prettifying the results given by server
  - Setup Client :
    - In cmd/vscode cd to rollup-tool/client
    - execute #npm install#
    - execute #npm start#
- Create .env file in server and client folders (similar to .env.example file)
- Add entry of HOST variable from .env file to hosts file
- Restart server and access from url - http://rollup.com/

### How to modify properties?

- Settings.json is property file for this POC
- Add custom attributes and label to see it in UI
- GET_ENDPOINT : Specify how to fetch details of object type
- SEARCH_ENDPOINT : Specify how to search object type
- POST_ENDPOINT : Specify how to update details of object type
- CHILD_ENDPOINT : Specify how to fetch childs of object type
