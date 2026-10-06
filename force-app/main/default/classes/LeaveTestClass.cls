@IsTest
public class LeaveTestClass {

    @IsTest
    static void testCreateLeave() {

        // Create Leave record
        Leave__c leaveRecord = new Leave__c(
            Name = 'Leave-001',
            EmployeeID__c = 'EMP001',
            LeaveDate__c = Date.today()
        );

        Test.startTest();
        insert leaveRecord;
        Test.stopTest();

        // Query the inserted record
        Leave__c createdLeave = [
            SELECT Id, Name, EmployeeID__c, LeaveDate__c
            FROM Leave__c
            WHERE Id = :leaveRecord.Id
        ];

        // Verify the data
        System.assertNotEquals(null, createdLeave.Id);
        System.assertEquals('Leave-001', createdLeave.Name);
        System.assertEquals('EMP001', createdLeave.EmployeeID__c);
        System.assertEquals(Date.today(), createdLeave.LeaveDate__c);
    }
}