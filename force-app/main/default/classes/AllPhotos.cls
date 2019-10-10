public with sharing class AllPhotos {
    
    @AuraEnabled(cacheable=true)
    public static List<Photo__c> getAllPhotos() {
        List<Photo__c> photos = [SELECT Id, Name, Location__Latitude__s, Location__Longitude__s,CountryTip__c FROM Photo__c];
        return photos; 
    }

}
