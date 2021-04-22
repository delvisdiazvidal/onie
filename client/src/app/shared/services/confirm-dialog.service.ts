import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(private modalService: NgbModal) { }

  public confirm(message: string): Promise<boolean> {
    const title = 'Confirmación de Seguridad';
    const btnOkText = 'OK';
    const btnCancelText = 'Cancelar';
    const dialogSize: 'sm'|'md'|'lg' = 'md';
    const modalRef = this.modalService.open(ConfirmDialogComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    return modalRef.result;
  }



  public expired(day: number): Promise<boolean> {
    const title = 'Aviso de Seguridad';
    let message = '';
    if (day < 1) {
      message = ' Su contraseña ha expirado. Como medida de seguridad debería cambiarla cuanto antes.';
    }
    if (day === 1) {
      message = ' Su contraseña expirará en aproximadamente ' + day + ' día. Desea cambiarla ahora?';
    }
    if (day > 1){
      message = ' Su contraseña expirará en aproximadamente ' + day + ' días. Desea cambiarla ahora?';
    }
    const btnOkText = 'OK';
    const btnCancelText = 'Cancelar';
    const dialogSize: 'sm'|'lg' = 'lg';
    const modalRef = this.modalService.open(ConfirmDialogComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    return modalRef.result;
  }

/*   public confirm(
    title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancelar',
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmDialogComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    return modalRef.result;
  } */

}
