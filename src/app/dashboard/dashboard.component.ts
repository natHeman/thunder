import { Component, TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService) {}


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
