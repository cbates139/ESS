CREATE PROCEDURE [dbo].[sprGetSupplierItems]
	@username VARCHAR(20)
AS
-- If the data returned isnt right change the INNER JOINS to LEFT JOIN
	SELECT * FROM [Item] AS I
	INNER JOIN [SupplierItems] AS SI
	ON I.ItemID = SI.ItemID
	INNER JOIN [User] AS U
	ON SI.UserName = U.UserName
	WHERE U.UserName = @username
RETURN
