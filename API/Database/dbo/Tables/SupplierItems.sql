CREATE TABLE [dbo].[SupplierItems] (
    UserName VARCHAR (20)  NOT NULL,
    ItemID VARCHAR (15)  NOT NULL,
    CONSTRAINT FK_UserName_SI FOREIGN KEY (UserName) REFERENCES [dbo].[User](UserName),
    CONSTRAINT FK_ItemID_SI FOREIGN KEY (ItemID) REFERENCES [dbo].[Item](ItemID)
);
GO
-- SupplierItems
CREATE INDEX I_UserName_SI ON [dbo].[SupplierItems](UserName);
GO
CREATE INDEX I_ItemID_SI ON [dbo].[SupplierItems](ItemID);