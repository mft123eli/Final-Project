import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditComponent } from './edit.component';
import { ListComponent } from './list.component';
import { OneproductComponent } from './oneproduct.component';

@NgModule({
  declarations: [
    AddComponent,
    EditComponent,
    ListComponent,
    OneproductComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'add',
        component: AddComponent,
      },

      {
        path: 'edit/:_id',
        component: EditComponent,
      },
    ]),
  ],
})
export class AdminModule {}
