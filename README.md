# Roll-UP TOOL

Please follow the steps to setup a local demo on your system

### What is this repository for?

- Creating a POC related to rollup of attributes for a PhysicalProduct
- Manipulate data on 3dexperience Cloud
- POC uses react and material-ui components

### How do I get set up?

- IDE : VS Code (https://code.visualstudio.com/download)
- Server is responsible for fetching results from enovia using DS webservices
  - Setup Server-
    - Database Setup-
      - Download Mongodb and Compass to view database and interact using command line (https://www.mongodb.com/try/download/community)
      - Configure log and data store paths in <install directory>\bin\mongod.cfg.
      - Edit env variables to add installation/bin path (C:\Program Files\MongoDB\Server\5.0\bin), so that mongod can be used in command line or shell
    - Validate and configure .env according to environment
    - In cmd/vscode cd to rollup-tool/server
    - execute #npm install#
    - execute #npm start#
- Client is responsible for prettifying the results given by server
  - Setup Client-
    - In cmd/vscode cd to rollup-tool/client
    - execute #npm install#
    - execute #npm start#

### How to modify?

- Settings.json is property file for this POC
- Add custom attributes and label to see it in UI
- GET_ENDPOINT : Specify how to fetch details of object type
- SEARCH_ENDPOINT : Specify how to search object type
- POST_ENDPOINT : Specify how to update details of object type
- CHILD_ENDPOINT : Specify how to fetch childs of object type
