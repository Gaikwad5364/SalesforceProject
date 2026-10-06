@IsTest
private class PipelineDemoTest {

    @IsTest
    static void testGetMessage() {
        String result = PipelineDemo.getMessage();

        System.assertEquals(
            'Salesforce CI/CD Pipeline is working!',
            result
        );
    }
}