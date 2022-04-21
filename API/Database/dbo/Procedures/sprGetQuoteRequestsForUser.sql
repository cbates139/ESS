CREATE PROCEDURE [dbo].[sprGetQuoteRequestsForUser]
	@username VARCHAR(20)
AS
	SELECT
		Q.QuoteID AS Id,
		QI.ItemID AS ItemId,
		UQ.UserUN AS Username,
		Q.QuoteStatus AS [Status],
		A.AddressLine1 AS AddressLine1,
		A.AddressLine2 AS AddressLine2,
		A.AddressLine3 AS AddressLine3,
		A.City AS City,
		A.Region AS Region,
		A.PostCode AS PostCode
	From Quote Q
	INNER JOIN QuoteItems QI ON Q.QuoteID = QI.QuoteID
	INNER JOIN UserQuotes UQ ON Q.QuoteID = UQ.QuoteID
	INNER JOIN [dbo].[User] U ON UQ.UserUN = U.UserName
	INNER JOIN [dbo].[Address] A ON U.UserName = A.UserName
	WHERE UQ.UserUN = @username
RETURN
