import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
   selector: 'app-confirm',
    templateUrl: './confirm.component.html'
})
export class ConfirmComponent implements OnInit {

   @Input() message: string = '';
   @Output() ok_event = new EventEmitter<void>();

   constructor () {

   }

   ngOnInit () : void { 
      const modal = document.querySelector<HTMLElement>('#confirm-modal');
      if (modal) {
         console.log(modal);
         modal.style.display = 'block';
         modal.style.background = 'rgba(0, 0, 0, 0.75)';
         modal.classList.add('show');
      }
   }

   OnOkEvent () {
      this.ok_event.emit();
   }

   OnClose () {
      BaseComponent.confirm_message = '';
      const modal = document.querySelector<HTMLElement>('#confirm-modal');
      if (modal) {
         modal.classList.remove('show');
         modal.style.display = '';
         modal.style.background = '';
      }
   }

}