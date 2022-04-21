-- Linking Tables 
CREATE TABLE [dbo].[UserQuotes] (
    UserUN VARCHAR (20)  NOT NULL,
    QuoteID INT  NOT NULL,
    CONSTRAINT FK_UserUN_UQ FOREIGN KEY (UserUN) REFERENCES [dbo].[User](UserName),
    CONSTRAINT FK_QuoteID_UQ FOREIGN KEY (QuoteID) REFERENCES [dbo].[Quote](QuoteID)
);
GO
-- Linking Tables
            -- UserQuotes
CREATE INDEX I_UserUN_UQ ON [dbo].[UserQuotes](UserUN);
GO
CREATE INDEX I_QuoteID_UQ ON [dbo].[UserQuotes](QuoteID);