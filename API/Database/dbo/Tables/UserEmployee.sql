CREATE TABLE [dbo].[UserEmployee] (
    UserName VARCHAR(20)  NOT NULL,
    Department VARCHAR (MAX)  NOT NULL,
    JobRole VARCHAR (MAX) NOT NULL,
    CONSTRAINT FK_UserName_Employee FOREIGN KEY (UserName) REFERENCES [dbo].[User](UserName)
);
GO
-- Employee
CREATE INDEX I_UserName_Employee ON [dbo].[UserEmployee](UserName);