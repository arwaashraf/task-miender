import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [],
  imports: [PaginationModule.forRoot(), ModalModule.forRoot()],
  exports: [PaginationModule, ModalModule],
})
export class BootstrapModule {}
