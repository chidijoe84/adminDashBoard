import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormSelect,
  CRow,
  CCardFooter,
} from '@coreui/react'
import { Link } from 'react-router-dom'

const RoleManagement = () => {
  const [roles, setRoles] = useState([])
  const [roleName, setRoleName] = useState('')
  const [modalAssignVisible, setModalAssignVisible] = useState(false)
  const [modalEditVisible, setModalEditVisible] = useState(false)
  const [showUserRole, setShowUsersRole] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [selectedUser, setSelectedUser] = useState('')
  const [editRoleName, setEditRoleName] = useState('')

  const users = ['John Doe', 'Jane Smith', 'Alice Johnson'] // Example users

  // Create Role
  const addRole = () => {
    if (roleName.trim()) {
      const newRole = { id: roles.length + 1, name: roleName }
      console.log('Role Data to Send:', newRole)

      // Update the state to include the new role
      setRoles((prevRoles) => [...prevRoles, newRole])

      // Clear input field
      setRoleName('')
    }
  }

  // Open Assign Role Modal
  const openAssignModal = (role) => {
    setSelectedRole(role)
    setModalAssignVisible(true)
  }

  // Assign Role
  const assignRole = async () => {
    if (!selectedRole || !selectedUser) return

    const assignmentData = { roleId: selectedRole.id, userName: selectedUser }
    console.log('Assigning Role:', assignmentData)

    
      console.log('Role Assigned:', assignmentData)

      setModalAssignVisible(false)
      setSelectedUser('')
    
  }

  // Open Edit Role Modal
  const openEditModal = (role) => {
    setSelectedRole(role)
    setEditRoleName(role.name)
    setModalEditVisible(true)
  }

  // Edit Role
  const editRole = async () => {
    if (!selectedRole || !editRoleName.trim()) return

    const updatedRole = { name: editRoleName }
    console.log('Editing Role:', selectedRole.id, updatedRole)

    try {
      const response = await fetch(`/api/roles/${selectedRole.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRole),
      })
      const data = await response.json()
      console.log('Role Updated:', data)

      setRoles(
        roles.map((role) => (role.id === selectedRole.id ? { ...role, name: editRoleName } : role)),
      )
      setModalEditVisible(false)
    } catch (error) {
      console.error('Error updating role:', error)
    }
  }

  // Toggle between Roles and User Roles View
  const toggleRoleView = () => {
    setShowUsersRole(!showUserRole)
  }

  console.log('roles', roles)

  return (
    <div className="p-4">
      {/* Create Role */}
      <CCard>
        <CCardHeader>Create Role</CCardHeader>
        <CCardBody>
          <CRow>
            <CForm className="d-flex gap-2">
              <CFormInput
                type="text"
                placeholder="Enter role name"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
              />
              <CButton color="primary" onClick={addRole}>
                Add Role
              </CButton>
            </CForm>
          </CRow>
        </CCardBody>
      </CCard>

      {/* Toggle Roles & User Roles */}
      <div className="mt-4 d-flex justify-content-end">
        <CButton color="info" style={{ color: 'white' }} onClick={toggleRoleView}>
          {showUserRole ? 'View Roles' : 'Users and Roles'}
        </CButton>
      </div>

      {/* Users Role Table */}
      {showUserRole ? (
        <CCard className="mt-4">
          <CCardHeader>Users Role</CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Role Name</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {roles.map((role) => (
                  <CTableRow key={role.id}>
                    <CTableDataCell>{role.id}</CTableDataCell>
                    <CTableDataCell>{role.name}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="success"
                        style={{ color: 'white' }}
                        onClick={() => openAssignModal(role)}
                      >
                        Edit Role
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      ) : (
        <CCard className="mt-4">
          <CCardHeader>Roles</CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Role Name</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {roles.map((role) => (
                  <CTableRow key={role.id}>
                    <CTableDataCell>{role.id}</CTableDataCell>
                    <CTableDataCell>{role.name}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="success"
                        style={{ color: 'white' }}
                        onClick={() => openAssignModal(role)}
                      >
                        Assign Role
                      </CButton>
                     
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      )}

      {/* Assign Role Modal */}
      <CModal visible={modalAssignVisible} onClose={() => setModalAssignVisible(false)}>
        <CModalHeader>
          <CModalTitle>Assign Role</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormSelect value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
            <option>Select a user</option>
            {users.map((user, index) => (
              <option key={index} value={user}>
                {user}
              </option>
            ))}
          </CFormSelect>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalAssignVisible(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={assignRole}>
            Assign
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default RoleManagement
