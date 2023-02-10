import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from '../../service/users.service';
import { UserLdap } from '../../model/user-ldap';
import { FormBuilder } from '@angular/forms';
import { ConfirmValidParentMatcher, passwordValidator } from './passwords-validator.directive';
import { InMemoryUsersService } from 'src/app/service/in-memory-users.service';
import { LDAP_USERS } from 'src/app/model/ldap-mock-data';


export abstract class LdapDetailComponent {
 
  user: UserLdap;
  routeId: ActivatedRoute;
  processLoadRunning = false;
  processValidateRunning = false;
  passwordPlaceHolder: string;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  memoryUsersService = new InMemoryUsersService();
  errorMessage= '';

  userForm = this.fb.group({
    login: [''],
    nom: [''],
    prenom: [''],
    employeNumero: [],
    employeNiveau: [],
    dateEmbauche: [''],
    publisherId: [],
    active: [],
    passwordGroup: this.fb.group({
      password: [''],
      confirmPassword: ['']
    }, { validators: passwordValidator}),
    mail: {value: '', disabled: true},
  });
  

  protected constructor(
    public addForm: boolean,
    private fb: FormBuilder,
    private router: Router,
    ) { 
      this.passwordPlaceHolder = 'Mot de passe' + (this.addForm ? '' : ' (vide si inchangé)');
    }

  protected OnInit(): void {
    //this.getUser();
  }

  private formGetValue(name: string): any { 
    return this.userForm.get(name).value; 
   }
  goToLdap() :void {
    this.router.navigate(['/users/list']);
  }

  abstract validateForm(): void;

  onSubmitForm(): void {
    this.validateForm();
  }

  updateLogin(): void {
    if (this.addForm) {
      this.userForm.get('login').setValue((this.formGetValue('prenom')
      + '.' + this.formGetValue('nom')).toLowerCase());
      this.updateMail();
    }
  }

  updateMail(): void {
    if (this.addForm) {
      this.userForm.get('mail').setValue(this.formGetValue('login').toLowerCase()
      + '@domain.com');
    }
  }

  protected copyUserToFormControl(): void {
    this.userForm.get('login').setValue(this.user.login);
    this.userForm.get('nom').setValue(this.user.nom);
    this.userForm.get('prenom').setValue(this.user.prenom);
    this.userForm.get('mail').setValue(this.user.mail);
    //this.userForm.get('employeNumero').setValue(this.user.employeNumero);
    //this.userForm.get('employeNiveau').setValue(this.user.employeNiveau);
    //this.userForm.get('dateEmbauche').setValue(this.user.dateEmbauche);
    //this.userForm.get('publisherId').setValue(this.user.publisherId);
    //this.userForm.get('active').setValue(this.user.active);
  }

  protected getUserFromFormControl(): UserLdap {
    
    if(this.userForm)
    {
      return {
        id : this.memoryUsersService.genId(LDAP_USERS),
        login: this.userForm.get('login').value,
        nom: this.userForm.get('nom').value,
        prenom: this.userForm.get('prenom').value,
        nomComplet: this.userForm.get('nom').value + ' ' + this.userForm.get('prenom').value,
        mail: this.userForm.get('mail').value,
  
        employeNumero: 1,
        employeNiveau: 1,
        dateEmbauche: '2020-04-24',
        publisherId: 1,
        active: true,
        motDePasse: '',
        role: 'ROLE_USER'
    }
    }
    else
    {
      return {
      id : this.userForm.get('id').value,
      login: this.userForm.get('login').value,
      nom: this.userForm.get('nom').value,
      prenom: this.userForm.get('prenom').value,
      nomComplet: this.userForm.get('nom').value + ' ' + this.userForm.get('prenom').value,
      mail: this.userForm.get('mail').value,

      employeNumero: 1,
      employeNiveau: 1,
      dateEmbauche: '2020-04-24',
      publisherId: 1,
      active: true,
      motDePasse: '',
      role: 'ROLE_USER'
      };
      
    }
  }

  isFormValid(): boolean { 
    return this.userForm.valid
    
    && (!this.addForm || this.formGetValue('passwordGroup.password') !== '');
  }

}



  

  



