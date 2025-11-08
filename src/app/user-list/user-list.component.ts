import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../services/auth.service';
import { SafeUser } from '../models/user.model';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

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

  // Grid options
  gridOptions = {
    pagination: true,
    paginationPageSize: 10,
    domLayout: 'autoHeight' as const
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  /**
   * Load all users from auth service
   */
  loadUsers(): void {
    this.users = this.authService.getAllUsers();
  }

  /**
   * Handle grid ready event
   */
  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
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
   * Edit user functionality
   */
  editUser(userId: number, userData: SafeUser): void {
    // Create edit form with current values
    const newFullName = prompt('Edit Full Name:', userData.fullName);
    const newEmail = prompt('Edit Email:', userData.email);
    const newUsername = prompt('Edit Username:', userData.username);

    if (newFullName && newEmail && newUsername) {
      // In a real app, this would call an API
      console.log('Editing user:', {
        id: userId,
        fullName: newFullName,
        email: newEmail,
        username: newUsername
      });

      // Update local data (simulated)
      const index = this.users.findIndex(u => u.id === userId);
      if (index !== -1) {
        this.users[index] = {
          ...this.users[index],
          fullName: newFullName,
          email: newEmail,
          username: newUsername
        };
        
        // Refresh grid
        this.gridApi.setGridOption('rowData', this.users);
        
        alert(`User "${newFullName}" updated successfully!`);
      }
    }
  }

  /**
   * Delete user functionality
   */
  deleteUser(userId: number, userData: SafeUser): void {
    const confirmed = confirm(`Are you sure you want to delete user "${userData.fullName}"?`);
    
    if (confirmed) {
      // In a real app, this would call an API
      console.log('Deleting user:', userId);

      // Remove from local data (simulated)
      this.users = this.users.filter(u => u.id !== userId);
      
      // Refresh grid
      this.gridApi.setGridOption('rowData', this.users);
      
      alert(`User "${userData.fullName}" deleted successfully!`);
    }
  }

  /**
   * Quick filter (search) functionality
   */
  onQuickFilterChanged(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;
    this.gridApi.setGridOption('quickFilterText', searchValue);
  }
}
