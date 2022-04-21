CREATE PROCEDURE [dbo].[sprInsertQuote]
	@quoteID INT,
	@quoteDesc VARCHAR(MAX),
	@quoteCost FLOAT
AS
	UPDATE Quote 
	SET 
		QuoteDescription = @quoteDesc, 
		QuoteCost = @quoteCost, 
		QuoteStatus = 'PROCESSED'
	WHERE QuoteID = @quoteID
RETURN
