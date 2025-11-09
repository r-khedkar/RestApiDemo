import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { SafeUser } from '../../models/user.model';
import { MOCK_USERS } from '../../constants/user.constants';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent, themeQuartz } from 'ag-grid-community';

/**
 * User list component displaying all registered users in AG Grid with edit/delete functionality
 */
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, NavbarComponent, AgGridAngular],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: SafeUser[] = [];
  private gridApi!: GridApi;

  // AG Grid theme
  theme = themeQuartz;

  // AG Grid column definitions
  columnDefs: ColDef[] = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 80,
      sortable: true,
      filter: true
    },
    { 
      field: 'fullName', 
      headerName: 'Full Name', 
      flex: 1,
      sortable: true,
      filter: true
    },
    { 
      field: 'username', 
      headerName: 'Username', 
      flex: 1,
      sortable: true,
      filter: true
    },
    { 
      field: 'email', 
      headerName: 'Email', 
      flex: 1.5,
      sortable: true,
      filter: true
    },
    { 
      field: 'createdAt', 
      headerName: 'Created At', 
      flex: 1,
      sortable: true,
      filter: 'agDateColumnFilter',
      valueFormatter: (params) => {
        if (!params.value) return '-';
        return new Date(params.value).toLocaleDateString();
      }
    },
    { 
      field: 'lastLogin', 
      headerName: 'Last Login', 
      flex: 1,
      sortable: true,
      filter: 'agDateColumnFilter',
      valueFormatter: (params) => {
        if (!params.value) return 'Never';
        return new Date(params.value).toLocaleString();
      }
    },
    {
      headerName: 'Actions',
      width: 180,
      pinned: 'right',
      cellRenderer: (params: any) => {
        return `
          <div style="display: flex; gap: 8px; align-items: center; height: 100%;">
            <button class="btn btn-sm btn-primary edit-btn" data-action="edit" data-id="${params.data.id}">
              <i class="bi bi-pencil"></i> Edit
            </button>
            <button class="btn btn-sm btn-danger delete-btn" data-action="delete" data-id="${params.data.id}">
              <i class="bi bi-trash"></i> Delete
            </button>
          </div>
        `;
      }
    }
  ];

  // AG Grid default column definitions
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  /**
   * Load all users from auth service
   */
  loadUsers(): void {
    // Get users from auth service
    this.users = this.authService.getAllUsers();
    
    // If no users from service, use constants directly
    if (!this.users || this.users.length === 0) {
      this.users = MOCK_USERS.map(({ password, ...user }) => user);
    }
  }

  /**
   * Handle grid ready event
   */
  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
  }

  /**
   * Handle cell click for action buttons
   */
  onCellClicked(event: any): void {
    if (event.event.target.dataset.action) {
      const action = event.event.target.dataset.action;
      const userId = parseInt(event.event.target.dataset.id);
      
      if (action === 'edit') {
        this.editUser(userId, event.data);
      } else if (action === 'delete') {
        this.deleteUser(userId, event.data);
      }
    }
  }

  /**
   * Edit user functionality - Navigate to edit page
   */
  editUser(userId: number, userData: SafeUser): void {
    this.router.navigate(['/user-edit', userId]);
  }

  /**
   * Delete user functionality - Navigate to delete page
   */
  deleteUser(userId: number, userData: SafeUser): void {
    this.router.navigate(['/user-delete', userId]);
  }

  /**
   * Quick filter (search) functionality
   */
  onQuickFilterChanged(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;
    if (this.gridApi) {
      this.gridApi.setGridOption('quickFilterText', searchValue);
    }
  }
}
