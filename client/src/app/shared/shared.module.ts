import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from './pipes/TimeAgoPipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    TimeAgoPipe,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    TimeAgoPipe
  ],
  entryComponents: [ ConfirmDialogComponent ],
})
export class SharedModule { }
