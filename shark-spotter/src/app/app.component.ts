import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private router: Router, private service: LoginService) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.service.isLoggedIn();
      });
  }

  async checkLoginStatus() {
    const userSession = await this.service.isLoggedIn();

    console.log('User session:', userSession);
    // optionally redirect if not logged in
    if (userSession.username == '' || userSession.status == 'error') {
      this.router.navigate(['/login']);
    }
  }

}
