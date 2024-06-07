import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFormComponent } from './employee-form.component';
import { ReactiveFormsModule } from '@angular/forms';


describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeFormComponent,ReactiveFormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // checking employee name should be of type string 
  it('should employee name is type of string',()=>{
    let empName = component.EmployeeForm.get('empName');
    empName?.setValue('Abhishek');
    expect(typeof empName?.value).toBe('string');
  })

  //checking phone number of type number 
  it('should phone number type of num',()=>{
    let phoneNum = component.EmployeeForm.get('phoneNumber');
    phoneNum?.setValue(8767977069);
    expect(typeof phoneNum?.value).toBe('number');
  })

  //Phone number should be of length 10
  it('should be phone number only 10 digits',()=>{
    let phoneNum = component.EmployeeForm.get('phoneNumber');
    phoneNum?.setValue(8767977069)
    const phString = phoneNum?.value?.toString();
    expect(phString?.length).toEqual(10);
  })

  //Submit button should be cliked
  it('should be click submit button',()=>{
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.Cliked).toBe(true)
  })

  // On Submit button cliked call function submitCliked() submitCliked() 
  it('should be call submitCliked() method on Btn clicked',()=>{
    spyOn(component,'submitCliked')
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.submitCliked).toHaveBeenCalled()
  })

  //Not storing data in localStorage when Invalid Inputs
  it('should not save data when form is invalid', () => {
    spyOn(component, 'saveLocalStorage');
    const formValue = { empName: 'John',phoneNumber:12121212122122,dateOfBirth: '1990-01-01', gender: 'male', Email: 'john@example.com', password: 'password', address: '123 Main St', bankDetails: { acHolderName: 'John Doe', acNumber: '123456789', bankName: 'Bank of Angular', bankIdCode: 'BOA123', bankLocation: 'New York', taxId: 'TAX123456' }};
    component.EmployeeForm.setValue(formValue);
    component.onSubmit();
    expect(component.saveLocalStorage).not.toHaveBeenCalled();
  });

   //storing data in localStorage when Valid Inputs
   it('should SAVE data when form is Valid', () => {
    spyOn(component, 'saveLocalStorage');
    const formValue = { empName: 'John',phoneNumber:8767977069,dateOfBirth: '1990-01-01', gender: 'male', Email: 'john@example.com', password: 'password', address: '123 Main St', bankDetails: { acHolderName: 'John Doe', acNumber: '123456789', bankName: 'Bank of Angular', bankIdCode: 'BOA123', bankLocation: 'New York', taxId: 'TAX123456' }};
    component.EmployeeForm.setValue(formValue);
    component.onSubmit();
    expect(component.saveLocalStorage).not.toHaveBeenCalled();
  });

  // loading data from function to localStorage
  it('should get data from employeeFormData and store it to localStorage',()=>{
    
    const formData = {
      empName: 'John',
      phoneNumber: '1234567890',
      dateOfBirth: '1990-01-01',
      gender: 'male',
      Email: 'john@example.com',
      password: 'password',
      address: '123 Main St',
      bankDetails: {
        acHolderName: 'John Doe',
        acNumber: '123456789',
        bankName: 'Bank of Angular',
        bankIdCode: 'BOA123',
        bankLocation: 'New York',
        taxId: 'TAX123456'
      }
    };
    component.saveLocalStorage(formData);

    //retriving stored data from LocalStorage
    const storedData = JSON.parse(localStorage.getItem('EmployeeFormData') || '{}');
    expect(storedData).toEqual(formData)

  })
});
