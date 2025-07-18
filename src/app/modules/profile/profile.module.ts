import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';
import { MainComponent } from './pages/main/main.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';


@NgModule({
  declarations: [
    MainComponent,
    ProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
