import { Component, OnInit } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css'],
})
export class SiteListComponent implements OnInit {
  allsites!: Observable<Array<any>>;
  siteName!: string;
  siteurl!: string;
  siteImgUrl!: string;
  siteId !:string

  formState:string ="Add New"

  constructor(
    private _passwordService: PasswordService,
    private _toastr:ToastrService
    ) {}

  ngOnInit(): void {
    this.loadSites();
  }

  siteSubmit(values: object) {
    if(this.formState == "Add New"){
       this._passwordService
         .addSite(values)
         .then(() => {
           console.log('Data Save Successfully');
           this._toastr.success("Site Added")
         })
         .catch((err) => {
           console.log(err);
         });
    } else {
      this._passwordService.updateSite(this.siteId,values)
      .then(()=>{
        this._toastr.success('Site Updated Sucessfully');
        console.log("Site Updated Sucessfully");

      })
      .catch((err)=>{
        console.log(err);
        
      })
    }
   
  }

  loadSites() {
    this.allsites = this._passwordService.loadSites();
  }

  editSite(siteName: string, siteUrl: string, siteImgUrl: string, id: string) {
    this.siteName = siteName;
    this.siteurl = siteUrl;
    this.siteImgUrl = siteImgUrl;
    this.siteId = id;
    this.formState = "Edit"

  }

  deleteSite(id:string){
    this._passwordService.deleteSite(id)
    .then(()=>{
      console.log("delete Successfully");
      this._toastr.success("Site Deleted")
      
    })
  }
}
