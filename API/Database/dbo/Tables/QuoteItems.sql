CREATE TABLE [dbo].[QuoteItems] (
    QuoteID INT NOT NULL,
    ItemID VARCHAR(15) NOT NULL,
    CONSTRAINT FK_QuoteID_QI FOREIGN KEY (QuoteID) REFERENCES [dbo].[Quote](QuoteID),
    CONSTRAINT FK_ItemID_QI FOREIGN KEY (ItemID) REFERENCES [dbo].[Item](ItemID)
);
GO
-- QuoteItems
CREATE INDEX I_QuoteID_QI ON [dbo].[QuoteItems](QuoteID);
GO
CREATE INDEX I_ItemID_QI ON [dbo].[QuoteItems](ItemID);