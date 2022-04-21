CREATE PROCEDURE [dbo].[sprGetUsername]
	@Username VARCHAR(20)
AS
	SELECT UserName
	FROM [User]
	WHERE UserName = @Username
RETURN
