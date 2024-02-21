import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { BranchService } from '../../../services/branch.service';
import { UseroleService } from '../../../services/userole.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {

  ChiNhanh: any[] =[];
  Role: any[] = [];

  userId: string | null;
  user: any;

  constructor(private route: ActivatedRoute,  private userService: UserService,
    private userRoleService : UseroleService, private branchService: BranchService ) {
    this.userId = null;

  }

  ngOnInit(): void {
    this.branchService.getListBranch().subscribe({
      next: (data: any) => {
        this.ChiNhanh = data;
      },
      error: (error: any) => {
        console.error('Error fetching chinhnhanhdata:', error);
      }
    });
     this.userRoleService.getListRole().subscribe({
      next: (data: any) => {
        this.Role = data;
      },
      error: (error: any) => {
        console.error('Error fetching role:', error);
      }
    });



    this.userId = this.route.snapshot.paramMap.get('id')!;

    this.getUserDetail(this.userId);
  }

  getUserDetail(id: string): void {
    this.userService.getUserById(id).subscribe((data: any) => {
      this.user = data;
    });
  }
}
