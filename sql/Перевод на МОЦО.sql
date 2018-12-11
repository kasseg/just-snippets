/****** Script for SelectTopNRows command from SSMS  ******/
SELECT *
  FROM [METROCC.RU.EDOCS.DB].[dbo].[InvoiceApprover]

  where invoiceid in (404965)
  -----------------------------------------
DECLARE @InvoiceId int

DECLARE MY_CURSOR CURSOR 
  LOCAL STATIC READ_ONLY FORWARD_ONLY
FOR 
SELECT DISTINCT invoiceid 
FROM [METROCC.RU.EDOCS.DB].[dbo].[InvoiceApprover]
where invoiceid in (409442,409516,409613,410060,410070,410134,410726)
OPEN MY_CURSOR
FETCH NEXT FROM MY_CURSOR INTO @InvoiceId
WHILE @@FETCH_STATUS = 0
BEGIN 
    --Do something with Id here
	update [InvoiceApprover]
	set [ApproverName] = f.UserName
	,[ApproverDisplayName] = f.[UserDisplayName] 
	,[ActivityName] = f.[ActivityName]

	 -- select [ApproverName] , f.UserName, [ApproverDisplayName], f.[UserDisplayName] , i.[ActivityName] , f.[ActivityName]
	--from [InvoiceApprover] i, 
	 from ( select * from Func_GetInvoiceApproversView (@InvoiceId)
	  where UserName like '%ExpensesAccount%') f
	where [InvoiceId] = @InvoiceId and approverName = 'Store Accountant'

	  select * from [InvoiceApprover]
	  where [InvoiceId] = @InvoiceId
    --PRINT @InvoiceId
    FETCH NEXT FROM MY_CURSOR INTO @InvoiceId
END
CLOSE MY_CURSOR
DEALLOCATE MY_CURSOR