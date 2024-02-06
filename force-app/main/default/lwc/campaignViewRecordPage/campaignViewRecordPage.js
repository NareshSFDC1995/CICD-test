import { LightningElement,api,track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {NavigationMixin, CurrentPageReference} from 'lightning/navigation';
import readEdit from './CampaignEditRecordPage.html'
import readView from './campaignViewRecordPage.html'

export default class CampaignViewRecordPage extends NavigationMixin (LightningElement) {
    @api recordId;
    @api readEdit =false;
    @track onsavewait=false;

    editRecord(){
        this.readEdit = true;
    }

    render(){
        return this.readEdit===true?readEdit:readView;
    }

    validateCustom(event){        
        //Variable to handle submit
        this.allowSubmit=false;
        
        //check if all required inputs are filled else throw validation error 
        let validInputs = [];
        let inputfieldsValid =  this.template.querySelectorAll('lightning-input-field');
        inputfieldsValid.forEach(element => {
           element.reportValidity();
           validInputs.push(element.reportValidity());
        });
        
        //check if validation is false for any input-field
        let allInputFieldValid = validInputs.includes(false);

        //fetch submit button using style class
        const projectbtn = this.template.querySelector(".updatecamp");
        // if the button exist, trigger click
        
        //Marking the variable to true if all fields has value
        if (!allInputFieldValid) {
            this.allowSubmit=true;
            this.onsavewait = true;
            
        } else {
            this.showNotification('Error:','Please fill the manadatory fields','error');
        }
        if(projectbtn) {
            projectbtn.click();
        }      
    }

    showNotification(title,message,variant ) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }

    handleSuccess() {
        this.readEdit = false;
        this.onsavewait = false;
        const evt = new ShowToastEvent({
            title: "Success!",
            message: "The record has been successfully saved.",
            variant: "success",
        });
        this.dispatchEvent(evt);
    }

    handleError() {
        this.onsavewait = false;
        const evt = new ShowToastEvent({
            title: "Error!",
            message: "An error occurred while attempting to save the record.",
            variant: "error",
        });
        this.dispatchEvent(evt);
    }

    handleCancel(event) {
        this.readEdit = false;
        event.preventDefault();
    }
}