import { NgModule } from '@angular/core';

import { MatSnackBarModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [MatSnackBarModule, MatButtonModule],
  exports: [MatSnackBarModule, MatButtonModule]
})
export class MaterialModule {}
