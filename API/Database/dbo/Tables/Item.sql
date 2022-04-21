CREATE TABLE [dbo].[Item] (
    ItemID VARCHAR (15)  NOT NULL PRIMARY KEY,
    ItemName VARCHAR (MAX)  NOT NULL,
    ItemDescription VARCHAR (MAX) NULL,
    ItemImageURL VARCHAR (MAX) NULL,
    ItemCost FLOAT NOT NULL
);