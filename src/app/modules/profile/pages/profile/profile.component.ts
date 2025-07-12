import { Component, OnInit } from '@angular/core';
import { ProfileResponse } from '../../../../services/models';
import { ProfileControllerService } from '../../../../services/services';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  profile!: ProfileResponse;
  isLoading = true;
  error: string | null = null;
  

  constructor(private profileService: ProfileControllerService){}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load profile';
        this.isLoading = false;
      }
    });
  }

}
