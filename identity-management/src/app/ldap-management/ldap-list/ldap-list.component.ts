import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserLdap } from '../../model/user-ldap'
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { UsersService } from '../../service/users.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-ldap-list',
  templateUrl: './ldap-list.component.html',
  styleUrls: ['./ldap-list.component.scss']
})
export class LdapListComponent implements OnInit,AfterViewInit {

  displayedColumns :string[] = ['nomComplet', 'mail','employeNumero'];
  dataSource = new MatTableDataSource<UserLdap>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getUsers();
  }

  ngAfterViewInit() {
    console.log("Mat Paginator:", this.paginator) ;
  }

  filterPredicate(data, filter): boolean{
    return !filter || data.nomComplet.toLowerCase().startsWith(filter);
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

 

  unactiveSelected =false;
  private getUsers(): void {
    this.usersService.getUsers().subscribe(
      users => {
        if (this.unactiveSelected) {
          this.dataSource.data = users.filter( user => 
            user.active === false
          );
        } else {
          this.dataSource.data = users
        }
      });
  }   

  unactiveChanged($event: MatSlideToggleChange): void{
    this.unactiveSelected = $event.checked;
    this.getUsers();
  }
  
  edit(login: string) {
    this.router.navigate(['/user', login]).then ( (e) => {
      if (! e) {
        console.log("Navigation has failed!");
      }
    });
  }

  addUser() {
    this.router.navigate(['/user/add']).then( (e) => {
      if (! e) {
        console.log('Navigation has failed!');
      }
    });
  }

  deleteUser(id: number) {
    this.router.navigate(['/user', id]).then( (e) => {
      if (! e) {
        console.log('Navigation has failed!');
      }
    });
  }
}
