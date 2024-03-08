import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environment/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SiteListComponent } from './components/site-list/site-list.component';
import { PasswordListComponent } from './components/password-list/password-list.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PasswordGeneratorComponent } from './components/password-generator/password-generator.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SiteListComponent,
    PasswordListComponent,
    LoginComponent,
    PasswordGeneratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(()=> getFirestore() ),
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    DialogModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
