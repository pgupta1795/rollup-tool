# Roll-UP TOOL

Please follow the steps to setup a local demo on your system

### What is this repository for?

- Creating a POC related to rollup of attributes for a PhysicalProduct
- Manipulate data on 3dexperience Cloud

### How do I get set up?

- IDE : VS Code (https://code.visualstudio.com/download)
- Server is responsible for fetching results from enovia using DS webservices
- Setup Server-
  - Setup SQL Server
    - Download MySQL - https://dev.mysql.com/downloads/installer/
    - Add MySQl path to env variable PATH (C:\Program Files\MySQL\MySQL Server 8.0\bin)
    - After installtion Create a user called m1 with passowrd as enoviaV6
    - Execute Command = mysql -u m1 -p
    - After this enter password
    - Execute Command= CREATE DATABASE rollup
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
