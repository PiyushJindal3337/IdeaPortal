/* eslint-disable no-console */
import { LightningElement, track, api } from 'lwc';


import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import lwc_OBJECT from '@salesforce/schema/lwc__c';


import NAME_FIELD from '@salesforce/schema/lwc__c.Name';
import EMAIL_FIELD from '@salesforce/schema/lwc__c.Email__c';
import PASSWORD_FIELD from '@salesforce/schema/lwc__c.Password__c';
//import createNewRecord from '@salesforce/apex/asm_UserSignUpPage.createNewRecord';
//import { refreshApex } from '@salesforce/apex';

export default class Asm_UserSignUpPage extends LightningElement {

    @track open = false;
    @track openLogin = false;
    @api recId;

    @track name = '';
    @track email = '';
    @track password = '';

    handleClick(event) {
        this.recId = event.currentTarget.name;
        this.open = true;
       }

    handleClick1(event) {
        this.recId = event.currentTarget.name;
        this.openLogin = true;
       }   

    closeModal() {
        this.open = false;
        this.openLogin = false;
    }

    handleFullNameChange(event) {
        this.recId = undefined;
        this.name = event.target.value;
    }

    
    handleEmailChange(event) {
        this.recId = undefined;
        this.email = event.target.value;
    }

    handlePasswordChange(event) {
        this.recId = undefined;
        this.password = event.target.value;
    }

    save(){
        
        
        const fields = {};
       fields[NAME_FIELD.fieldApiName] = this.name;
       fields[EMAIL_FIELD.fieldApiName] = this.email;
       fields[PASSWORD_FIELD.fieldApiName] = this.password;
          
       const recordInput = { apiName: lwc_OBJECT.objectApiName, fields };

       createRecord(recordInput)
           .then(user => {
               this.recId = user.id;
                this.dispatchEvent(
                   new ShowToastEvent({
                       title: 'Success',
                       message: 'Successfully Registered',
                       variant: 'success',
                   }),
               );
               
               //return refreshApex(this.Assets);
           })
           .catch(error => {
               this.dispatchEvent(
                   new ShowToastEvent({
                       title: 'Error creating record',
                       message: error.body.message,
                       variant: 'error',
                   }),
               );
           });
/*My Code----- Works------
           let newRecord = { [NAME_FIELD.fieldApiName] : this.name,[EMAIL_FIELD.fieldApiName] : this.email,[PASSWORD_FIELD.fieldApiName] : this.password };
           //console.log('NewRecord+++++::'+newRecord); //output of this will be : [object object]
           console.log('NewRecord,,,,,,::',newRecord);//output of this will be : readable content
           createNewRecord({record : newRecord})
           .then((resp)=>{
                           this.recordId = resp.Id; //this will auto call wireMethod/
           }).catch((err) => {
              // Handle any error that occurred in any of the previous
              // promises in the chain.
              console.log(JSON.stringify(err));
            });*/
       this.open = false;       
   }

   login(){
    console.log("Email " + this.email );
    console.log("Password " + this.password );

    console.log("Email " + EMAIL_FIELD );
    console.log("Password " + PASSWORD_FIELD );
   }
}