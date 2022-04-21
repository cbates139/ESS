CREATE TABLE [dbo].[Quote] (
    QuoteID INT  NOT NULL IDENTITY PRIMARY KEY,
    CreationDate DATETIME  NOT NULL,
    PreferredDate DATETIME NOT NULL,
    QuoteDescription VARCHAR (MAX) NULL,
    QuoteCost FLOAT NULL,
    QuoteStatus VARCHAR(20) NOT NULL
);