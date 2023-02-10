import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppMaterialModule } from './app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LdapManagementModule } from "./ldap-management/ldap-management.module";
import { InMemoryUsersService } from './service/in-memory-users.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { LoginComponent } from './security/login/login.component';


@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        LoginComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        LdapManagementModule,
        LayoutModule,
        AppMaterialModule,
        AppRoutingModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
            InMemoryUsersService, {dataEncapsulation: false}
        )
    ],
})
export class AppModule { }
