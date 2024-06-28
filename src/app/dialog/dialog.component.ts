import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validator, Validators} from '@angular/forms';
import { ApiService } from '../service/api.service';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit {
 
   freshnessList = ['Brand New', 'Second hand', 'Refurbished']
   productForm ! : FormGroup;
   actionBtn : string ="save"

  constructor(private formbuilder :FormBuilder, @Inject(MAT_DIALOG_DATA) public editData : any, private api: ApiService, private dialog :MatDialogRef<DialogComponent>){ }


  ngOnInit(): void {
   this.productForm = this.formbuilder.group({
    productName : ['',Validators.required],
    category : ['',Validators.required],
    freshness : ['',Validators.required],
    price : ['',Validators.required],
    comment : ['',Validators.required],
    date : ['',Validators.required],
   });

   if(this.editData){
    this.actionBtn = "update"
    this.productForm.controls['productName'].setValue(this.editData.productName);
    this.productForm.controls['category'].setValue(this.editData.category);
    this.productForm.controls['date'].setValue(this.editData.date);
    this.productForm.controls['freshness'].setValue(this.editData.freshness);
    this.productForm.controls['price'].setValue(this.editData.price);
    this.productForm.controls['comment'].setValue(this.editData.comment);
   }
  }

  addProduct(){
 if(!this.editData){
  if(this.productForm.valid){
    this.api.postProduct(this.productForm.value)
    .subscribe({
      next:(res)=>{
        alert('Product added succesfully')
        this.productForm.reset();
        this.dialog.close('Save');
      },
      error:()=>{
        alert("Error while adding the product")
      }   
    })
  }
 }else {
  this.updateProduct()
 }
 

 
  }
  updateProduct() {
    this.api.putProduct(this.productForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product updated succesfully")
        this.productForm.reset();
        this.dialog.close('Update');
      },
      error:()=>{
        alert('Error while updating the record')
      }
    })
  }
}
