CREATE VIEW [dbo].[SuppliersItemsView]
	AS SELECT  
	U.UserName AS UserName,
	U.FirstName AS FirstName,
	U.LastName AS LastName,
	S.CompanyName AS CompanyName,
	S.CompanyReg AS CompanyReg,
	I.ItemName AS ItemName,
	I.ItemDescription AS ItemDescription,
	I.ItemCost AS ItemCost

	FROM [dbo].[User] AS U 
	INNER JOIN SupplierItems AS SI
	ON U.UserName = SI.UserName
	INNER JOIN Item I
	ON SI.ItemID = I.ItemID
	INNER JOIN UserSupplier S
	ON U.UserName = S.UserName