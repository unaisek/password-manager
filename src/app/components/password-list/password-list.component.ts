import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PasswordService } from 'src/app/services/password.service';

import { AES, enc } from 'crypto-js'
import { FormGroup, FormControl,Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent implements OnInit{
  siteId !: string;
  siteName !: string;
  siteUrl !: string;
  siteImgUrl !: string;

  email !: string;
  password !: string;
  passwordId !: string;

  formState: string = "Add New"

  passwordList!: Array<any>;

  showModal: boolean = false;

  passForm !:FormGroup

  constructor(
    private _route:ActivatedRoute,
    private _passwordService: PasswordService,
    private _toastr: ToastrService
    ) {
    
  }
  ngOnInit(): void {
    this._route.queryParams.subscribe((val:any)=>{
      this.siteId = val.id;
      this.siteName = val.siteName;
      this.siteUrl = val.siteUrl;
      this.siteImgUrl = val.siteImgUrl
    })

    this.passForm = new FormGroup({
      length: new FormControl(8, [Validators.required, Validators.min(3),Validators.max(20)]),
      uppercase: new FormControl(true),
      lowercase: new FormControl(true),
      numbers:new FormControl(true),
      symbols:new FormControl(true),
      password:new FormControl('')
    })

    this.loadPassword();
  }

  passwordSubmit(values: any){
    
    const encryptedPassword = this.encryptPassword(values.password)
    values.password = encryptedPassword
    

    if(this.formState =="Add New"){
      this._passwordService.addPasswords(values, this.siteId)
      .then(()=>{
        this._toastr.success("New Password Added")
      })
      .catch((err)=>{
        this._toastr.error("Adding Password Failed");
        console.log(err);
        
      })
    } else {
      this._passwordService.updatePassword(this.siteId, this.passwordId, values)
      .then(()=>{
        this._toastr.success("Password Updated");
        this.resetForm();
      })
      .catch((err)=>{
        this._toastr.error("Password Updating failed");
        console.log(err); 
      })
    }
  }

  resetForm(){
    this.email ='';
    this.password ='';
    this.passwordId = '';
    this.formState ="Add New"
  }

  loadPassword(){
    this._passwordService.loadPassword(this.siteId).subscribe({
      next:(val)=>{
        this.passwordList = val
      }
    });
  }

  editPassword(email:string, password:string, id:string){
    this.email = email;
    this.password = password;
    this.passwordId = id;
    this.formState = "Edit"
  }

  deletePassword(passwordId:string){
    this._passwordService.deletePassword(this.siteId, passwordId)
    .then(()=>{
      this._toastr.success("Password Deleted")
    })
    .catch((err)=>{
      this._toastr.error("Password deletion failed");
      console.log(err);
      
    })
  }

  encryptPassword(password : string){
    const secretKey = '53144F8949CFF3C2ADDF17317D712';
    const encryptedPassword = AES.encrypt(password,secretKey).toString();
    return encryptedPassword
  }

  decryptPassword(password: string){
    const secretKey = '53144F8949CFF3C2ADDF17317D712';
    const descyptedPassword = AES.decrypt(password, secretKey).toString(enc.Utf8);
    return descyptedPassword
  }

  onDecrypt(password: string, index: number){
    const decPassword = this.decryptPassword(password);
    this.passwordList[index].password = decPassword
  }

  openModal(){
    this.showModal = true
  }

  generatePass(){
    if(this.passForm.valid){
      const data = this.passForm.getRawValue();
      const { length, lowercase, uppercase, numbers, symbols } = data;
      this.passForm.get('password')?.setValue(this.generateRandomString(length, {lowercase, uppercase, numbers, symbols}))
    }
  }

  generateRandomString(length:number, options: any = { numbers: true, lowercase: true, uppercase: true, symbols: true}){
    let charSet = ""
    if(options.numbers) {
      charSet += "01234567890123456789"
    }
    if(options.uppercase){
      charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if(options.lowercase){
      charSet += "abcdefghijklmnopqrstuvwxuyz"
    }
    if(options.symbols){
      charSet += '!@#$%^&*()_+-=[]{};\':"\\|,<.>/?~';
    }
    if(!charSet.length){
      return 'Please Select At least One'
    }
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);

    return array.reduce((password, byte) => {
      const charIndex = byte % charSet.length;
      return password + charSet[charIndex]
    },"")
  }

  saveGeneratedPass(){
    console.log("save");
    
    if(this.passForm.get('password')?.value){
      console.log("hi");
      
      const generatedPass = this.passForm.get('password')?.value;
      this.password = generatedPass
      this.showModal = false
    }
  }

}
