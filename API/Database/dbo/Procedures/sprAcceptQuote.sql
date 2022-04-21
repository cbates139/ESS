CREATE PROCEDURE [dbo].[sprAcceptQuote]
	@quoteId INT
AS
	UPDATE Quote
	SET  
		QuoteStatus = 'ACCEPTED'

	WHERE QuoteID = @quoteId

RETURN
