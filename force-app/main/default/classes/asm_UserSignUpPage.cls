public class asm_UserSignUpPage {
    public asm_UserSignUpPage() {}

    @AuraEnabled
    public static void createNewRecord(lwc__c record){
        System.debug('New record : '+record);
        insert record;
    }
    @AuraEnabled(cacheable=true)
    public static List<lwc__c> getUserRecord(String email, String password){
        System.debug('Email : '+email);
        system.debug('Password : '+password);
        List<lwc__c> querylwc = [SELECT id, name, email__c FROM lwc__c WHERE email__c = :email AND password__c = :password];
        if(querylwc.isEmpty()){
            querylwc = null;
        }
        return querylwc;

    }
    
}
