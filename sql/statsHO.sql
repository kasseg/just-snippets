/****** Script for SelectTopNRows command from SSMS  ******/
SELECT i.[Id],l.Code,i.InvoiceMetroId,ais.[user],ais.FinishDate, cc.DescriptionRu, ct.DescriptionRu,c.SapNumber,c.NameRu,c.Inn
  FROM [METROCC.RU.EDOCS.DB].[dbo].[Invoice] i
  join [METROCC.RU.EDOCS.DB].[dbo].ContractClass cc on i.ContractClassId=cc.Id
  join [METROCC.RU.EDOCS.DB].[dbo].ContractType ct on i.ContractTypeId=ct.Id
  join [K2prd].[ServerLog].[ActInstSlot] ais on ais.ProcInstID=i.ProcId
  join [METROCC.RU.EDOCS.DB].[dbo].Counterparty c on c.Id=i.CounterpartyId
  join [METROCC.RU.EDOCS.DB].[dbo].Location l on l.id=i.LocationId
  where ais.FinishDate >= '2018-03-01 00:00:00.000'
  and ais.FinalAction like 'Documents Received'
--  and i.LocationId in (69,70,71,72,83,84)
