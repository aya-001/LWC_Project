import { LightningElement, api, track , wire} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getTenantSections from '@salesforce/apex/TenantRequestFieldService.getTenantSections';

import getTenantBasicInfoLeft from '@salesforce/apex/TenantRequestFieldService.getTenantBasicInfoLeft';
import getTenantBasicInfoRight from '@salesforce/apex/TenantRequestFieldService.getTenantBasicInfoRight';
import getTenantSettingTypeLeft from '@salesforce/apex/TenantRequestFieldService.getTenantSettingTypeLeft';

import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LwcTenantRequest extends LightningElement {

    @api recordId; 
    @api objectApiName = "TenantRequest__c";
    @track uniqueKey = 0;

    fieldsSettingTypeLeft = [];
    fieldsBasicInfoLeft = [];
    fieldsBasicInfoRight = [];
    fields = [];
    @track difference = [];
    _previousRecord;
    _tenantRequest;


    selectedValue = '';

    connectedCallback() {
        console.log('record Id from layout:', this.recordId);
        console.log('connectedCallback:this.var_TenantRequest__c', JSON.stringify(this.var_TenantRequest__c));
        console.log('connectedCallback this.var_PreviousRecord:', this.var_PreviousRecord);

}

    //check if this LWC is in record page or it is in Flow Screen
    get isRecordPage(){
        return this.recordId !== undefined && this.recordId !== null;
    }

    get isUpdateTenantRequest(){
        return (this.var_PreviousRecord !== undefined && this.var_PreviousRecord != null);
    }

    //get value changes in record variable to display LWC reactively 
    @api
    set var_TenantRequest__c(value){
        this._tenantRequest = { ...value };
        console.log('set var_TenantRequest__c:', this._tenantRequest);

        // only update if fields already exist, refresh lwc
        if(this.fields.length){
            this.refreshUI();
            this.uniqueKey++; //forces LWC to rebuild DOM.
        }
    }
    get var_TenantRequest__c(){
        console.log('get var_TenantRequest__c');
        return this._tenantRequest;
    }

    

    @api
    set var_PreviousRecord(value){
        this._previousRecord = { ...value };
        console.log('set var_PreviousRecord:', this._previousRecord);

        // only update if fields already exist, refresh lwc
        if(this.fields.length){
            this.refreshUI();
            this.uniqueKey++; //forces LWC to rebuild DOM.
        }
    }
    get var_PreviousRecord(){
        console.log('get var_PreviousRecord');
        return this._previousRecord;
    }

    


    refreshUI(){
        console.log('Updated var_TenantRequest__c from Flow:', this._tenantRequest);
        this.updateFieldsValues(); 
        this.calculateDifference();

    }

    updateFieldsValues() {
        console.log('UupdateFieldsValues()');
    // loop through sections and left/right fields
        this.fields = this.fields.map(section => {
            return {
                ...section,
                fieldsLeft: section.fieldsLeft.map(f => ({
                    ...f,
                    value: this._tenantRequest[f.apiName] ?? f.value
                })),
                fieldsRight: section.fieldsRight.map(f => ({
                    ...f,
                    value: this._tenantRequest[f.apiName] ?? f.value
                }))
            };
        });
        console.log('updateFieldsValues() this.fields', this.fields);
    }

    //getter property to return array of objects of product fields
    get allProductFields(){
        return this.fields.flatMap(section =>[
            ...section.fieldsLeft,
            ...section.fieldsRight
        ]);
    }
        /* [  example of allProductFields
        { apiName: "CanUseLXI__c", label: "利用する", type: "checkbox", value: true },
        { apiName: "Invoice_c", label: "請求書仕分け", type: "checkbox", value: true },
        { apiName: "IsArManagement__c", label: "入金消込", type: "checkbox", value: true },
        { apiName: "IsWfCardReportFormula__c", label: "カード仕分け", type: "text", value: true },
        { apiName: "ExpenseLimit__c", label: "経費上限", type: "number", value: true }
        ] */
 

    calculateDifference(){
        console.log('calculateDifference()');
        const diffs = [];
        console.log('calculateDifference this._tenantRequest', this._tenantRequest);
        console.log('calculateDifference this.var_PreviousRecord', this.var_PreviousRecord);


        if( !this._tenantRequest || !this.var_PreviousRecord) return;

        for(let productField of this.allProductFields ){
            //  this.allProductFields, calcualte diffs only for product fields, not section not other part of TenantRequest values
            console.log('PreviousRecord keys:', Object.keys(this.var_PreviousRecord));
            console.log('TenantRequest keys:', Object.keys(this._tenantRequest));
            console.log('productField', productField);

            const oldVal = this.var_PreviousRecord[productField.apiName];
            const newVal = this._tenantRequest[productField.apiName];

            if (oldVal !== newVal) {
                
                diffs.push({ 
                    apiName: productField.apiName, 
                    label: productField.label,
                    oldValue: oldVal, 
                    newValue: newVal 
                });
            }
        }

        this.difference = diffs;
        /*　this.difference
        [{apiName: aaa_c,label: label1,oldValue: oldVal1, newValue: newVal1 },
        {apiName: bbb_c,label: label2,oldValue: oldVal2, newValue: newVal2 }
        ] */
        console.log('calculateDifference() this.difference', this.difference);

        //call method to save chagelogs to tenantrequest record variable
        this.saveChangeLogs()

    }

    saveChangeLogs(){
        if(this.difference && this.difference.length > 0){
             // HTML string with <br> for line breaks
            const changeLogHtml = this.difference.map(d => {return `${d.label}が ${d.oldValue} から ${d.newValue} に変更されました`;}).join('<br>');

            //this._tenantRequest.ChangeDetails_Product__c = hangeLogHtml;
            this._tenantRequest.ChangeDetails_Product__c = `<p>${changeLogHtml}</p>`;
            //this.var_TenantRequest__c = {...this._tenantRequest};

            console.log('saveChangeLogs', this._tenantRequest.ChangeDetails_Product__c);
        }
    }




    


    //check if the field is boolean or not
    isCheckbox(type){
        return type === 'checkbox';
    }

     @wire(getTenantSettingTypeLeft)
    wiredSettingTypeLeft({error, data}){
        /* add value from record variable to object of data of metadata retreived by Apex */
        /* apiName, label, type, options & value*/
        if(data && this.var_TenantRequest__c){
            this.fieldsSettingTypeLeft = data.map(f => {
                console.log('Mapping field:', f, 'Value from record:');
                return {
                    ...f,
                    value : this.var_TenantRequest__c[f.apiName] ?? null
                };
            });

        }else if(error) {
            console.error('Error fetching fields:', error);
        }
    }


    @wire(getTenantBasicInfoLeft)
    wiredBasicInfoLeft({error, data}){
         /* add value from record variable to object of data of metadata retreived by Apex */
        /* apiName, label, type, options & value*/
        if(data && this.var_TenantRequest__c){
            this.fieldsBasicInfoLeft = data.map(f => {
                return {
                    ...f,
                    value : this.var_TenantRequest__c[f.apiName] ?? null
                };
            });

        }else if(error) {
            console.error('Error fetching fields:', error);
        }
    }

    
    @wire(getTenantBasicInfoRight)
    wiredBasicInfoRight({error, data}){
        /* add value from record variable to object of data of metadata retreived by Apex */
        /* apiName, label, type, options & value*/
        if(data && this.var_TenantRequest__c){
            this.fieldsBasicInfoRight = data.map(f => {
                return {
                    ...f,
                    value : this.var_TenantRequest__c[f.apiName] ?? null
                };
            });

        }else if(error) {
            console.error('Error fetching fields:', error);
        }
    }

    @wire(getTenantSections)
    wiredTenantSections({error, data}){
        if(data){
            console.log('Mapping data:', JSON.stringify(data)); 
            let tempTenantRequest = {...this.var_TenantRequest__c};

            this.fields = data.map(section => {
                console.log('Mapping All Fields:', section); 

                return {
                    ...section,
                    fieldsLeft : section.fieldsLeft.map(f =>{

                        //store current value from recrod variable
                        let fixValue = tempTenantRequest[f.apiName];

                        // if checkbox field = null, convert null to  false
                        if (f.isCheckboxField && (fixValue === null || fixValue === undefined) ) {
                            fixValue = false;
                            tempTenantRequest[f.apiName] = fixValue;
                            console.log('tempTenantRequest:', JSON.stringify(tempTenantRequest));
                        }

                        return {...f, value : fixValue};
                    }),
                    fieldsRight: section.fieldsRight.map(f => {
                        //store current value from recrod variable
                        let fixValue = tempTenantRequest[f.apiName];

                        // if checkbox field = null, convert null to  false
                        if (f.isCheckboxField && (fixValue === null || fixValue === undefined) ) {
                            fixValue = false;
                            tempTenantRequest[f.apiName] = fixValue;
                            console.log('tempTenantRequest:', JSON.stringify(tempTenantRequest));
                        }

                        return {...f, value : fixValue};
                    })
                    
                };
            });
            console.log('All this.fields', JSON.stringify(this.fields));

        }else if(error){
            console.error('Error fetching fields', error);
        }
    }



    handleChangeFlowInputs(event){
        const fieldName = event.target.name;
        const newValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value ;
        let tempTenantRequest = {...this.var_TenantRequest__c};

         // Urecord private variable (_tenantRequest)
        this._tenantRequest = {
            ...this._tenantRequest,
            [fieldName]: newValue
        };

        //Update value property for LWC rendering
        this.fields = this.fields.map(section => {
            /* loop throuth list of fieldsLeft */
            const updatedLeft = section.fieldsLeft.map(f => {
                if (f.apiName === fieldName) {
                    tempTenantRequest[f.apiName] = newValue; // Update Flow record
                    return { ...f, value: newValue }; // Update LWC
                }
                return f; // keep other fields unchanged
            });

            const updatedRight = section.fieldsRight.map(f => {
                if (f.apiName === fieldName) {
                    tempTenantRequest[f.apiName] = newValue;
                    return { ...f, value: newValue };
                }
                return f;
            });

            return { ...section, fieldsLeft: updatedLeft, fieldsRight: updatedRight };
        
        });

        //Update the flow record variable
        this.var_TenantRequest__c = { ...tempTenantRequest }; // assign back

        // Recompute changelog instantly
        this.calculateDifference();

         console.log('handleChangeFlowInputs this.var_TenantRequest__c', JSON.stringify(this.var_TenantRequest__c));
         console.log('handleChangeFlowInputs this._tenantRequest', JSON.stringify(this._tenantRequest));
    }

    
 

    handleOnChange(event) {
        this.selectedValue = event.detail.value;
    }

    handleCheckbox(event) {
        const label = event.target.label;
        this.checkboxValue[label] = event.target.checked;
    }


    handleSuccess(event){
        const evt = new ShowToastEvent({
            title: '保存成功',
            message: 'レコードが正常に保存されました',
            variant: 'Success'
        });
        this.dispatchEvent(evt);
    }

    handleError(event){
        const evt = new ShowToastEvent({
            title: '保存失敗',
            message: event.detail.message,
            variant: 'error'
        });
    }


    handleCancel(){
        //Navigate away to the record page if recordId is not null
        if(this.recordId){
            this[NavigationMixin.Navigate]({
                type:'standard__recordPage',
                attribute:{
                    recordId: this.recordId,
                    objectApiName: 'TenantRequest__c',
                    actionName: 'view'
                }
            });
        }
    }


    

}
