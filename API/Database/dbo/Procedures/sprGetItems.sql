CREATE PROCEDURE [dbo].[sprGetItems]
AS
	SELECT
		I.ItemID AS Id,
		I.ItemName AS [Name],
		I.ItemImageURL AS ImageURL,
		I.ItemDescription AS [Description],
		US.CompanyName AS SupplierName
	FROM Item I
	INNER JOIN SupplierItems SI ON I.ItemID = SI.ItemID
	INNER JOIN UserSupplier US ON SI.UserName = US.UserName
RETURN
