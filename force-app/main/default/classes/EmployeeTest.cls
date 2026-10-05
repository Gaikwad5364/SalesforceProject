@IsTest
private class EmployeeTest {

    @IsTest
    static void testCreateEmployee() {
        Employee__c employee = new Employee__c(
            Name = 'Test Employee'
        );

        insert employee;

        Employee__c result = [
            SELECT Id, Name
            FROM Employee__c
            WHERE Id = :employee.Id
        ];

        System.assertEquals('Test Employee', result.Name);
    }
}