CREATE VIEW [dbo].[CustomersView]
	AS SELECT  
	U.UserName AS UserName,
	U.FirstName AS FirstName,
	U.LastName AS LastName,
	U.Email AS Email,
	U.UserPassword AS UserPassword
	FROM [dbo].[User] AS U 
	WHERE U.AccountType LIKE 'U'
