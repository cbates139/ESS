CREATE VIEW [dbo].[SuppliersView]
	AS SELECT  
	U.UserName AS UserName,
	U.FirstName AS FirstName,
	U.LastName AS LastName,
	U.Email AS Email,
	U.UserPassword AS UserPassword,
	S.CompanyName AS CompanyName,
	S.CompanyReg AS CompanyReg
	FROM [dbo].[User] AS U 
	INNER JOIN [dbo].[UserSupplier] AS S
	ON U.UserName = S.UserName
