CREATE VIEW [dbo].[UsersProcessedQuoteItemsView]
	AS SELECT  
	U.UserName AS UserName,
	U.FirstName AS FirstName,
	U.LastName AS LastName,
	Q.QuoteID AS QuoteID,
	Q.QuoteDescription AS QuoteDescription,
	Q.QuoteCost AS QuoteCost,
	Q.CreationDate AS CreationDate,
	Q.PreferredDate AS PreferredDate,
	Q.QuoteStatus AS QuoteStatus,
	I.ItemName AS ItemName,
	I.ItemDescription AS ItemDescription,
	I.ItemCost AS ItemCost

	FROM [dbo].[User] AS U 
	INNER JOIN [dbo].[UserQuotes] AS UQ
	ON U.UserName = UQ.UserUN
	INNER JOIN [dbo].[Quote] AS Q
	ON UQ.QuoteID = Q.QuoteID
	INNER JOIN [dbo].[QuoteItems] AS QI
	ON Q.QuoteID = QI.QuoteID
	INNER JOIN [dbo].[Item] AS I
	ON QI.ItemID = I.ItemID
	WHERE Q.QuoteStatus LIKE 'PROCESSED'