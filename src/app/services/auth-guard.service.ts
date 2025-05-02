import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  token: any = '';
  adminData: any;
  isloggedin: boolean = false;
  userRole: string = ''; // Store the user's role (admin or student)

  constructor() {}

  decodeToken(token: string): string {
    var base64ToParse = atob(token);
    const jsonParse = JSON.parse(base64ToParse);
    return jsonParse;
  }

  // Extract token and decode it
  getToken() {
    try {
      const data: any = sessionStorage.getItem('raw');
      this.token = this.decodeToken(data);

      if (this.token) {
        this.isloggedin = true;
        // Assuming the role is part of the token (e.g., in a JWT token payload)
        this.userRole = this.token.ur; // Assign the role from the decoded token
      } else {
        console.warn('No data found in sessionStorage');
        this.isloggedin = false;
      }
    } catch (error) {
      this.isloggedin = false;
    }
  }

  // Check if the user is logged in
  checkLogin(): boolean {
    this.getToken();
    return this.isloggedin;
  }

  // Check if the user has admin role
  isAdmin(): boolean {
    return this.isloggedin && this.userRole === 'admin';
  }

  // Check if the user has student role
  isStudent(): boolean {
    return this.isloggedin && this.userRole === 'student';
  }

  // Update isAdmin to check for super admin
  isSuperAdmin(): boolean {
    return (
      this.isloggedin && this.userRole === 'admin' && this.token.adminid === 1
    );
  }

  // Add regular admin check
  isRegularAdmin(): boolean {
    return (
      this.isloggedin && this.userRole === 'admin' && this.token.adminid !== 1
    );
  }

  // Update canAccessAdmin to handle both types
  canAccessAdmin(): boolean {
    return this.isAdmin(); // Keep this for basic admin authentication
  }

  // Add new method for super admin access
  canAccessSuperAdmin(): boolean {
    return this.isSuperAdmin();
  }

  canAccessStudent(): boolean {
    return this.isStudent();
  }
}
