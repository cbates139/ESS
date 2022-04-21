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
GO
-- Address
CREATE INDEX I_UserName_AD ON [dbo].[Address](UserName);