use [METROCC.RU.EDOCS.DB]
go

declare @oldUser varchar(100) = 'R4\evgeniya.krylova'
declare @newUserName varchar(100) = 'R4\olga.kurysheva01'
declare @newUserDisplay varchar(100) = (select UserDisplayName from ConfigUser where UserName = @newUserName)
declare @newUserConfig varchar(100) = (select Id from ConfigUser where UserName = @newUserName)

begin tran

update Invoice
set
	ResponsiblePersonName = @newUserName
where
	ResponsiblePersonName = @oldUser

rollback
commit
go--update Invoice table

declare @oldUser varchar(100) = 'R4\evgeniya.krylova'
declare @newUserName varchar(100) = 'R4\olga.kurysheva01'
declare @newUserDisplay varchar(100) = (select UserDisplayName from ConfigUser where UserName = @newUserName)
declare @newUserConfig varchar(100) = (select Id from ConfigUser where UserName = @newUserName)

begin tran

update Contract
set
	ResponsibleName = @newUserName
	,ResponsibleDisplayName = @newUserDisplay
	,ResponsibleConfigUserId = @newUserConfig
where
	ResponsibleName = @oldUser

rollback
commit
go--update Contract table
