import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  show(message: string){
    this.toastr.show(message);
  }

  showSuccess(message: string){
    this.toastr.success(message);
  }

  showError(message: string){
    this.toastr.error(message);
  }

  showWarning(message: string){
    this.toastr.warning(message);
  }

  showInfo(message: string){
    this.toastr.info(message);
  }

  showRedirecct(error: string, info: string) {
    this.toastr.error(error, null, {
      timeOut: 1000
    })
      .onHidden
      .subscribe(() => this.toastr.info(info));
  }

  showSigUpInfo(success: string, info: string) {
    this.toastr.success(success, null, {
      timeOut: 1000
    })
      .onHidden
      .subscribe(() => this.toastr.info(info));
  }


}

