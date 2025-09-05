/**
* @File Name : TenantRequestFieldService.cls
* @Description :
* @Author :
* @Last Modified By :
* @Last Modified On : July 20, 2025
* @Modification Log :
*==============================================================================
* Ver | Date | Author | Modification
*==============================================================================
* 1.0 | July  2025 |   | Initial Version
**/

public class TenantRequestFieldService {

	
	@AuraEnabled(cacheable=true)
	public static list<String> getTenantSettingTypeLeft(){
		return new list<String>{
			'SettingType__c',
			'ModifyingTenant__c',
			'DetailedOrder__c',
			'ChangeDetails_Product__c',
			'Status__c'
		};
	}

	@AuraEnabled(cacheable=true)
	public static List<String> getTenantBasicInfoLeft(){
		return new list<String>{
			'Name',
			'Account_Tenant__c',
			'Account_TenantContract__c',
			'LXCode__c',
			'Contact__c',
			'Sub_Contact__c',
			'Adv_product__c'
		};
	}

	@AuraEnabled(cacheable=true)
	public static List<String> getTenantBasicInfoRight(){
		return new list<String>{
			'OwnerId',
			'EnglishName__c',
			'TenantContractorId_formula__c',
			'LXCode__c',
			'Domain__c'
		};

	}

	/* Below is retireval of fields for each Tenant product  */
	/* Helper method */
	@AuraEnabled(cacheable=true)
	public static List<Map<String, Object>> getTenantSections(){

		List<Map<String, Object>> results = new List<Map<String, Object>>();

		//Query Product Sections
		List<TenantRequestSections__mdt> sections = [SELECT DeveloperName, Label__c, SortOrder__c  FROM TenantRequestSections__mdt ORDER BY SortOrder__c];

		//Query fields with Product Sction
		List<TenantRequestFields__mdt> fields = [SELECT DeveloperName,FieldName__c, ProductSection__r.DeveloperName, Column__c, SortOrder__c FROM TenantRequestFields__mdt ORDER BY SortOrder__c];

		//Grout fields by Product Section
		Map<String, List<TenantRequestFields__mdt>> fieldsGroupMap = new Map<String, List<TenantRequestFields__mdt>>();
		for(TenantRequestFields__mdt f : fields){
			//define section name key to map
			String sectionKey = f.ProductSection__r.DeveloperName;
			System.debug('f.ProductSection__r.DeveloperName: ' + f.ProductSection__r.DeveloperName);

			//if section key name does not exists in the Map, add it 
			if(!fieldsGroupMap.containsKey(sectionKey)){
				fieldsGroupMap.put(sectionKey, new List<TenantRequestFields__mdt>());
			}
			//add List<TenantRequestFields__mdt> as value of Map
			fieldsGroupMap.get(sectionKey).add(f);

		}

		// Get schema describe map once
    	Map<String, Schema.SObjectField> allExistFields = Schema.SObjectType.TenantRequest__c.fields.getMap();


		//Create JSON object
		for(TenantRequestSections__mdt sec : sections){

			Map<String, Object> sectionMap = new Map<String, Object>();
			sectionMap.put('sectionDeveloperName', sec.DeveloperName);
			sectionMap.put('sectionOrder', sec.SortOrder__c);
			sectionMap.put('label', sec.Label__c);

			//List to assign fields on right, left side
			List<Object> leftFields = new List<Object>();
			List<Object> rightFields = new List<Object>();

			//check actual existing fields data to get datatype, option values
			if(fieldsGroupMap.containsKey(sec.DeveloperName)){
				System.debug('sec.DeveloperName): ' + sec.DeveloperName);

				for(TenantRequestFields__mdt f : fieldsGroupMap.get(sec.DeveloperName)){
					//check if fields API name exists in query fields from TenantRequest__c object
					if(allExistFields.containsKey(f.FieldName__c)){
						//Get field describe(details) with Schema.DescribeResult
					    Schema.DescribeFieldResult describe = allExistFields.get(f.FieldName__c).getDescribe();

						Map<String, Object> fieldNMap;

						//check if the field is formula
						if(describe.isCalculated() && !describe.isUpdateable() ){
							fieldNMap = new Map<String, Object>{'apiName' => f.fieldName__c, 'label' => describe.getLabel(), 'type' => enumToDataType(describe.getType()), 'isCheckboxField' => enumToDataType(describe.getType()) == 'checkbox', 'isPicklistField' => enumToDataType(describe.getType()) == 'picklist', 'options' => null,'isFormulaField' => true};
						}else{ 
						//other than formula		
							/* checkbox */
							if(enumToDataType(describe.getType()) == 'checkbox'){
								fieldNMap = new Map<String, Object>{'apiName' => f.fieldName__c, 'label' => describe.getLabel(), 'type' => enumToDataType(describe.getType()), 'isCheckboxField' => true, 'isPicklistField' => false, 'options' => null,'isFormulaField' => false};
							}else if(enumToDataType(describe.getType()) == 'picklist'){
							/* picklist */
								/* List<Schema.PicklistEntry> P = describe.getPicklistValues(); */
								//store option values in List
								List<Map<String, String>> options = new List<Map<String, String>>();
								for(Schema.PicklistEntry entry : describe.getPicklistValues()){
									options.add(new Map<String, String>{'label' => entry.getLabel(), 'value' => entry.getValue()});
								}
								fieldNMap = new Map<String, Object>{'apiName' => f.fieldName__c, 'label' => describe.getLabel(), 'type' => enumToDataType(describe.getType()), 'isCheckboxField' => false, 'isPicklistField' => true, 'options' => options,'isFormulaField' => false};
								
							}else{
								/* others */
								fieldNMap = new Map<String, Object>{'apiName' => f.fieldName__c, 'label' => describe.getLabel(), 'type' => enumToDataType(describe.getType()), 'isCheckboxField' => false, 'isPicklistField' => false, 'options' => null,'isFormulaField' => false};
							}
						}
						//assign left or right side of section
						if(f.Column__c == 'Left'){
							leftFields.add(fieldNMap);
						}else if(f.Column__c == 'Right'){
							rightFields.add(fieldNMap);
						} 
					}
					
			
					
				}
			}

			sectionMap.put('fieldsLeft', leftFields);
			sectionMap.put('fieldsRight', rightFields);

			results.add(sectionMap);
		}

		return results;
	}



	/* Helper method to convert enum to data type */
	private static String enumToDataType(Schema.DisplayType dt) {
    switch on dt {
        when String       { return 'text'; }
        when TextArea     { return 'text'; }
        when Email        { return 'email'; }
        when Phone        { return 'tel'; }
        when Url          { return 'url'; }
        when Double       { return 'number'; }
        when Currency     { return 'number'; }
        when Integer      { return 'number'; }
        when Date         { return 'date'; }
        when DateTime     { return 'datetime-local'; }
        when Boolean      { return 'checkbox'; }
        when Picklist     { return 'picklist'; } // you’ll handle separately
        when Reference    { return 'lookup'; }  // usually needs a custom UI
        when else         { return 'text'; }    // default fallback
    }
}




}
