-- Primary tables
CREATE TABLE [dbo].[User] (
    UserName VARCHAR(20)  NOT NULL PRIMARY KEY,
    FirstName VARCHAR (20)  NOT NULL,
    LastName VARCHAR (20) NOT NULL,
    Email VARCHAR (20) NOT NULL,
    UserPassword VARCHAR  (20) NOT NULL,
    AccountType CHAR(1) NOT NULL
    CONSTRAINT Email_UNQ UNIQUE (Email)
);