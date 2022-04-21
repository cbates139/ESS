CREATE VIEW [dbo].[ProcessedUsersQuotesView]
	AS SELECT  
	U.UserName AS UserName,
	U.FirstName AS FirstName,
	U.LastName AS LastName,
	Q.QuoteDescription AS QuoteDescription,
	Q.QuoteCost AS QuoteCost,
	Q.CreationDate AS CreationDate,
	Q.PreferredDate AS PreferredDate,
	Q.QuoteStatus AS QuoteStatus

	FROM [dbo].[User] AS U 
	INNER JOIN [dbo].[UserQuotes] AS UQ
	ON U.UserName = UQ.UserUN
	INNER JOIN [dbo].[Quote] AS Q
	ON UQ.QuoteID = Q.QuoteID
	WHERE Q.QuoteStatus LIKE 'PROCESSED'
