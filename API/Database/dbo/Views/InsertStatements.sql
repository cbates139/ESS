USE [Database]
GO
-- User Table Insert
INSERT INTO  [dbo].[User] ([UserName], [FirstName], [LastName], [Email], [UserPassword], [AccountType])
VALUES ('jsmith248', 'John', 'Smith', 'jsmith248@gmail.com', 'Password1', 'U'),
('ldavies043', 'Lisa', 'Davies', 'ldavies043@gmail.com', 'Password2', 'U'),
('ashaw639', 'Aaron', 'Shaw', 'ashaw639@gmail.com', 'Password3', 'E'),
('djones517', 'Drew', 'Jones', 'djones517', 'Password4', 'S')
GO
-- Item Table Insert
INSERT INTO  [dbo].[Item] ([ItemID], [ItemName], [ItemDescription], [ItemImageURL], [ItemCost])
VALUES ('ITM001', 
'Worcester Greenstar 30i 30kW Combi Boiler 7733600005 - 968497',
'The Worcester Greenstar 30i is a 30kW combi boiler that builds on the popular features of the market-leading Greenstar i Junior, while introducing a host of improvements. The Greenstar features enhanced performance and energy efficiency, increased flow rates and a user friendly control panel and is easy to install and maintain. The high efficiency WB3 heat exchanger and low energy modulating pump ensure that the Greenstar i uses less energy and complies with the ErP Directive. With a full 5 year guarantee on parts and labour, it is an ideal choice.',
'https://dam.cityplumbing.co.uk/wmd8j/GPID_1000736912_IMG_00.jpeg',
'1092'),

('ITM002', 
'Worcester Greenstar 8000 Style 30kW Combination Boiler Black Natural Gas - 7738100832',
'Introducing the Worcester 8000 Style Combi range with a fantastic new design, greater connectivity with the Comfort II controls. Worcester have also made the Style range one of their quietest boilers to date. So it can sit comfortably in any room of your home to keep you cosy in the cold winter months. For complete peace of mind, you can also receive up to a 10 year guarantee* on the Style range.',
'https://cdn.plumbnation.co.uk/site/worcester-greenstar-8000-style-30kw-combination-boiler-black-natural-gas/large-style-black-side.png',
'1269.98'),

('ITM003',
'Vaillant ecoFIT Pure 825 Gas Combi Boiler',
'Ultra-quiet operation, small footprint and total flexibility of siting (with top and rear flue options). The automatic purging assistance and high specification aluminium heat exchanger, makes for a lightweight installation. High quality and high efficiency, together with the complete availability of spare parts, mean the ecoFIT Pure is easy to maintain. Built-in, 2-stage frost protection ensuring optimal performance all-year round.',
'https://media.screwfix.com/is/image//ae235?src=ae235/344KK_P&$prodImageLarge$',
'1059.99'),

('ITM004',
'Vaillant ecoTEC Plus 838 Combination Boiler Natural Gas ErP - 0010021826',
'The Vaillant ecoTEC plus range of high efficiency boilers combine fantastic efficiency levels and high performance with great usability. Thanks to continuous modulation and real combustion control by a multi-sensor system, they achieve high efficiency at the lowest emissions.',
'https://cdn.plumbnation.co.uk/site/vaillant-ecotec-plus-838-combination-boiler-natural-gas-erp/large-vaillant-plus-1.JPG',
'1462.79'),

('ITM005',
'Baxi 630 Gas Combi Boiler',
'Compact boiler that fits into a 290mm deep cupboard. Features built-in pipes behind facility within the boiler casing and brass hydraulics. Centre flue for easy replacement of older boilers. Compatible with the Baxi uSense smart thermostat.',
'https://media.screwfix.com/is/image//ae235?src=ae235/672CF_P&$prodImageLarge$',
'884.99'),

('ITM006',
'Worcester Greenstar 2000 25kW Boiler 7736902099 - 479583',
'The Greenstart 2000 Series Is Worcester Bosch’s Most Price Competitive Combi Boiler, Suitable For Apartments, Small And Medium Sized Homes With One Bathroom. Designed To Be Accessible For All, The Greenstar 2000 Offers Every Home Greater Choice And The Opportunity To Have A Market Leading, Reliable Worcester Bosch Boiler.',
'https://dam.cityplumbing.co.uk/bmjDB/GPID_1100653424_IMG_00.jpeg',
'718')
GO
-- Quote Table Insert 
-- When status is pending user has requested the quote, the cost should be blank until the status is changed to Processed by the employee/supplier and the labour or delivery is then calculated
--A third status of 'PROCESSING' could also be used 
INSERT INTO  [dbo].[Quote] ([CreationDate], [PreferredDate], [QuoteDescription], [QuoteCost], [QuoteStatus])
VALUES ('2021-02-20 12:00:00', '2021-03-01 12:00:00', 'nwith installation', '', 'PENDING'),
('2021-02-18 12:00:00', '2021-03-10 12:00:00', 'no installation', '1000', 'PROCESSED')
GO
	-- UserSupplier Table Insert
INSERT INTO [dbo].[UserSupplier] ([UserName], [CompanyName], [CompanyReg])
VALUES ('djones517', 'Energy Supplier LTD', '01234567')
GO
	-- UserEmployee Table Insert 
INSERT INTO [dbo].[UserEmployee] ([UserName], [Department], [JobRole])
VALUES ('ashaw639', 'Sales', 'Sales Supervisor')
GO
			-- PaymentMethod Table Insert
INSERT INTO  [dbo].[PaymentMethod] ([UserName], [AccountNumber], [SortCode], [Reference])
VALUES ('jsmith248', '87654321', '010203', 'Energy Purchase'),
('ldavies043', '43218765', '020301', 'Energy Purchase'),
('djones517', '65432187', '302010', 'Supplies Sell')
GO
			-- Address Table Insert
INSERT INTO  [dbo].[Address] ([UserName], [AddressLine1], [AddressLine2], [AddressLine3], [City], [Region], [PostCode])
VALUES ('jsmith248', '92 New Road', '', '', 'Croydon', 'South London', 'CR40 0ZH'),
('ldavies043', '18 The Green', '', '', 'Motherwell', 'Strathclyde', 'ML92 3UT'),
('djones517', '28 Highfield Road', '', '', 'Glasgow', 'Lanarkshire', 'G6 1EH')
GO
	-- UserQuotes Table Insert
INSERT INTO  [dbo].[UserQuotes] ([UserUN], [QuoteID])
VALUES ('jsmith248', '1'),
('ldavies043', '2')

GO
	-- SupplierItems
INSERT INTO  [dbo].[SupplierItems] ([UserName], [ItemID])
VALUES ('djones517', 'ITM001'),
('djones517', 'ITM002'),
('djones517', 'ITM003'),
('djones517', 'ITM004'),
('djones517', 'ITM005'),
('djones517', 'ITM006')
GO
	-- QuoteItems 
INSERT INTO  [dbo].[QuoteItems] ([QuoteID], [ItemID])
VALUES ('1', 'ITM004'),
('2', 'ITM006')