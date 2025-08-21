import { LightningElement, api, track , wire} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getTenantBasicInfoLeft from '@salesforce/apex/TenantRequestFieldService.getTenantBasicInfoLeft';
import getTenantBasicInfoRight from '@salesforce/apex/TenantRequestFieldService.getTenantBasicInfoRight';
import getTenantSettingTypeLeft from '@salesforce/apex/TenantRequestFieldService.getTenantSettingTypeLeft';
import getTenantInvoiceLeft from '@salesforce/apex/TenantRequestFieldService.getTenantInvoiceLeft';
import getTenantInvoiceRight from '@salesforce/apex/TenantRequestFieldService.getTenantInvoiceRight';
import getTenantWFLeft from '@salesforce/apex/TenantRequestFieldService.getTenantWFLeft';
import getTenantWFRight from '@salesforce/apex/TenantRequestFieldService.getTenantWFRight';
import getTenantBoxLeft from '@salesforce/apex/TenantRequestFieldService.getTenantBoxLeft';
import getTenantBoxRight from '@salesforce/apex/TenantRequestFieldService.getTenantBoxRight';
import getTenantCardLeft from '@salesforce/apex/TenantRequestFieldService.getTenantCardLeft';
import getTenantDocissueLeft from '@salesforce/apex/TenantRequestFieldService.getTenantDocissueLeft';
import getTenantDocissueRight from '@salesforce/apex/TenantRequestFieldService.getTenantDocissueRight';
import getTenantAPILeft from '@salesforce/apex/TenantRequestFieldService.getTenantAPILeft';
import getTenantAPIRight from '@salesforce/apex/TenantRequestFieldService.getTenantAPIRight';
import getTenantAttendanceLeft from '@salesforce/apex/TenantRequestFieldService.getTenantAttendanceLeft';
import getTenantAttendanceRight from '@salesforce/apex/TenantRequestFieldService.getTenantAttendanceRight';
import getTenantBpoDocLeft from '@salesforce/apex/TenantRequestFieldService.getTenantBpoDocLeft';
import getTenantBpoDocRight from '@salesforce/apex/TenantRequestFieldService.getTenantBpoDocRight';
import getTenantOptionLeft from '@salesforce/apex/TenantRequestFieldService.getTenantOptionLeft';
import getTenantOptionRight from '@salesforce/apex/TenantRequestFieldService.getTenantOptionRight';

import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LwcTenantRequest extends LightningElement {

    @api recordId; 
    @api objectApiName = "TenantRequest__c";
    @api var_TenantRequest__c;  /* TenantRequest__c record variable from screen flow*/
    //@api var_UpdateRecord;


    fieldsSettingTypeLeft = [];
    fieldsBasicInfoLeft = [];
    fieldsBasicInfoRight = [];
    
    fieldInvoiceLeft = [];
    fieldInvoiceRight = [];
    fieldWFLeft = [];
    fieldWFRight = [];
    fieldBoxLeft = [];
    fieldBoxRight = [];
    fieldCardLeft = [];
    fieldDocissueLeft = [];
    fieldDocissueRight = [];
    fieldAPILeft = [];
    fieldAPIRight = [];
    fieldAttendanceLeft = [];
    fieldAttendanceRight = [];
    fieldBpoDocLeft = [];
    fieldBpoDocRight = [];
    fieldOptionLeft = [];
    fieldOptionRight = [];

    selectedValue = '';

    connectedCallback() {
        console.log('record Id from layout:', this.recordId);
        console.log('Flow record:', JSON.stringify(this.var_TenantRequest__c));
        console.log('Flow record object:', this.var_TenantRequest__c);
}

    //check if this LWC is in record page or it is in Flow Screen
    get isRecordPage(){
        return this.recordId !== undefined && this.recordId !== null;
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

     @wire(getTenantInvoiceLeft)
    wiredInvoiceLeft({error, data}){
        /* add value from record variable to object of data of metadata retreived by Apex */
        /* apiName, label, type, options & value*/
        if(data && this.var_TenantRequest__c){
            this.fieldInvoiceLeft = data.map(f => {
                console.log('Mapping field for fieldInvoiceLeft:', f); //{apiName: 'CanUseLXI__c', label: 'バクラク債権・債務管理を利用する', type: 'checkbox', isCheckboxField: true, isPicklistField: false}
                return {
                    ...f,
                    value : this.var_TenantRequest__c[f.apiName] ?? null
                };
            });

            console.log('invoice Left', JSON.stringify(this.fieldInvoiceLeft));

        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }

    @wire(getTenantInvoiceRight)
    wiredInvoiceRight({error, data}){
         if(data && this.var_TenantRequest__c){
            this.fieldInvoiceRight = data.map(f => {
                console.log('Mapping field for fieldInvoiceLeft:', f);
                return {
                    ...f,
                    value : this.var_TenantRequest__c[f.apiName] ?? null
                };
            });
            console.log('fieldInvoiceRight :', JSON.stringify(this.fieldInvoiceRight));
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }


    @wire(getTenantWFLeft)
    wiredWFLeft({error, data}){
        if(data && this.var_TenantRequest__c){
            this.fieldWFLeft = data.map(f => {
                return {
                    ...f,
                    value : this.var_TenantRequest__c[f.apiName] ?? null
                };
            });
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }

    @wire(getTenantWFRight)
    wiredWFRight({error, data}){
        /* add value from record variable to object of data of metadata retreived by Apex */
        /* apiName, label, type, options & value*/
        if(data && this.var_TenantRequest__c){
            this.fieldWFRight = data.map(f => {
                return {
                    ...f,
                    value : this.var_TenantRequest__c[f.apiName] ?? null
                };
            });
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }

     @wire(getTenantBoxLeft)
    wiredBoxLeft({error, data}){
        /* add value from record variable to object of data of metadata retreived by Apex */
        /* apiName, label, type, options & value*/
        if(data && this.var_TenantRequest__c){
            this.fieldBoxLeft = data.map(f => {
                return {
                    ...f,
                    value : this.var_TenantRequest__c[f.apiName] ?? null
                };
            });
            console.log('BoxLeft', JSON.stringify(this.fieldBoxLeft));

        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }

     @wire(getTenantBoxRight)
    wiredBoxRight({error, data}){
        /* add value from record variable to object of data of metadata retreived by Apex */
        /* apiName, label, type, options & value*/
        if(data && this.var_TenantRequest__c){
            this.fieldBoxRight = data.map(f => {
                return {
                    ...f,
                    value : this.var_TenantRequest__c[f.apiName] ?? null
                };
            });
            console.log('BoxRight', JSON.stringify(this.fieldBoxRight));

        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }



     @wire(getTenantCardLeft)
    wiredCardRight({error, data}){
        /* add value from record variable to object of data of metadata retreived by Apex */
        /* apiName, label, type, options & value*/
        if(data && this.var_TenantRequest__c){
            this.fieldCardLeft = data.map(f => {
                return {
                    ...f,
                    value : this.var_TenantRequest__c[f.apiName] ?? null
                };
            });
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }

     @wire(getTenantDocissueLeft)
    wiredDocissueLeft({error, data}){
        /* add value from record variable to object of data of metadata retreived by Apex */
        /* apiName, label, type, options & value*/
        if(data && this.var_TenantRequest__c){
            this.fieldDocissueLeft = data.map(f => {
                return {
                    ...f,
                    value : this.var_TenantRequest__c[f.apiName] ?? null
                };
            });
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }

    @wire(getTenantDocissueRight)
    wiredDocissueRight({error, data}){
        /* add value from record variable to object of data of metadata retreived by Apex */
        /* apiName, label, type, options & value*/
        if(data && this.var_TenantRequest__c){
            this.fieldDocissueRight = data.map(f => {
                return {
                    ...f,
                    value : this.var_TenantRequest__c[f.apiName] ?? null
                };
            });
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }

    @wire(getTenantAPILeft)
    wiredAPILeft({error, data}){
        /* add value from record variable to object of data of metadata retreived by Apex */
        /* apiName, label, type, options & value*/
        if(data && this.var_TenantRequest__c){
            this.fieldAPILeft = data.map(f => {
                return {
                    ...f,
                    value : this.var_TenantRequest__c[f.apiName] ?? null
                };
            });
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }

    @wire(getTenantAPIRight)
    wiredAPIRight({error, data}){
        /* add value from record variable to object of data of metadata retreived by Apex */
        /* apiName, label, type, options & value*/
        if(data && this.var_TenantRequest__c){
            this.fieldAPIRight = data.map(f => {
                return {
                    ...f,
                    value : this.var_TenantRequest__c[f.apiName] ?? null
                };
            });
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }

    @wire(getTenantAttendanceLeft)
    wiredAttendanceLeft({error, data}){
        /* add value from record variable to object of data of metadata retreived by Apex */
        /* apiName, label, type, options & value*/
        if(data && this.var_TenantRequest__c){
            this.fieldAttendanceLeft = data.map(f => {
                return {
                    ...f,
                    value : this.var_TenantRequest__c[f.apiName] ?? null
                };
            });
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }

    @wire(getTenantAttendanceRight)
    wiredAttendanceRight({error, data}){
        /* add value from record variable to object of data of metadata retreived by Apex */
        /* apiName, label, type, options & value*/
        if(data && this.var_TenantRequest__c){
            this.fieldAttendanceRight = data.map(f => {
                return {
                    ...f,
                    value : this.var_TenantRequest__c[f.apiName] ?? null
                };
            });
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }

    @wire(getTenantBpoDocLeft)
    wiredBpoDocLeft({error, data}){
        /* add value from record variable to object of data of metadata retreived by Apex */
        /* apiName, label, type, options & value*/
        if(data && this.var_TenantRequest__c){
            this.fieldBpoDocLeft = data.map(f => {
                return {
                    ...f,
                    value : this.var_TenantRequest__c[f.apiName] ?? null
                };
            });
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }

    @wire(getTenantBpoDocRight)
    wiredBpoDocRight({error, data}){
        if(data && this.var_TenantRequest__c){
            this.fieldBpoDocRight = data.map(f => {
                return {
                    ...f,
                    value : this.var_TenantRequest__c[f.apiName] ?? null
                };
            });
            console.log('BpoDocRight', JSON.stringify(this.fieldBpoDocRight));
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }

    @wire(getTenantOptionLeft)
    wiredOptionLeft({error, data}){
        if(data && this.var_TenantRequest__c){
            this.fieldOptionLeft = data.map(f => {
                return {
                    ...f,
                    value : this.var_TenantRequest__c[f.apiName] ?? null
                };
            });
            console.log('OptionLeft', JSON.stringify(this.fieldOptionLeft));
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }

    @wire(getTenantOptionRight)
    wiredOptionRight({error, data}){
        console.log('OptionRight data', JSON.stringify(data));
        let tempTenantRequest = {...this.var_TenantRequest__c};

        if(data && this.var_TenantRequest__c){
            this.fieldOptionRight = data.map(f => {

                let fixValue = tempTenantRequest[f.apiName];
                // if checkbox field = null, convert null to  false
                if (f.isCheckboxField && (fixValue === null || fixValue === undefined) ) {
                    fixValue = false;
                    tempTenantRequest[f.apiName] = fixValue;
                    console.log('tempTenantRequest:', JSON.stringify(tempTenantRequest));
                }

                return {...f,value : fixValue};
                
            });
            this.var_TenantRequest__c = tempTenantRequest; // assign back

            console.log('OptionRight', JSON.stringify(this.fieldOptionRight));
            console.log('this.var_TenantRequest__c', JSON.stringify(this.var_TenantRequest__c));
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }


    handleChangeInvoiceLeft(event){
        const fieldName = event.target.name;
        const newValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value ;
        let tempTenantRequest = {...this.var_TenantRequest__c};
        

        //Update value property for LWC rendering
        this.fieldInvoiceLeft = this.fieldInvoiceLeft.map(f => {
            if(f.apiName === fieldName){
                //assign new value to record variable's object
                tempTenantRequest[f.apiName] = newValue;
                //render the change from LWC screen to variable in lWC
                return {...f, value:newValue};
            }
            //other apiName value remains the same
            return f;
        });

        //Update the flow record variable
        this.var_TenantRequest__c = { ...tempTenantRequest }; // assign back
         console.log('this.var_TenantRequest__c fieldInvoiceLeft:', JSON.stringify(this.var_TenantRequest__c));
    }

    handleChangeInvoiceRight(event){
        const fieldName = event.target.name;
        const newValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value ;
        let tempTenantRequest = {...this.var_TenantRequest__c};

        //Update value property for LWC rendering
        this.fieldInvoiceRight = this.fieldInvoiceRight.map(f => {
            if(f.apiName === fieldName){
                //assign new value to record variable's object
                tempTenantRequest[f.apiName] = newValue;
                //render the change from LWC screen to variable in lWC
                return {...f, value:newValue};
            }
            //other apiName value remains the same
            return f;
        });

        //Update the flow record variable
        this.var_TenantRequest__c = { ...tempTenantRequest }; // assign back
         console.log('this.var_TenantRequest__c fieldInvoiceRight:', JSON.stringify(this.var_TenantRequest__c));
    }

    handleChangeWFLeft(event){
        const fieldName = event.target.name;
        const newValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value ;
        let tempTenantRequest = {...this.var_TenantRequest__c};

        //Update value property for LWC rendering
        this.fieldWFLeft = this.fieldWFLeft.map(f => {
            if(f.apiName === fieldName){
                //assign new value to record variable's object
                tempTenantRequest[f.apiName] = newValue;
                //render the change from LWC screen to variable in lWC
                return {...f, value:newValue};
            }
            //other apiName value remains the same
            return f;
        });

        //Update the flow record variable
        this.var_TenantRequest__c = { ...tempTenantRequest }; // assign back
         console.log('this.var_TenantRequest__c fieldWFLeft :', JSON.stringify(this.var_TenantRequest__c));
    }

    handleChangeWFRight(event){
        const fieldName = event.target.name;
        const newValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value ;

        //Update value property for LWC rendering
        this.fieldWFRight = this.fieldWFRight.map(f => {
            if(f.apiName === fieldName){
                return {...f, value:newValue};
            }
            //other apiName value remains the same
            return f;
        });

        //Update the flow record variable
        this.var_TenantRequest__c[fieldName] = newValue;
    }

    handleChangeBoxLeft(event){
        const fieldName = event.target.name;
        const newValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value ;

        //Update value property for LWC rendering
        this.fieldBoxLeft = this.fieldBoxLeft.map(f => {
            if(f.apiName === fieldName){
                return {...f, value:newValue};
            }
            //other apiName value remains the same
            return f;
        });

        //Update the flow record variable
        this.var_TenantRequest__c[fieldName] = newValue;
    }

    handleChangeBoxRight(event){
        const fieldName = event.target.name;
        const newValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value ;

        //Update value property for LWC rendering
        this.fieldBoxRight = this.fieldBoxRight.map(f => {
            if(f.apiName === fieldName){
                return {...f, value:newValue};
            }
            //other apiName value remains the same
            return f;
        });

        //Update the flow record variable
        this.var_TenantRequest__c[fieldName] = newValue;
    }

    handleChangeCardLeft(event){
        const fieldName = event.target.name;
        const newValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value ;

        //Update value property for LWC rendering
        this.fieldCardLeft = this.fieldCardLeft.map(f => {
            if(f.apiName === fieldName){
                return {...f, value:newValue};
            }
            //other apiName value remains the same
            return f;
        });

        //Update the flow record variable
        this.var_TenantRequest__c[fieldName] = newValue;
    }

    handleChangeDocissueLeft(event){
        const fieldName = event.target.name;
        const newValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value ;

        //Update value property for LWC rendering
        this.fieldDocissueLeft = this.fieldDocissueLeft.map(f => {
            if(f.apiName === fieldName){
                return {...f, value:newValue};
            }
            //other apiName value remains the same
            return f;
        });

        //Update the flow record variable
        this.var_TenantRequest__c[fieldName] = newValue;
    }

    handleChangeDocissueRight(event){
        const fieldName = event.target.name;
        const newValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value ;

        //Update value property for LWC rendering
        this.fieldDocissueRight = this.fieldDocissueRight.map(f => {
            if(f.apiName === fieldName){
                return {...f, value:newValue};
            }
            //other apiName value remains the same
            return f;
        });

        //Update the flow record variable
        this.var_TenantRequest__c[fieldName] = newValue;
    }


    handleChangeAPILeft(event){
        const fieldName = event.target.name;
        const newValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value ;

        //Update value property for LWC rendering
        this.fieldAPILeft = this.fieldAPILeft.map(f => {
            if(f.apiName === fieldName){
                return {...f, value:newValue};
            }
            //other apiName value remains the same
            return f;
        });

        //Update the flow record variable
        this.var_TenantRequest__c[fieldName] = newValue;
    }


    handleChangeAPIRight(event){
        const fieldName = event.target.name;
        const newValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value ;

        //Update value property for LWC rendering
        this.fieldAPIRight = this.fieldAPIRight.map(f => {
            if(f.apiName === fieldName){
                return {...f, value:newValue};
            }
            //other apiName value remains the same
            return f;
        });

        //Update the flow record variable
        this.var_TenantRequest__c[fieldName] = newValue;
    }

    handleChangeAttendanceLeft(event){
        const fieldName = event.target.name;
        const newValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value ;

        //Update value property for LWC rendering
        this.fieldAttendanceLeft = this.fieldAttendanceLeft.map(f => {
            if(f.apiName === fieldName){
                return {...f, value:newValue};
            }
            //other apiName value remains the same
            return f;
        });

        //Update the flow record variable
        this.var_TenantRequest__c[fieldName] = newValue;
    }


    handleChangeAttendanceRight(event){
        const fieldName = event.target.name;
        const newValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value ;

        //Update value property for LWC rendering
        this.fieldAttendanceRight = this.fieldAttendanceRight.map(f => {
            if(f.apiName === fieldName){
                return {...f, value:newValue};
            }
            //other apiName value remains the same
            return f;
        });

        //Update the flow record variable
        this.var_TenantRequest__c[fieldName] = newValue;
    }

    handleChangeBpoDocLeft(event){
        const fieldName = event.target.name;
        const newValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value ;

        //Update value property for LWC rendering
        this.fieldBpoDocLeft = this.fieldBpoDocLeft.map(f => {
            if(f.apiName === fieldName){
                return {...f, value:newValue};
            }
            //other apiName value remains the same
            return f;
        });

        //Update the flow record variable
        this.var_TenantRequest__c[fieldName] = newValue;
    }

    handleChangeBpoDocRight(event){
        const fieldName = event.target.name;
        const newValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value ;

        //Update value property for LWC rendering
        this.fieldBpoDocRight = this.fieldBpoDocRight.map(f => {
            if(f.apiName === fieldName){
                return {...f, value:newValue};
            }
            //other apiName value remains the same
            return f;
        });

        //Update the flow record variable
        this.var_TenantRequest__c[fieldName] = newValue;
    }

    handleChangeOptionLeft(event){
        const fieldName = event.target.name;
        const newValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value ;

        //Update value property for LWC rendering
        this.fieldOptionLeft = this.fieldOptionLeft.map(f => {
            if(f.apiName === fieldName){
                return {...f, value:newValue};
            }
            //other apiName value remains the same
            return f;
        });

        //Update the flow record variable
        this.var_TenantRequest__c[fieldName] = newValue;
    }

    handleChangeOptionRight(event){
        const fieldName = event.target.name;
        const newValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value ;

        //Update value property for LWC rendering
        this.fieldOptionRight = this.fieldOptionRight.map(f => {
            if(f.apiName === fieldName){
                return {...f, value:newValue};
            }
            //other apiName value remains the same
            return f;
        });
        console.log('this.fieldOptionRight :', JSON.stringify(this.fieldOptionRight));

        //Update the flow record variable
        this.var_TenantRequest__c[fieldName] = newValue;
        console.log('this.var_TenantRequest__c :', JSON.stringify(this.var_TenantRequest__c));
    }
 


    /* get options() {
        return [
        { label: 'トライアル', value: 'トライアル'},
        {label: '本番', value: '本番'}
        ];
    } */
    

   /*  checkboxValue = {
        '債権債務管理を利用する': false,
        '請求書仕訳': false,
        '経費精算仕訳': false,
        'カード仕訳': false,
        '売上仕訳': false,
        '入金・消込仕訳': false,
        '申請経費精算を利用する': false,
        '経費精算申請': false
    }; */

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
