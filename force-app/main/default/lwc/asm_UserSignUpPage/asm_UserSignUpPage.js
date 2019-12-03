/* eslint-disable no-console */
import { LightningElement, track, api, wire } from 'lwc';


import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import lwc_OBJECT from '@salesforce/schema/lwc__c';

import getUserRecord from '@salesforce/apex/asm_UserSignUpPage.getUserRecord';
import NAME_FIELD from '@salesforce/schema/lwc__c.Name';
import EMAIL_FIELD from '@salesforce/schema/lwc__c.Email__c';
import PASSWORD_FIELD from '@salesforce/schema/lwc__c.Password__c';
//import createNewRecord from '@salesforce/apex/asm_UserSignUpPage.createNewRecord';
//import { refreshApex } from '@salesforce/apex';

export default class Asm_UserSignUpPage extends LightningElement {

    @track open = false;
    @track openLogin = false;
    @api recId;

    @track loginUser;
    @track loginUserErr;
    @track name = '';
    @track email = '';
    @track password = '';

    @track emailUser;
    @track passwordUser;

    @wire(getUserRecord,{email : '$emailUser', password : '$passwordUser'})
    wiredMetod({error, data}){
        if(data!=null){
            console.log('DATA : '+data);
            console.log('DATA Stringify : '+JSON.stringify(data));
        }
        if(data==null){
            console.log('You r not registered');
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'UNREGISTERED USER',
                    message: 'You are not an authorized user',
                    variant: 'failure'
                }),
            );
        }
        if(error){
            console.log('Error : '+error);
        }
    }

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
        this.emailUser = event.target.value;
    }

    handlePasswordChange(event) {
        this.recId = undefined;
        this.password = event.target.value;
        this.passwordUser = event.target.value;
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

    /*const fields = {};
       fields[EMAIL_FIELD.fieldApiName] = this.email;
       fields[PASSWORD_FIELD.fieldApiName] = this.password;
          
       const loginRecord = { apiName: lwc_OBJECT.objectApiName, fields };
       console.log('User Record +++++ : '+loginRecord);
       console.log('User Record ,,,,, : ',loginRecord);*/
       /*
       getUserRecord({email : this.email, password : this.password})
       .this(result=>{
           console.log('Valueeeeeeeeeeeeeee');
           if(result!=null){
            this.loginUser = result;
            console.log('Login user Details ,,,: ',result);
            console.log('Login user Details +++: '+result);
            }
            else{
                console.log('nO vALUE');
            }  
       })
       .catch(error=>{
           this.loginUserErr = error;
           console.log('Login user Error ,,,: ',error);
           console.log('Login user Error +++: '+error);
       });*/

   }
}