import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormCheck,
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CTableHeaderCell,
  CCardFooter,
  CRow,
  CCol,
} from '@coreui/react'
import { Link } from 'react-router-dom'

// Role-based actions
const permissionsList = [
  {
    category: 'Dashboard',
    actions: [{ name: 'Access Dashboard', key: 'access_dashboard' }],
  },
  {
    category: 'Post Content',
    actions: [
      { name: 'View Content List (Default)', key: 'view_content_list' },
      { name: 'Post Content', key: 'post_content' },
    ],
  },
  {
    category: 'Subscribers List',
    actions: [
      { name: 'Search for Subscriber', key: 'search_subscriber' },
      { name: 'View Subscribers List', key: 'view_subscriber_list' },
      { name: 'Perform Actions', key: 'perform_subscriber_actions' },
      { name: 'Send Message', key: 'send_subscriber_message' },
      { name: 'Update Status', key: 'update_subscriber_status' },
      { name: 'Update Level', key: 'update_subscriber_level' },
    ],
  },
  {
    category: 'Application Control',
    actions: [
      { name: 'Add New Application', key: 'add_application' },
      { name: 'App Restriction', key: 'app_restriction' },
    ],
  },
  {
    category: 'User-Data',
    actions: [
      { name: 'Upload Data', key: 'upload_data' },
      { name: 'View Village Info', key: 'view_village_info' },
      { name: 'Add New Village', key: 'add_village' },
      { name: 'Edit Village Info', key: 'edit_village_info' },
    ],
  },
  {
    category: 'Admin',
    actions: [
      { name: 'Create Role', key: 'create_role' },
      { name: 'View Roles (Default for Create Role)', key: 'view_roles' },
      { name: 'Define Permissions', key: 'define_permissions' },
    ],
  },
]

// Sample role data
const rolesData = [
  { id: 1, name: 'Admin', permissions: ['view_roles', 'create_role', 'define_permissions'] },
  { id: 2, name: 'Manager', permissions: ['view_subscriber_list', 'search_subscriber'] },
  { id: 3, name: 'Employee', permissions: ['view_content_list'] },
]

const AssignRolePermissions = () => {
  const [roles, setRoles] = useState(rolesData)

  // Handle permission toggle
  const handlePermissionChange = (roleId, permissionKey) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) => {
        if (role.id === roleId) {
          let updatedPermissions = role.permissions.includes(permissionKey)
            ? role.permissions.filter((p) => p !== permissionKey) // Remove permission
            : [...role.permissions, permissionKey] // Add permission

          // Ensure "View Roles" is granted if "Create Role" is selected
          if (permissionKey === 'create_role' && !updatedPermissions.includes('view_roles')) {
            updatedPermissions.push('view_roles')
          }

          // Prevent "View Roles" from being removed if "Create Role" is active
          if (permissionKey === 'view_roles' && role.permissions.includes('create_role')) {
            return role // Do nothing
          }

          return { ...role, permissions: updatedPermissions }
        }
        return role
      }),
    )
  }

  // Save permissions (mocked, replace with API call)
  const handleSave = () => {
    console.log('Updated Roles:', roles)
    // Send `roles` to backend API
  }

  return (
    <CCard>
      <CCardHeader>
        <h5>Assign Role Permissions</h5>
      </CCardHeader>
      <CCardBody>
        <CTable bordered responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Role</CTableHeaderCell>
              {permissionsList.map((category) => (
                <CTableHeaderCell key={category.category} colSpan={category.actions.length}>
                  {category.category}
                </CTableHeaderCell>
              ))}
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell></CTableHeaderCell>
              {permissionsList.flatMap((category) =>
                category.actions.map((action) => (
                  <CTableHeaderCell key={action.key}>{action.name}</CTableHeaderCell>
                )),
              )}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {roles.map((role) => (
              <CTableRow key={role.id}>
                <CTableDataCell>{role.name}</CTableDataCell>
                {permissionsList.flatMap((category) =>
                  category.actions.map((action) => (
                    <CTableDataCell key={action.key} className="text-center">
                      <CFormCheck
                        checked={role.permissions.includes(action.key)}
                        onChange={() => handlePermissionChange(role.id, action.key)}
                      />
                    </CTableDataCell>
                  )),
                )}
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        <CCardFooter>
          <CCol xs={12}>
            <Link to="/user-access/access">
              <CButton color="secondary">Back</CButton>
            </Link>
            <CButton color="primary" onClick={handleSave}>
              Save Changes
            </CButton>
          </CCol>
        </CCardFooter>
      </CCardBody>
    </CCard>
  )
}

export default AssignRolePermissions
