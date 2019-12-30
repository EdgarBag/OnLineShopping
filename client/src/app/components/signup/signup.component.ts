import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { GeneralInformation } from 'src/app/services/generalInformation';
import { City } from 'src/app/models/city';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public user = new User();
  public cities: City[];

  public constructor(private usersService: UsersService,
    private generalInformation: GeneralInformation,
    private router: Router,
    title: Title) { title.setTitle("SignUp | Online Shopping") }


  public ngOnInit(): void {

    this.generalInformation
      .getAllCities()
      .then(cities => this.cities = cities)
      .catch(err => alert(err));
  }

  //func to add new customer to Db and to session storage
  public addnewUser(): void {
    this.usersService.addUser(this.user)
      .subscribe(
        response => {
          alert("You have successfully refistered on our website");
          sessionStorage.setItem('user', JSON.stringify(response.userToAdd));
          sessionStorage.setItem('token', response.token);
          this.onItemSubmit(response.userToAdd);
          this.router.navigate(['/login']);
        }, err => {
          alert("Please fix the following error(s):\n " + err.error);
        }
      )
  }

  //func to send updates of new customer
  public onItemSubmit(data): void {
    this.generalInformation.getCurrentUser(data);
  };

}
