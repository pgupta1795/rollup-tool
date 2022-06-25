CREATE DATABASE rollup;
USE rollup;
CREATE TABLE Objects (
    ObjectId int NOT NULL,
    SpaceUrl varchar(255) NOT NULL,
    UserName varchar(255) NOT NULL,
    ObjectName varchar(255) NOT NULL,
    ObjectType varchar(255) NOT NULL,
    ObjectRevision varchar(255) NOT NULL,
    ObjectTitle varchar(255) NOT NULL,
    ObjectDescription varchar(255) NOT NULL,
    ObjectOwner varchar(255) NOT NULL,
    ObjectAttributes json NOT NULL,
    CONSTRAINT Object_Primary_Key PRIMARY KEY (ObjectId,SpaceUrl,Username)
);
CREATE TABLE Actions (
    ActionId int NOT NULL AUTO_INCREMENT,
    SpaceUrl varchar(255) NOT NULL,
    UserName varchar(255) NOT NULL,
    ActionDate datetime NOT NULL,
    ActionName varchar(255) NOT NULL,
    ObjectId int,
    Object_Old_Details json NOT NULL,
    Object_New_Details json NOT NULL,
    CONSTRAINT Action_Primary_Key PRIMARY KEY (ActionId,SpaceUrl,UserName),
    CONSTRAINT Person_Foreign_key FOREIGN KEY (ObjectId) REFERENCES Objects(ObjectId)
);