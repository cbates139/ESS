CREATE VIEW [dbo].[PaymentMethodsView]
	AS SELECT 
	U.UserName AS UserName,
	U.FirstName AS FirstName,
	U.LastName AS LastName,
	U.Email AS Email,
	P.AccountNumber AS AccountNumber,
	P.SortCode AS SortCode
	
	FROM [dbo].[User] AS U
	INNER JOIN [dbo].[PaymentMethod] AS P
	ON U.UserName = P.UserName
