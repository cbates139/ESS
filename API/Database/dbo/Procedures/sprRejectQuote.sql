CREATE PROCEDURE [dbo].[sprRejectQuote]
	@quoteId INT
AS

	DELETE FROM [QuoteItems]
	WHERE QuoteID = @quoteId

	DELETE FROM [UserQuotes]
	WHERE QuoteID = @quoteId

	DELETE FROM [Quote]
	WHERE QuoteID = @quoteId

	
RETURN
