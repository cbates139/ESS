CREATE PROCEDURE [dbo].[sprInsertUser]
	@Username VARCHAR(20),
	@FirstName VARCHAR(20),
	@LastName VARCHAR(20),
	@Email VARCHAR(20),
	@Password VARCHAR(20),
	@AddressLine1 VARCHAR(MAX),
	@AddressLine2 VARCHAR(30),
	@AddressLine3 VARCHAR(30),
	@City VARCHAR(50),
	@Region VARCHAR(40),
	@PostCode VARCHAR(10)
AS
	BEGIN

        INSERT INTO [User] (UserName, FirstName, LastName, Email, UserPassword, AccountType)
		VALUES (@Username, @FirstName, @LastName, @Email, CONVERT(VARCHAR(20), HASHBYTES('SHA1', @Password), 1), 'U')
        



	INSERT INTO [Address] (UserName, AddressLine1, AddressLine2, AddressLine3, City, Region, PostCode)
	VALUES (@Username, @AddressLine1, @AddressLine2, @AddressLine3, @City, @Region, @PostCode)
END
RETURN
