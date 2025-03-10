import React, { useState, useEffect } from 'react'
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
import axios from 'axios'

// Role-based actions

const moduleModuleAction = [
  {
    category: 'Role Management',
    actions: [
      { name: 'Create Role', key: 'create_role' },
      { name: 'View Roles', key: 'view_roles' },
      { name: 'Assign Role', key: 'assign_roles' },
      { name: 'view users & role', key: 'view_user_role' },
      { name: 'edit user role', key: 'edit_user_role' },
    ],
  },
  {
    category: 'Permission Management',
    actions: [
      { name: 'View permission table', key: 'view_permission_table' },
      { name: 'Change permission', key: 'change_permission' },
    ],
  },
  {
    category: 'Application Management',
    actions: [
      { name: 'View Application List', key: 'view_app_list' },
      { name: 'edit application', key: 'edit_application' },
    ],
  },
  {
    category: 'Edit Subscriber',
    actions: [
      { name: 'view subscriber list', key: 'view_sub_list' },
      { name: 'assign quarter/kindred', key: 'assign_quarter' },
    ],
  },
  {
    category: 'Town Management',
    actions: [
      { name: 'filter town list', key: 'filter_town_list' },
      { name: 'add town', key: 'add_town' },
      { name: 'edit town', key: 'edit_town' },
      { name: 'view town', key: 'view_town' },
    ],
  },
  {
    category: 'Quarter Management',
    actions: [
      { name: 'filter quarter', key: 'filter_quarter' },
      { name: 'create Quarter', key: 'create_quarter' },
      { name: 'Edit Quarter', key: 'edit_quarter' },
    ],
  },
  {
    category: 'Manage Kindred',
    actions: [
      { name: 'filter Kindred', key: 'filter_kindred' },
      { name: 'create Kindred', key: 'create_kindred' },
      { name: 'Edit Kindred', key: 'edit_kindred' },
    ],
  },
]

const AssignRolePermissions = () => {
  const [roles, setRoles] = useState([])
  const [assignedPermissions, setAssignedPermissions] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all roles
        const rolesResponse = await axios.get('http://localhost:4001/api/v1/accessRole/getAllRoles')
        setRoles(rolesResponse.data.data)

        // Fetch assigned permissions for all roles
        const permissionsResponse = await axios.get(
          'http://localhost:4001/api/v1/assignUserAccessRole/getDefinePermission',
        )
        const permissions = permissionsResponse.data.data

        console.log('permissions', permissions)
        // Convert array to object { roleId: { moduleName: { moduleId, actions: [actionKey1, actionKey2] } } }
        const mappedPermissions =
          permissions?.reduce((acc, curr) => {
            if (!acc[curr.roleId]) acc[curr.roleId] = {}
            if (!acc[curr.roleId][curr.moduleName]) {
              acc[curr.roleId][curr.moduleName] = { moduleId: curr.moduleId, actions: [] }
            }
            acc[curr.roleId][curr.moduleName].actions.push(curr.moduleActions)
            return acc
          }, {}) || {}

        console.log('mappedPermissions', mappedPermissions)
        setAssignedPermissions(mappedPermissions)
      } catch (error) {
        console.error('Error loading roles and permissions:', error)
      }
    }

    fetchData()
  }, [])

  const handleDeletePermission = async (moduleId) => {
    if (!moduleId) {
      console.warn('moduleId is undefined or invalid')
      return
    }
    try {
      const response = await axios.delete(
        `http://localhost:4001/api/v1/assignUserAccessRole/deletePermission/${moduleId}`,
      )
      if (response.data.success) {
        console.log('Permission deleted successfully!')
      } else {
        console.warn('Failed to delete permission.')
      }
    } catch (error) {
      console.error('Error deleting permission:', error)
    }
  }

  const handlePermissionChange = async (roleId, moduleName, actionKey, moduleId) => {
    setAssignedPermissions((prev) => {
      const updatedPermissions = JSON.parse(JSON.stringify(prev)) // Deep copy to avoid mutation

      if (!updatedPermissions[roleId]) updatedPermissions[roleId] = {}
      if (!updatedPermissions[roleId][moduleName]) {
        updatedPermissions[roleId][moduleName] = { moduleId, actions: [] }
      }

      const actionIndex = updatedPermissions[roleId][moduleName].actions.indexOf(actionKey)

      if (actionIndex > -1) {
        // Remove permission
        updatedPermissions[roleId][moduleName].actions.splice(actionIndex, 1)

        // If no actions left, delete the module from assignedPermissions
        if (updatedPermissions[roleId][moduleName].actions.length === 0) {
          const moduleIdToDelete = updatedPermissions[roleId][moduleName].moduleId
          delete updatedPermissions[roleId][moduleName]

          // Call handleDeletePermission after state is updated
          setTimeout(() => {
            handleDeletePermission(moduleIdToDelete)
          }, 0)
        }
      } else {
        // Add permission
        updatedPermissions[roleId][moduleName].actions.push(actionKey)
      }

      return updatedPermissions // Return the updated state
    })
  }

  const handleSavePermissions = async (roleId) => {
    try {
      if (!assignedPermissions[roleId]) {
        console.warn(`No permissions assigned for role: ${roleId}`)
        return
      }

      // Convert assignedPermissions into the required API format
      const formattedPermissions = Object.entries(assignedPermissions[roleId]).map(
        ([moduleName, { moduleId, actions }]) => ({
          roleId,
          moduleName,
          moduleId,
          moduleActions: actions,
        }),
      )

      console.log('Saving permissions:', formattedPermissions)

      // Send request to the backend
      const response = await axios.post(
        'http://localhost:4001/api/v1/assignUserAccessRole/definePermissions',
        formattedPermissions,
      )

      if (response.data.success) {
        alert('Permissions saved successfully!')
      } else {
        alert('Failed to save permissions.')
      }
    } catch (error) {
      console.error('Error saving permissions:', error)
      alert('An error occurred while saving permissions.')
    }
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
              <CTableHeaderCell>Action</CTableHeaderCell>
              {moduleModuleAction.map((category) => (
                <CTableHeaderCell key={category.category} colSpan={category.actions.length}>
                  {category.category}
                </CTableHeaderCell>
              ))}
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell></CTableHeaderCell>
              <CTableHeaderCell></CTableHeaderCell>
              {moduleModuleAction?.flatMap((category) =>
                category.actions.map((action) => (
                  <CTableHeaderCell key={action.key}>{action.name}</CTableHeaderCell>
                )),
              )}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {roles.map((role) => (
              <CTableRow key={role.roleId}>
                <CTableDataCell style={{ whiteSpace: 'nowrap' }}>{role.roleName}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="primary"
                    size="sm"
                    onClick={() => handleSavePermissions(role.roleId)}
                  >
                    Save
                  </CButton>
                </CTableDataCell>
                {moduleModuleAction?.flatMap((category) =>
                  category.actions.map((action) => (
                    <CTableDataCell key={action.key} className="text-center">
                      <CFormCheck
                        checked={
                          assignedPermissions[role.roleId]?.[category.category]?.actions.includes(
                            action.key,
                          ) || false
                        }
                        onChange={() =>
                          handlePermissionChange(
                            role.roleId,
                            category.category,
                            action.key,
                            category.moduleId,
                          )
                        }
                      />
                    </CTableDataCell>
                  )),
                )}
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default AssignRolePermissions
