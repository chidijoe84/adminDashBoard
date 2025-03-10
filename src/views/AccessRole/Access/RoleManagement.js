import React, { useEffect, useState } from 'react'
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
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const RoleManagement = () => {
  const [roles, setRoles] = useState([])
  const [roleName, setRoleName] = useState('')
  const [userList, setUsersList] = useState('')
  const [modalAssignVisible, setModalAssignVisible] = useState(false)
  const [modalEditVisible, setModalEditVisible] = useState(false)
  const [showUserRole, setShowUsersRole] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [selectedUser, setSelectedUser] = useState('')
  const [editRoleName, setEditRoleName] = useState('')
  const [subscribers, setSubscribers] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [usersWithRole, setUsersWithRole] = useState([])
  const [selectedUserRole, setSelectedUserRole] = useState(null)

  const fetchSubscribers = async () => {
    if (!isLoaded) {
      try {
        const response = await axios.get(
          'http://localhost:4001/api/v1/createSubscriber/listSubscribers',
        )
        console.log('response', response)
        setSubscribers(response.data.data)
        setIsLoaded(true)
      } catch (error) {
        console.error('Error fetching subscribers:', error)
      }
    }
  }

  // Create Role
  const addRole = async () => {
    if (roleName.trim()) {
      try {
        const roleData = {
          roleName: roleName,
          createdBy: 'admin_user',
        }

        console.log('Role Data to Send:', roleData)

        const response = await axios.post(
          'http://localhost:4001/api/v1/accessRole/createRole',
          roleData,
        )

        if (response.data.success) {
          console.log('Role Created Successfully:', response.data)

          const allAccessRole = await axios.get(
            'http://localhost:4001/api/v1/accessRole/getAllRoles',
          )
          console.log('allAccessRole', allAccessRole.data.data)
          // Update the state with the new role
          setRoles(allAccessRole.data.data)
        } else {
          console.error('Failed to create role:', response.data.message)
        }

        // Clear input field
        setRoleName('')
      } catch (error) {
        console.error('Error creating role:', error.response?.data || error.message)
      }
    }
  }

  useEffect(() => {
    const getAllRoles = async () => {
      const allAccessRole = await axios.get('http://localhost:4001/api/v1/accessRole/getAllRoles')
      console.log('allAccessRole', allAccessRole.data.data)
      // Update the state with the new role
      setRoles(allAccessRole.data.data)
    }
    getAllRoles()
  }, [])

  // Open Assign Role Modal
  const openAssignModal = (role) => {
    setSelectedRole(role)
    setModalAssignVisible(true)
  }

  // Define form validation schema
  const validationSchema = Yup.object().shape({
    userId: Yup.string().required('User is required'),
    userLevel: Yup.string().required('User Type is required'),
    userResourceLevel: Yup.string().required('User Group is required'),
  })

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      userId: selectedUserRole?.userId || '',
      userLevel: selectedUserRole?.userLevel || '',
      userResourceLevel: selectedUserRole?.userResourceLevel || '',
    },
    enableReinitialize: true, // Ensures form updates when selectedUserRole changes
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const assignmentData = {
        ...values,
        roleId: selectedUserRole?.roleId, // Include roleId for updates
        assignedBy: 'Admin-123',
      }

      try {
        let response
        if (selectedUserRole) {
          // If selectedUserRole exists, update the role
          response = await axios.post(
            `http://localhost:4001/api/v1/assignUserAccessRole/updateUserRole/${formik.values.userId}`,
            assignmentData,
            { headers: { 'Content-Type': 'application/json' } },
          )
        } else {
          // Otherwise, assign a new role
          response = await axios.post(
            'http://localhost:4001/api/v1/assignUserAccessRole/assignUserRole',
            assignmentData,
            { headers: { 'Content-Type': 'application/json' } },
          )
        }

        if (response.status === 201 || response.status === 200) {
          console.log('Role Assigned/Updated Successfully:', response.data)
          fetchSubscribersRole() // Refresh the roles list
          setModalEditVisible(false) // Close the modal
          resetForm() // Reset the form
        }
      } catch (error) {
        if (error.response) {
          const { status, data } = error.response

          if (status === 409) {
            alert(data.message || 'User already has a role assigned.')
          } else {
            alert(data.message || 'Failed to assign role. Please try again.')
          }

          console.error('Error assigning/updating role:', data)
        } else {
          console.error('Error assigning/updating role:', error.message)
          alert('Network error. Please check your connection.')
        }
      } finally {
        setSubmitting(false)
      }
    },
  })

  const fetchSubscribersRole = async () => {
    try {
      const response = await axios.get(
        'http://localhost:4001/api/v1/assignUserAccessRole/listSubscribersWithRoles',
      )
      setUsersWithRole(response.data.data)
    } catch (err) {
      setError('Failed to fetch subscribers')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscribersRole()
  }, [])

  // Open Edit Role Modal
  const openEditModal = (role) => {
    fetchSubscribers()
    console.log('selected user role', role)
    setSelectedUserRole(role)
    setEditRoleName(role)
    setModalEditVisible(true)
  }

 
  const toggleRoleView = () => {
    setShowUsersRole(!showUserRole)
  }

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
                  <CTableHeaderCell>subscriber Level</CTableHeaderCell>
                  <CTableHeaderCell>Resource available</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {usersWithRole &&
                  usersWithRole.map((role, index) => (
                    <CTableRow key={role.userId}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>
                        {role.firstName} {role.lastName}
                      </CTableDataCell>
                      <CTableDataCell>{role.roleName}</CTableDataCell>
                      <CTableDataCell>{role.userLevel}</CTableDataCell>
                      <CTableDataCell>{role.userResourceLevel}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="success"
                          style={{ color: 'white' }}
                          onClick={() => openEditModal(role)}
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
                {roles &&
                  roles?.map((role, index) => (
                    <CTableRow key={role.id}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{role.roleName}</CTableDataCell>
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
        <form onSubmit={formik.handleSubmit}>
          <CModalBody>
            {/* Select User */}
            <CFormSelect
              name="userId"
              value={formik.values.userId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onClick={fetchSubscribers} // Fetch subscribers when dropdown is clicked
              className={formik.errors.userId && formik.touched.userId ? 'is-invalid' : ''}
            >
              <option value="">Select a user</option>
              {subscribers.map((user) => (
                <option key={user.userId} value={user.userId}>
                  {user.firstName} {user.lastName} ({user.emailAddress})
                </option>
              ))}
            </CFormSelect>
            {formik.touched.userId && formik.errors.userId && (
              <div className="text-danger">{formik.errors.userId}</div>
            )}
            <br />

            {/* Select User Type */}
            <CFormSelect
              name="userLevel"
              value={formik.values.userLevel}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.errors.userLevel && formik.touched.userLevel ? 'is-invalid' : ''}
            >
              <option value="">Select User Type</option>
              <option value="regular">Regular User</option>
              <option value="authorized">Authorized User</option>
            </CFormSelect>
            {formik.touched.userLevel && formik.errors.userLevel && (
              <div className="text-danger">{formik.errors.userLevel}</div>
            )}

            <br />

            {/* Select User Group */}
            <CFormSelect
              name="userResourceLevel"
              value={formik.values.userResourceLevel}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.errors.userResourceLevel && formik.touched.userResourceLevel
                  ? 'is-invalid'
                  : ''
              }
            >
              <option value="">Select User Group</option>
              <option value="State">State</option>
              <option value="LGA">LGA</option>
              <option value="Ward">Ward</option>
              <option value="Quota">Quota</option>
              <option value="Town">Town</option>
              <option value="Kindred">Kindred</option>
            </CFormSelect>
            {formik.touched.userResourceLevel && formik.errors.userResourceLevel && (
              <div className="text-danger">{formik.errors.userResourceLevel}</div>
            )}
          </CModalBody>

          <CModalFooter>
            <CButton color="secondary" type="button" onClick={() => setModalAssignVisible(false)}>
              Cancel
            </CButton>
            <CButton color="primary" type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? 'Assigning...' : 'Assign'}
            </CButton>
          </CModalFooter>
        </form>
      </CModal>

      {/* edit role  */}

      <CModal visible={modalEditVisible} onClose={() => setModalEditVisible(false)}>
        <CModalHeader>
          <CModalTitle>{selectedUserRole ? 'Edit Role' : 'Assign Role'}</CModalTitle>
        </CModalHeader>
        <form onSubmit={formik.handleSubmit}>
          <CModalBody>
            {/* Select User (Disabled in Edit Mode) */}
            <CFormSelect
              name="userId"
              value={formik.values.userId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onClick={fetchSubscribers} // Fetch subscribers when dropdown is clicked
              className={formik.errors.userId && formik.touched.userId ? 'is-invalid' : ''}
              disabled={!!selectedUserRole} // Disable user selection in edit mode
            >
              <option value="">Select a user</option>
              {subscribers.map((user) => (
                <option key={user.userId} value={user.userId}>
                  {user.firstName} {user.lastName} ({user.emailAddress})
                </option>
              ))}
            </CFormSelect>
            {formik.touched.userId && formik.errors.userId && (
              <div className="text-danger">{formik.errors.userId}</div>
            )}
            <br />

            {/* Select User Type */}
            <CFormSelect
              name="userLevel"
              value={formik.values.userLevel}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.errors.userLevel && formik.touched.userLevel ? 'is-invalid' : ''}
            >
              <option value="">Select User Type</option>
              <option value="regular">Regular User</option>
              <option value="authorized">Authorized User</option>
            </CFormSelect>
            {formik.touched.userLevel && formik.errors.userLevel && (
              <div className="text-danger">{formik.errors.userLevel}</div>
            )}
            <br />

            {/* Select User Group */}
            <CFormSelect
              name="userResourceLevel"
              value={formik.values.userResourceLevel}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.errors.userResourceLevel && formik.touched.userResourceLevel
                  ? 'is-invalid'
                  : ''
              }
            >
              <option value="">Select User Group</option>
              <option value="State">State</option>
              <option value="LGA">LGA</option>
              <option value="Ward">Ward</option>
              <option value="Quota">Quota</option>
              <option value="Town">Town</option>
              <option value="Kindred">Kindred</option>
            </CFormSelect>
            {formik.touched.userResourceLevel && formik.errors.userResourceLevel && (
              <div className="text-danger">{formik.errors.userResourceLevel}</div>
            )}
          </CModalBody>

          <CModalFooter>
            <CButton color="secondary" type="button" onClick={() => setModalEditVisible(false)}>
              Cancel
            </CButton>
            <CButton color="primary" type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting
                ? selectedUserRole
                  ? 'Updating...'
                  : 'Assigning...'
                : selectedUserRole
                  ? 'Update Role'
                  : 'Assign Role'}
            </CButton>
          </CModalFooter>
        </form>
      </CModal>
    </div>
  )
}

export default RoleManagement
