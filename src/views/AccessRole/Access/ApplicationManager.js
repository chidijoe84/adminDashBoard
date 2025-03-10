import React, { useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CForm,
  CFormInput,
  CFormSelect,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
} from '@coreui/react'

const applicationsData = [
  { id: 1, name: 'App One', type: 'General', category: 'Finance', status: 'Active' },
  { id: 2, name: 'App Two', type: 'Restricted', category: 'Health', status: 'Inactive' },
]

export default function ApplicationsManager() {
  const [applications, setApplications] = useState(applicationsData)
  const [modal, setModal] = useState(false)
  const [currentApp, setCurrentApp] = useState({ name: '', type: '', category: '', status: '' })

  const handleEdit = (app) => {
    setCurrentApp(app)
    setModal(true)
  }

  const handleSave = () => {
    setApplications((prev) => {
      const exists = prev.find((app) => app.id === currentApp.id)
      return exists
        ? prev.map((app) => (app.id === currentApp.id ? currentApp : app))
        : [...prev, { ...currentApp, id: prev.length + 1 }]
    })
    setModal(false)
  }

  return (
    <div>
      <h2>Applications Manager</h2>
      {/* <CButton
        color="primary"
        onClick={() => {
          setCurrentApp({ name: '', type: '', category: '', status: '' })
          setModal(true)
        }}
      >
        + Add Application
      </CButton> */}

      <CCard className="mb-4 mt-4">
        <CCardHeader>
          <strong>Application List and Control</strong>
        </CCardHeader>
        <CCardBody>
          <CTable striped hover className="mt-3">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Type</CTableHeaderCell>
                <CTableHeaderCell>Category</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {applications.map((app) => (
                <CTableRow key={app.id}>
                  <CTableDataCell>{app.name}</CTableDataCell>
                  <CTableDataCell>{app.type}</CTableDataCell>
                  <CTableDataCell>{app.category}</CTableDataCell>
                  <CTableDataCell>{app.status}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="info"
                      style={{ color: 'white' }}
                      size="sm"
                      onClick={() => handleEdit(app)}
                    >
                      Edit
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      <CModal visible={modal} onClose={() => setModal(false)}>
        <CModalHeader>
          <CModalTitle>{currentApp.id ? 'Edit Application' : 'Add Application'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              className="mb-2"
              label="Application Name"
              value={currentApp.name}
              onChange={(e) => setCurrentApp({ ...currentApp, name: e.target.value })}
            />
            <CFormSelect
              className="mb-2"
              label="Type"
              value={currentApp.type}
              onChange={(e) => setCurrentApp({ ...currentApp, type: e.target.value })}
            >
              <option value="General">General</option>
              <option value="Restricted">Restricted</option>
              <option value="Restricted Edit">Restricted Edit</option>
            </CFormSelect>

            <CFormSelect
              className="mb-2"
              label="Status"
              value={currentApp.status}
              onChange={(e) => setCurrentApp({ ...currentApp, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </CFormSelect>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModal(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleSave}>
            Save
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}
