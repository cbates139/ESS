CREATE PROCEDURE [dbo].[sprDeleteItem]
	@itemID VARCHAR(20)
AS
	DELETE FROM [Item]
	WHERE ItemID = @itemID

	DELETE FROM [SupplierItems]
	WHERE ItemID = @itemID

RETURN
