CREATE PROCEDURE [dbo].[sprGetUserQuotes]
	@username VARCHAR(20)
AS
-- If the data returned isnt right change the INNER JOINS to LEFT JOIN
	SELECT * FROM [Quote] AS Q
	INNER JOIN [UserQuotes] AS UQ
	ON Q.QuoteID = UQ.QuoteID
	INNER JOIN [User] AS U
	ON UQ.UserUN = U.UserName
	WHERE U.UserName = @username
RETURN
