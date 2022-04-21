-- User Attribute Tables
CREATE TABLE [dbo].[PaymentMethod] (
    UserName VARCHAR(20)  NOT NULL,
    AccountNumber INT  NOT NULL,
    SortCode INT NOT NULL,
    Reference VARCHAR(30) NOT NULL
    CONSTRAINT FK_UserName_PaymentMethod FOREIGN KEY (UserName) REFERENCES [dbo].[User](UserName)
);
GO
-- Attribute Tables
            -- Payment Method
CREATE INDEX I_UserName_PM ON [dbo].[PaymentMethod](UserName);