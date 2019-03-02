import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ModalModule, WavesModule, InputsModule, ButtonsModule } from 'angular-bootstrap-md'

@Component({
    selector: 'app-modal-window',
    templateUrl: './modal-window.component.html',
    styles: []
})
export class ModalWindowComponent implements OnInit {
    // constructor(public dialogRef: MatDialogRef<ModalWindowComponent>,
    //     @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    ngOnInit(): void { }
}
