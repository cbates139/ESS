CREATE PROCEDURE [dbo].[sprInsertQuoteRequest]
	@creationDate DATETIME,
	@preferredDate DATETIME,
	@userUN VARCHAR(20),
	@itemID VARCHAR(20)
AS
	INSERT INTO Quote (CreationDate, PreferredDate, QuoteStatus)
	VALUES (@creationDate, @preferredDate, 'PENDING')

	DECLARE @quoteID INT
	SELECT @quoteID = SCOPE_IDENTITY()

	INSERT INTO UserQuotes (UserUN, QuoteID)
	VALUES (@userUN, @quoteID)

	INSERT INTO QuoteItems (QuoteID, ItemID)
	VALUES (@quoteID, @itemID)

	SELECT @quoteID
RETURN
