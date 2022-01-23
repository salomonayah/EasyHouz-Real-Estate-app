import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openAddForm(): void {
    this.router.navigate(['/main/add-new-posts']);
  }

}
