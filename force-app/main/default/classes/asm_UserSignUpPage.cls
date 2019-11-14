public class asm_UserSignUpPage {
    public asm_UserSignUpPage() {}

    @AuraEnabled
    public static void createNewRecord(lwc__c record){
        System.debug('New record : '+record);
        insert record;
    }
}
