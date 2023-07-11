import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {UserService} from './services/user.service';
import {User} from './enums/user';
import {HttpEventType} from '@angular/common/http';

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
  private user: User = {
    'id': 12,
    'name': 'Leanne Graham',
    'username': 'junior',
    'email': 'grahjunior@gmail.com',
    'address': {
      'street': 'Kulas Light',
      'suite': 'Apt. 556',
      'city': 'Gwenborough',
      'zipcode': '924788-3874',
      'geo': {
        'lat': '-37.3159',
        'lng': '81.1496'
      }
    },
    'phone': '1-770-736-8031 x56442',
    'website': 'hildegard.org',
    'company': {
      'name': 'Zakke-More',
      'catchPhrase': 'Multi-layered client-server neural-net',
      'bs': 'harness real-time e-markets'
    }
  }

  fileStatus = { status: '', percentage: 0 };


  constructor(private userService: UserService){
    const observable = new Observable<HttpResponse>(subscriber => {
      console.log('Inside observable ...');
      subscriber.next({ code: 200, data: 'This is data 1 ...' });
      subscriber.next({ code: 200, data: 'This is data 2 ...' });
      subscriber.next({ code: 200, data: 'This is data 3 ...' });
      subscriber.error({ code: 404, message: 'An error occurred' })
      setTimeout(() => {
        subscriber.next({ code: 200, data: 'This is data more data ...' });
        subscriber.complete();
      }, 3 * 1000);
      console.log('subscriber is done emitting data');
    })

     observable.subscribe({
      next: (response: HttpResponse) => console.log('Got response: ', response),
      error: (error: Error) => console.log('Got something error occurred: ', error),
      complete: () => console.log('Completed')
     })
  }

  ngOnInit(): void {
    this.onGetUsers();
    this.onCreateUser();
  }

  onGetUsers = () : void => {
    this.userService.getUsers().subscribe({
      next: (response: Array<User>) => console.table(response),
      error: (error: Error) => console.log(error),
      complete: () => console.log('Done getting users')
    });
  }

  onCreateUser = () : void => {
    this.userService.createUser(this.user).subscribe({
      next: (response: User) => console.log(response),
      error: (error: Error) => console.log(error),
      complete: () => console.log('Done getting users')
    });
  }

  onUpdateUser = () : void => {
    this.userService.updateUser(this.user).subscribe({
      next: (response: User) => console.log(response),
      error: (error: Error) => console.log(error),
      complete: () => console.log('Done getting users')
    });
  }

  onPatchUser = () : void => {
    this.userService.patchUser(this.user).subscribe({
      next: (response: User) => console.log(response),
      error: (error: Error) => console.log(error),
      complete: () => console.log('Done getting users')
    });
  }

  onDeleteUser = () : void => {
    this.userService.deleteUser(this.user.id).subscribe({
      next: (response: unknown) => console.log(response),
      error: (error: Error) => console.log(error),
      complete: () => console.log('Done getting users')
    });
  }


  onTextFile = () : void => {
    this.userService.getTextFile().subscribe({
      next: (response: unknown) => console.log(response),
      error: (error: Error) => console.log(error),
      complete: () => console.log('Done getting users')
    });
  }


  onUploadFile = (files: File[]) : void => {
    console.log(files);
    const formData = new FormData();
    for(const file in files) {
      // formData.append('files', file , file.name);
    }

    this.userService.uploadFiles(formData).subscribe({
      next: (event) => {
        switch(event.type) {
          case HttpEventType.UploadProgress || HttpEventType.DownloadProgress:
            this.fileStatus.percentage = Math.round(100 * event.loaded / event.total);
            this.fileStatus.status = 'progress';
            console.log(this.fileStatus);
            break;
          case HttpEventType.Response:
            if(event.status === 200) {
              this.fileStatus.percentage = 0;
              this.fileStatus.status = 'success';
              console.log(event);
              console.log(this.fileStatus);
              break;
            }
            break;
        }
      },
      error: (error: Error) => console.log(error),
      complete: () => console.log('Done getting users')
    });
  }

}
