CREATE VIEW [dbo].[AllUsersView]
	AS SELECT  
	U.UserName AS UserName,
	U.FirstName AS FirstName,
	U.LastName AS LastName,
	U.Email AS Email,
	U.UserPassword AS UserPassword,
	U.AccountType AS AccountType,
	E.Department AS Department,
	E.JobRole AS JobRole,
	S.CompanyName AS CompanyName,
	S.CompanyReg AS CompanyReg
	FROM [dbo].[User] AS U 
	LEFT JOIN [dbo].[UserSupplier] AS S
	ON U.UserName = S.UserName
	LEFT JOIN [dbo].[UserEmployee] AS E
	ON U.UserName = E.UserName