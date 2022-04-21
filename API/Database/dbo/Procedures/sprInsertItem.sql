CREATE PROCEDURE [dbo].[sprInsertItem]
	@itemID VARCHAR(20),
	@itemName VARCHAR(MAX),
	@itemDescription VARCHAR(MAX),
	@itemURL VARCHAR(MAX),
	@itemCost FLOAT,
	@username VARCHAR (20)
AS

	INSERT INTO [Item] (ItemID, ItemName, ItemDescription, ItemImageURL, ItemCost)
	VALUES (@itemID, @itemName, @itemDescription, @itemURL, @itemCost)
	--May need a GO separator here 
	INSERT INTO [SupplierItems] (UserName, ItemID)
	VALUES (@username, @itemID)
RETURN
