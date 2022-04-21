CREATE VIEW [dbo].[UsersAddressView]
	AS SELECT 
	U.UserName AS UserName,
	U.FirstName AS FirstName,
	U.LastName AS LastName,
	U.Email AS Email,
	A.AddressLine1 AS AddressLine1,
	A.AddressLine2 AS AddressLine2,
	A.AddressLine3 AS AddressLine3,
	A.City AS City,
	A.PostCode AS PostCode,
	A.Region AS Region
	FROM [dbo].[User] AS U
	INNER JOIN [dbo].[Address] AS A
	ON U.UserName = A.UserName