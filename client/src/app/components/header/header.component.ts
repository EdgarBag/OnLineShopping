import { Component, OnInit } from '@angular/core';
import { GeneralInformation } from 'src/app/services/generalInformation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  public user: string;
  public onLine: number;

  public constructor(private generalInformation: GeneralInformation,
    public router: Router) { }


  public ngOnInit() {

    this.getNameForGreeting();

    this.getCurrentUser();

  }
  //func to getting name for greetings
  public getNameForGreeting() {
    const userLS = this.generalInformation.getUserFromls();
    if (!userLS) {
      this.user = 'Guest. Please Log in!';
      this.onLine = 0;
    }
    else {
      if (userLS.typeOfUser.length > 10) {
        this.user = userLS.userFirstName + " ,you have admin permissions.\nYou can add and update products."
      } else {
        this.user = userLS.userFirstName;
      }
      this.onLine = 1;
    }
  }

  //logout function
  public logOut() {
    sessionStorage.clear();
    localStorage.clear();
    this.getNameForGreeting();
    this.generalInformation.getCurrentUser(undefined);
    this.router.navigate(['/login']);
  }

  //Listener func. for updates of client
  public getCurrentUser(): void {
    this.generalInformation.newUserSubject.subscribe(
      data => {
        this.user = data;
        this.getNameForGreeting();
      }, err => console.log(err.error)
    )
  }

}
