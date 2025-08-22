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
	public static List<Map<String, Object>> getTenantSection(){

		List<Map<String, Object>> results = new List<Map<String, Object>>();

		//Query Product Sections
		List<TenantRequestSections__mdt> sections = [SELECT DeveloperName, Label__c, SortOrder__c  FROM TenantRequestSections__mdt ORDER BY SortOrder__c];

		//Query fields with Product Sction
		List<TenantRequestFields__mdt> fields = [SELECT DeveloperName,FieldName__c, ProductSection__r.DeveloperName, Column__c, SortOrder__c FROM TenantRequestFields__mdt ORDER BY ProductSection__r.SortOrder__c, SortOrder__c];

		//Grout fields by Product Section
		Map<String, List<TenantRequestFields__mdt>> fieldsGroupMap = new Map<String, List<TenantRequestFields__mdt>>();
		for(TenantRequestFields__mdt f : fields){
			//define section name key to map
			String sectionKey = f.ProductSection__r.DeveloperName;

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
			sectionMap.put('label', sec.Label__c);

			//List to assign fields on right, left side
			List<Object> leftFields = new List<Object>();
			List<Object> rightFields = new List<Object>();

			if(fieldsGroupMap.containsKey(sec.DeveloperName)){
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



	private static List<Map<String, Object>> getFieldsForSection(String section){
		//initialize list
		List<Map<String, Object>> result = new List<Map<String, Object>>();

		//check if fields exist and get the field reference with Schema.SObjectField
		Map<String, Schema.SObjectField> allFields = Schema.SObjectType.TenantRequest__c.fields.getMap();
		
		//retrieve meta data fields
		List<TenantRequestFields__mdt> fields = [SELECT FieldName__c FROM TenantRequestFields__mdt WHERE SectionName__c =:section ORDER BY SortOrder__c ASC];

		for(TenantRequestFields__mdt meta : fields){
			if(allFields.containsKey(meta.FieldName__c)){
				//Get field describe(details) with Schema.DescribeResult
				Schema.DescribeFieldResult describe = allFields.get(meta.FieldName__c).getDescribe();
				
				//check if the field is formula
				if(describe.isCalculated() && !describe.isUpdateable() ){
					result.add(new Map<String, Object>{'apiName' => meta.fieldName__c, 'label' => describe.getLabel(), 'type' => enumToDataType(describe.getType()), 'isCheckboxField' => enumToDataType(describe.getType()) == 'checkbox', 'isPicklistField' => enumToDataType(describe.getType()) == 'picklist', 'options' => null,'isFormulaField' => true});
				}else{ 
				//other than formula		
					/* checkbox */
					if(enumToDataType(describe.getType()) == 'checkbox'){
						result.add(new Map<String, Object>{'apiName' => meta.fieldName__c, 'label' => describe.getLabel(), 'type' => enumToDataType(describe.getType()), 'isCheckboxField' => true, 'isPicklistField' => false, 'options' => null,'isFormulaField' => false});
					}else if(enumToDataType(describe.getType()) == 'picklist'){
					/* picklist */
						/* List<Schema.PicklistEntry> P = describe.getPicklistValues(); */
						//store option values in List
						List<Map<String, String>> options = new List<Map<String, String>>();
						for(Schema.PicklistEntry entry : describe.getPicklistValues()){
							options.add(new Map<String, String>{'label' => entry.getLabel(), 'value' => entry.getValue()});
						}
						result.add(new Map<String, Object>{'apiName' => meta.fieldName__c, 'label' => describe.getLabel(), 'type' => enumToDataType(describe.getType()), 'isCheckboxField' => false, 'isPicklistField' => true, 'options' => options,'isFormulaField' => false});
						
					}else{
						/* others */
						result.add(new Map<String, Object>{'apiName' => meta.fieldName__c, 'label' => describe.getLabel(), 'type' => enumToDataType(describe.getType()), 'isCheckboxField' => false, 'isPicklistField' => false, 'options' => null,'isFormulaField' => false});
					}
				}
			}
		}

		return result;
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




	/* InvoiceLeft */
	@AuraEnabled(cacheable=true)
	public static List<Map<String, Object>> getTenantInvoiceLeft(){
		return getFieldsForSection('InvoiceLeft');
	}

	/* InvoiceRight */
	@AuraEnabled(cacheable=true)
	public static List<Map<String, Object>> getTenantInvoiceRight(){
		return getFieldsForSection('InvoiceRight');
		
	}

	/*  WFRight */
	 @AuraEnabled(cacheable=true)
	public static List<Map<String, Object>> getTenantWFRight(){
		return getFieldsForSection('WFRight');

	} 

	/*  WFLeft */
	@AuraEnabled(cacheable=true)
	public static List<Map<String, Object>> getTenantWFLeft(){
		return getFieldsForSection('WFLeft');
	}

	/* BoxLeft */
	@AuraEnabled(cacheable=true)
	public static List<Map<String, Object>> getTenantBoxLeft(){
		return getFieldsForSection('BoxLeft');
	}
	

	@AuraEnabled(cacheable=true)
	public static List<Map<String, Object>> getTenantBoxRight(){
		return getFieldsForSection('BoxRight');
	}

	/* Caed */
	@AuraEnabled(cacheable=true)
	public static List<Map<String, Object>> getTenantCardLeft(){
		return getFieldsForSection('CardLeft');
	}

	/* Docissue */
	@AuraEnabled(cacheable=true)
	public static List<Map<String, Object>> getTenantDocissueLeft(){
		return getFieldsForSection('DocissueLeft');
	}

	@AuraEnabled(cacheable=true)
	public static List<Map<String, Object>> getTenantDocissueRight(){
		return getFieldsForSection('DocissueRight');
	}

	/* API */
	@AuraEnabled(cacheable=true)
	public static List<Map<String, Object>> getTenantAPILeft(){
		return getFieldsForSection('APILeft');
	}


	@AuraEnabled(cacheable=true)
	public static List<Map<String, Object>> getTenantAPIRight(){
		return getFieldsForSection('APIRight');
	}

	/* Attendance */
	@AuraEnabled(cacheable=true)
	public static List<Map<String, Object>> getTenantAttendanceLeft(){
		return getFieldsForSection('AttendanceLeft');
	}

	@AuraEnabled(cacheable=true)
	public static List<Map<String, Object>> getTenantAttendanceRight(){
		return getFieldsForSection('AttendanceRight');
	}

	/* BpoDoc */
	@AuraEnabled(cacheable=true)
	public static List<Map<String, Object>> getTenantBpoDocLeft(){
		return getFieldsForSection('BpoDocLeft');
	}

	@AuraEnabled(cacheable=true)
	public static List<Map<String, Object>> getTenantBpoDocRight(){
		return getFieldsForSection('BpoDocRight');
	}


	/* Option */
	@AuraEnabled(cacheable=true)
	public static List<Map<String, Object>> getTenantOptionLeft(){
		return getFieldsForSection('OptionLeft');
	}


	@AuraEnabled(cacheable=true)
	public static List<Map<String, Object>> getTenantOptionRight(){
		return getFieldsForSection('Optionright');
	}








}
