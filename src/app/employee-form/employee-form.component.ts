import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  
    Cliked:boolean = false;

    EmployeeForm = new FormGroup({

      empName: new FormControl('',[Validators.required, Validators.minLength(5)]),
      phoneNumber: new FormControl( 0,[Validators.required,Validators.required,Validators.maxLength(10)],),
      dateOfBirth: new FormControl(),
      gender: new FormControl(),
      Email:new FormControl(),
      password:new FormControl(),
      address:new FormControl(),

        bankDetails: new FormGroup({
          
          acHolderName:new FormControl(''),
          acNumber:new FormControl(''),
          bankName:new FormControl(''),
          bankIdCode:new FormControl(''),
          bankLocation:new FormControl(''),
          taxId:new FormControl(''),
      })

    });


    submitCliked(){
      this.Cliked = true;
    }


    
    onSubmit(){
      //values from each filed from employee form
      if(this.EmployeeForm.valid){
        let employeeFormData = this.EmployeeForm.value;
        //console.log("Employee Data: ",employeeFormData);
        this.saveLocalStorage(employeeFormData);
      }
      else{
        alert("Invalid Inputs")
      }
    }


    //Storing all data in Local Storage
    saveLocalStorage(data: any){
      localStorage.setItem("EmployeeFormData",JSON.stringify(data));                                                                                                                                                                                                                                                                                                                                                                                                        
    }

    
}
