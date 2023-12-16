import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  tabs = [
    { title: 'Dashboard', icon: 'bi bi-columns-gap', route: 'dashboard' },
    { title: 'Projects', icon: 'bi bi-folder2', route: 'projects' },
    { title: 'Tasks', icon: 'bi-list-check', route: 'tasks' },
    { title: 'Calendar', icon: 'bi bi-calendar-check', route: 'calendar' },
  ];

  loggingout = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public translate: TranslateService
  ) {
    translate.use('en');
  }

  ngOnInit(): void {}

  logout() {
    this.loggingout = true;
    this.authService.logout().subscribe((res) => {
      this.router.navigate(['auth']);
    });
  }

  changeLanguage(currentLang: string) {
    currentLang === 'en' ? this.translate.use('ar') : this.translate.use('en');
  }
}
