CREATE PROCEDURE [dbo].[sprGetEmail]
	@Email VARCHAR(20)
AS
	SELECT UserName
	FROM [User]
	WHERE Email = @Email
RETURN
