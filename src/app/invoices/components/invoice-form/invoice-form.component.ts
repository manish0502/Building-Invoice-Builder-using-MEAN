import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , FormBuilder ,Validators} from '@angular/forms';
import { InvoiceService } from '../../invoice.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '../../models/invoice';


@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  invoiceForm:FormGroup;
  private invoice:Invoice[]


  constructor(
       private fb: FormBuilder ,
       private invoiceService : InvoiceService ,
       private _snackBar: MatSnackBar,
       private router:Router,
       private route:ActivatedRoute

       ) { }

  ngOnInit(): void {

    this.createForm();
    this.setInvoiceToForm();
  }

  createForm(){

    this.invoiceForm = this.fb.group({ 
    
          item :['' , Validators.required],
          date: ['' , Validators.required],
          due : ['' , Validators.required],
          qty : ['' , Validators.required],
          rate: '',
          tax : ''
      })
    
     }
     

      onSubmit(){

        
       this.invoiceService.createInvoice(this.invoiceForm.value).subscribe(data=>{
        this._snackBar.open('Invoice Created' , 'Success' , {
            duration:2000
          })
        
         this.invoiceForm.reset();
         this.router.navigate(['dashboard' ,'invoices'])
         console.log(data);
       },
       err => this.errorHandler(err , 'Failed to create invoice')
       )
      
     }

     private errorHandler(error ,message ){
       console.log(error);
       this._snackBar.open(message , 'Error' , {
         duration:2000
       })
     }

     onCancel() {

      this.router.navigate(['dashboard' ,'invoices'])

     }

      setInvoiceToForm(){

        this.route.params.subscribe(params => {

          let id = params['id'];

          if(!id){
            return;
          }
          this.invoiceService.getInvoiceId(id)
          .subscribe(invoice => {
            debugger
             this.invoice = invoice;
             this.invoiceForm.patchValue(this.invoice);
            

          }, err => this.errorHandler(err , 'Failed to get invoice')
          )
        })
       
     }
   
  }


