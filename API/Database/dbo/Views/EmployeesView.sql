CREATE VIEW [dbo].[EmployeesView]
	AS SELECT  
	U.UserName AS UserName,
	U.FirstName AS FirstName,
	U.LastName AS LastName,
	U.Email AS Email,
	U.UserPassword AS UserPassword,
	E.Department AS Department,
	E.JobRole AS JobRole
	FROM [dbo].[User] AS U 
	INNER JOIN [dbo].[UserEmployee] AS E
	ON U.UserName = E.UserName
