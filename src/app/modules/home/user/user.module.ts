import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NbMenuModule} from '@nebular/theme';
import {SharedModule} from 'primeng/api';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {DropdownModule} from 'primeng/dropdown';
import {PaginatorModule} from 'primeng/paginator';
import {DialogModule} from 'primeng/dialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ChartModule} from 'primeng/chart';
import {UserListComponent} from './user-list/user-list.component';
import {UserDetailsComponent} from './user-details/user-details.component';
import {UserTitleComponent} from './user-title/user-title.component';
import {UserAddComponent} from './user-add/user-add.component';
import {ThemeModule} from '../../../@theme/theme.module';
import {PrimengModule} from '../../../shared/primeng.module';

const routes: Routes = [{
  path: '',
  component: UserListComponent,
}];

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    UserTitleComponent,
    UserAddComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    NbMenuModule,
    ReactiveFormsModule,
    PrimengModule,
    SharedModule,
    FormsModule,
    DropdownModule,
    PaginatorModule,
    DialogModule,
    InputTextareaModule,
    PrimengModule,
    ChartModule,
  ],
  exports: [],
})
export class UserModule {
}
