import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {UserService} from './services/user.service';
import {User} from './enums/user';

type HttpResponse = {
  code: number
  data: string
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {


  constructor(private userService: UserService){
    const observable = new Observable<HttpResponse>(subscriber => {
      console.log("Inside observable ...");
      subscriber.next({ code: 200, data: "This is data 1 ..." });
      subscriber.next({ code: 200, data: "This is data 2 ..." });
      subscriber.next({ code: 200, data: "This is data 3 ..." });
      subscriber.error({ code: 404, message: "An error occurred" })
      setTimeout(() => {
        subscriber.next({ code: 200, data: "This is data more data ..." });
        subscriber.complete();
      }, 3 * 1000);
      console.log("subscriber is done emitting data");
    })

     observable.subscribe({
      next: (response: HttpResponse) => console.log("Got response: ", response),
      error: (error: Error) => console.log("Got something error occurred: ", error),
      complete: () => console.log("Completed")
     })

  }

  ngOnInit(): void {
    this.onGetUsers();
  }

  onGetUsers = () : void => {
    this.userService.getUsers().subscribe({
      next: (response: Array<User>) => console.log(response),
      error: (error: Error) => console.log(error),
      complete: () => console.log("Done getting users")
    });

  }

}
