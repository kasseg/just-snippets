/****** Script for SelectTopNRows command from SSMS  ******/
SELECT i.[Id] as 'Invoice ID',
      f.UserDisplayName as 'Approver group',
	  ais.[User] as 'Approver name',
	  ais.FinalAction as 'Action',
	  ais.FinishDate as 'Action date',
	  s.DescriptionRu as 'Current Invoice Status',
	  ct.DescriptionRu as 'Contract type',
	  i.InvoiceMetroId as 'FOLIO :)',
	  i.IsPrincipal as N'Закрывающий = 0',
	  i.PaymentInvoice as N'Предоплатный = 1'
  FROM [METROCC.RU.EDOCS.DB].[dbo].[Invoice] i
  join [METROCC.RU.EDOCS.DB].[dbo].[Status] s on s.id=i.InvoiceStatusId
  join [METROCC.RU.EDOCS.DB].[dbo].ContractType ct on ct.Id=i.ContractTypeId
  join [K2prd].[ServerLog].[ActInstSlot] ais on ais.ProcInstID=i.ProcId
  CROSS APPLY (select * from [METROCC.RU.EDOCS.DB].dbo.Func_GetInvoiceApproversView (i.id)
	 where UserName like '%ExpensesAccount%') f
	 where (ais.[User] = 'R4\OLGA.ROMANYUK' or
ais.[User] = 'R4\DARYA.SHPUY' or
ais.[User] = 'R4\ALINA.CHIRKOVA' or
ais.[User] = 'R4\OKSANA.SILANTEVA' or
ais.[User] = 'R4\MARIYA.ANTONOVA' or
ais.[User] = 'R4\YULIYA.GRECHKINA' or
ais.[User] = 'R4\TATYANA.KOZLOVA' or
ais.[User] = 'R4\YULIYA.YANKOVA01' or
ais.[User] = 'R4\NATALYA.POKOTILO' or
ais.[User] = 'R4\LILIYA.DEMCHENKO' or
ais.[User] = 'R4\ekaterina.bazanova' or
ais.[User] = 'R4\lyubov.makhno' or
ais.[User] = 'R4\dusaeva.bibigul' or
ais.[User] = 'R4\elena.polukarova' or
ais.[User] = 'R4\EKATERINA.BELIKOVA01' or
ais.[User] = 'R4\elena.klimashina' or
ais.[User] = 'R4\svetlana.godunova')
	 and ais.FinishDate > '2018-08-01 00:00:00.000' and ais.FinishDate < '2018-09-01 00:00:00.000'
	 




