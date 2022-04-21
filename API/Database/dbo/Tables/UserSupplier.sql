-- Inherited Tables
CREATE TABLE [dbo].[UserSupplier] (
    UserName VARCHAR(20)  NOT NULL,
    CompanyName VARCHAR (MAX)  NOT NULL,
    CompanyReg VARCHAR (8) NOT NULL,
    CONSTRAINT FK_UserName_Supplier FOREIGN KEY (UserName) REFERENCES [dbo].[User](UserName)
);
GO
-- Indexing of Foreign Keys
    -- Inheritance Tables
            -- Supplier
CREATE INDEX I_UserName_Supplier ON [dbo].[UserSupplier](UserName);