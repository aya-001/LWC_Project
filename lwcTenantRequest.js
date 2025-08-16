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
    fieldAPILeftt = [];
    fieldAPIRight = [];
    fieldAttendanceLeft = [];
    fieldAttendanceRight = [];
    fieldBpoDocLeft = [];
    fieldBpoDocRight = [];
    fieldOptionLeft = [];
    fieldOptionRight = [];

    selectedValue = '';

    //check if this LWC is in record page or it is in Flow Screen
    get isRecordPage(){
        return this.recordId !== undefined && this.recordId !== null;
    }


     @wire(getTenantSettingTypeLeft)
    wiredSettingTypeLeft({error, data}){
        if(data){
            this.fieldsSettingTypeLeft = data;
        }else if(error) {
            console.error('Error fetching fields:', error);
        }
    }


    @wire(getTenantBasicInfoLeft)
    wiredBasicInfoLeft({error, data}){
        if(data){
            this.fieldsBasicInfoLeft = data;
        }else if(error) {
            console.error('Error fetching fields:', error);
        }
    }

    
    @wire(getTenantBasicInfoRight)
    wiredBasicInfoRight({error, data}){
        if(data){
            this.fieldsBasicInfoRight = data;
        }else if(error) {
            console.error('Error fetching fields:', error);
        }
    }

     @wire(getTenantInvoiceLeft)
    wiredInvoiceLeft({error, data}){
        if(data){
            console.log('invoice Left', JSON.stringify(data));
            this.fieldInvoiceLeft = data;
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }

    @wire(getTenantInvoiceRight)
    wiredInvoiceRight({error, data}){
        if(data){
            this.fieldInvoiceRight = data;
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }


    @wire(getTenantWFLeft)
    wiredWFLeft({error, data}){
        if(data){
            this.fieldWFLeft = data;
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }

    @wire(getTenantWFRight)
    wiredWFRight({error, data}){
        if(data){
            this.fieldWFRight = data;
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }

     @wire(getTenantBoxLeft)
    wiredBoxLeft({error, data}){
        if(data){
            console.log('BoxLeft', JSON.stringify(data));
            this.fieldBoxLeft = data;
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }

     @wire(getTenantBoxRight)
    wiredBoxRight({error, data}){
        if(data){
            console.log('BoxRight', JSON.stringify(data));
            this.fieldBoxRight = data;
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }



     @wire(getTenantCardLeft)
    wiredCardRight({error, data}){
        if(data){
            this.fieldCardLeft = data;
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }

     @wire(getTenantDocissueLeft)
    wiredDocissueLeft({error, data}){
        if(data){
            this.fieldDocissueLeft = data;
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }

    @wire(getTenantDocissueRight)
    wiredDocissueRight({error, data}){
        if(data){
            this.fieldDocissueRight = data;
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }

    @wire(getTenantAPILeft)
    wiredAPILeft({error, data}){
        if(data){
            this.fieldAPILeftt = data;
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }

    @wire(getTenantAPIRight)
    wiredAPIRight({error, data}){
        if(data){
            this.fieldAPIRight = data;
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }

    @wire(getTenantAttendanceLeft)
    wiredAttendanceLeft({error, data}){
        if(data){
            this.fieldAttendanceLeft = data;
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }

    @wire(getTenantAttendanceRight)
    wiredAttendanceRight({error, data}){
        if(data){
            this.fieldAttendanceRight = data;
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }

    @wire(getTenantBpoDocLeft)
    wiredBpoDocLeft({error, data}){
        if(data){
            this.fieldBpoDocLeft = data;
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }

    @wire(getTenantBpoDocRight)
    wiredBpoDocRight({error, data}){
        if(data){
            this.fieldBpoDocRight = data;
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }

    @wire(getTenantOptionLeft)
    wiredOptionLeft({error, data}){
        if(data){
            this.fieldOptionLeft = data;
        }else if(error){
            console.error('Error fetching fields:', error);
        }
    }

    @wire(getTenantOptionRight)
    wiredOptionRight({error, data}){
        if(data){
            this.fieldOptionRight = data;
        }else if(error){
            console.error('Error fetching fields:', error);
        }
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
