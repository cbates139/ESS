CREATE PROCEDURE [dbo].[sprGetUser]
	@username VARCHAR(20),
	@password VARCHAR(20)
AS
	SELECT
		UserName,
		FirstName,
		LastName,
		Email,
		AccountType
	FROM [User]
	WHERE UserName = @username
	AND UserPassword = @password
RETURN
