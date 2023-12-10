import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SharedModule } from '../shared/shared.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { CalenderComponent } from './calender/calender.component';
import { HeaderComponent } from './header/header.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LayoutComponent,
    SideNavComponent,
    TasksComponent,
    DashboardComponent,
    ProjectsComponent,
    CalenderComponent,
    HeaderComponent,
    TaskCardComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
  ],
})
export class LayoutModule {}
