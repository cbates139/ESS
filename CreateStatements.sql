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
CREATE TABLE [dbo].[Quote] (
    QuoteID INT  NOT NULL IDENTITY PRIMARY KEY,
    CreationDate DATETIME  NOT NULL,
    PreferredDate DATETIME NOT NULL,
    QuoteDescription VARCHAR (MAX) NULL,
    QuoteCost FLOAT NULL,
    QuoteStatus VARCHAR(20) NOT NULL
);
CREATE TABLE [dbo].[Item] (
    ItemID VARCHAR (15)  NOT NULL PRIMARY KEY,
    ItemName VARCHAR (MAX)  NOT NULL,
    ItemDescription VARCHAR (MAX) NULL,
    ItemImageURL VARCHAR (MAX) NULL,
    ItemCost FLOAT NOT NULL
);
-- Inherited Tables
CREATE TABLE [dbo].[UserSupplier] (
    UserName VARCHAR(20)  NOT NULL,
    CompanyName VARCHAR (MAX)  NOT NULL,
    CompanyReg VARCHAR (8) NOT NULL,
    CONSTRAINT FK_UserName_Supplier FOREIGN KEY (UserName) REFERENCES [dbo].[User](UserName)
);
CREATE TABLE [dbo].[UserEmployee] (
    UserName VARCHAR(20)  NOT NULL,
    Department VARCHAR (MAX)  NOT NULL,
    JobRole VARCHAR (MAX) NOT NULL,
    CONSTRAINT FK_UserName_Employee FOREIGN KEY (UserName) REFERENCES [dbo].[User](UserName)
);
-- User Attribute Tables
CREATE TABLE [dbo].[PaymentMethod] (
    UserName VARCHAR(20)  NOT NULL,
    AccountNumber INT  NOT NULL,
    SortCode INT NOT NULL,
    Reference VARCHAR(30) NOT NULL
    CONSTRAINT FK_UserName_PaymentMethod FOREIGN KEY (UserName) REFERENCES [dbo].[User](UserName)
);
CREATE TABLE [dbo].[Address] (
    UserName VARCHAR(20)  NOT NULL,
    AddressLine1 VARCHAR (MAX)  NOT NULL,
    AddressLine2 VARCHAR (30) NULL,
    AddressLine3 VARCHAR(30) NULL,
    City VARCHAR(50) NOT NULL,
    Region VARCHAR(40) NOT NULL,
    PostCode VARCHAR(10) NOT NULL
    CONSTRAINT FK_UserName_Address FOREIGN KEY (UserName) REFERENCES [dbo].[User](UserName)
);
-- Linking Tables 
CREATE TABLE [dbo].[UserQuotes] (
    UserUN VARCHAR (20)  NOT NULL,
    QuoteID INT  NOT NULL,
    CONSTRAINT FK_UserUN_UQ FOREIGN KEY (UserUN) REFERENCES [dbo].[User](UserName),
    CONSTRAINT FK_QuoteID_UQ FOREIGN KEY (QuoteID) REFERENCES [dbo].[Quote](QuoteID)
);
CREATE TABLE [dbo].[SupplierItems] (
    UserName VARCHAR (20)  NOT NULL,
    ItemID VARCHAR (15)  NOT NULL,
    CONSTRAINT FK_UserName_SI FOREIGN KEY (UserName) REFERENCES [dbo].[User](UserName),
    CONSTRAINT FK_ItemID_SI FOREIGN KEY (ItemID) REFERENCES [dbo].[Item](ItemID)
);
CREATE TABLE [dbo].[QuoteItems] (
    QuoteID INT NOT NULL,
    ItemID VARCHAR(15) NOT NULL,
    CONSTRAINT FK_QuoteID_QI FOREIGN KEY (QuoteID) REFERENCES [dbo].[Quote](QuoteID),
    CONSTRAINT FK_ItemID_QI FOREIGN KEY (ItemID) REFERENCES [dbo].[Item](ItemId)
);
-- Indexing of Foreign Keys
    -- Inheritance Tables
            -- Supplier
CREATE INDEX I_UserName_Supplier ON [dbo].[UserSupplier](UserName);
            -- Employee
CREATE INDEX I_UserName_Employee ON [dbo].[UserEmployee](UserName);
    -- Attribute Tables
            -- Payment Method
CREATE INDEX I_UserName_PM ON [dbo].[PaymentMethod](UserName);
            -- Address
CREATE INDEX I_UserName_AD ON [dbo].[Address](UserName);
    -- Linking Tables
            -- UserQuotes
CREATE INDEX I_UserUN_UQ ON [dbo].[UserQuotes](UserUN);
CREATE INDEX I_QuoteID_UQ ON [dbo].[UserQuotes](QuoteID);
            -- SupplierItems
CREATE INDEX I_UserName_SI ON [dbo].[SupplierItems](UserName);
CREATE INDEX I_ItemID_SI ON [dbo].[SupplierItems](ItemID);
            -- QuoteItems
CREATE INDEX I_QuoteID_QI ON [dbo].[QuoteItems](QuoteID);
CREATE INDEX I_ItemID_QI ON [dbo].[QuoteItems](ItemID);
