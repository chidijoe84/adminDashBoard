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
  CCol,
  CRow,
} from '@coreui/react'

const kindredsData = [
  {
    id: 1,
    name: 'Kindred One',
    gps: '12.3456, 78.9101',
    state: 'State A',
    lga: 'LGA A',
    ward: 'Ward A',
    town: 'Town A',
  },
  {
    id: 2,
    name: 'Kindred Two',
    gps: '23.4567, 89.0123',
    state: 'State B',
    lga: 'LGA B',
    ward: 'Ward B',
    town: 'Town B',
  },
]

const ManageKindred = () => {
  const [kindreds, setKindreds] = useState(kindredsData)
  const [modal, setModal] = useState(false)
  const [filters, setFilters] = useState({ state: '', lga: '', ward: '', town: '' })
  const [currentKindred, setCurrentKindred] = useState({
    name: '',
    gps: '',
    state: '',
    lga: '',
    ward: '',
    town: '',
  })

  const handleEdit = (kindred) => {
    setCurrentKindred(kindred)
    setModal(true)
  }

  const handleSave = () => {
    setKindreds((prev) => {
      const exists = prev.find((k) => k.id === currentKindred.id)
      return exists
        ? prev.map((k) => (k.id === currentKindred.id ? currentKindred : k))
        : [...prev, { ...currentKindred, id: prev.length + 1 }]
    })
    setModal(false)
  }

  const filteredKindreds = kindreds.filter(
    (kindred) =>
      (!filters.state || kindred.state === filters.state) &&
      (!filters.lga || kindred.lga === filters.lga) &&
      (!filters.ward || kindred.ward === filters.ward) &&
      (!filters.town || kindred.town === filters.town),
  )

  return (
    <div>
      <h2>Kindred Management</h2>

      <CCard className="mb-4">
        <CCardHeader>
          <strong>Filter Kindred List</strong>
        </CCardHeader>
        <CCardBody>
          <div className="filter-section mb-3">
            <CRow>
              <CCol xs={6}>
                <CFormSelect
                  className="mb-2"
                  onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                >
                  <option value="">Select State</option>
                  <option value="State A">State A</option>
                  <option value="State B">State B</option>
                </CFormSelect>
              </CCol>
              <CCol xs={6}>
                <CFormSelect
                  className="mb-2"
                  onChange={(e) => setFilters({ ...filters, lga: e.target.value })}
                >
                  <option value="">Select LGA</option>
                  <option value="LGA A">LGA A</option>
                  <option value="LGA B">LGA B</option>
                </CFormSelect>
              </CCol>
              <CCol xs={6}>
                <CFormSelect
                  className="mb-2"
                  onChange={(e) => setFilters({ ...filters, ward: e.target.value })}
                >
                  <option value="">Select Ward</option>
                  <option value="Ward A">Ward A</option>
                  <option value="Ward B">Ward B</option>
                </CFormSelect>
              </CCol>
              <CCol xs={6}>
                <CFormSelect
                  className="mb-2"
                  onChange={(e) => setFilters({ ...filters, town: e.target.value })}
                >
                  <option value="">Select Town</option>
                  <option value="Town A">Town A</option>
                  <option value="Town B">Town B</option>
                </CFormSelect>
              </CCol>
            </CRow>
          </div>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>
          <strong>Kindred Management</strong>
        </CCardHeader>
        <CCardBody>
          <CButton
            color="primary"
            onClick={() => {
              setCurrentKindred({ name: '', gps: '', state: '', lga: '', ward: '', town: '' })
              setModal(true)
            }}
          >
            + Add Kindred
          </CButton>
          <CTable striped hover className="mt-3">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>GPS Coordinates</CTableHeaderCell>
                <CTableHeaderCell>State</CTableHeaderCell>
                <CTableHeaderCell>LGA</CTableHeaderCell>
                <CTableHeaderCell>Ward</CTableHeaderCell>
                <CTableHeaderCell>Town</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredKindreds.map((kindred) => (
                <CTableRow key={kindred.id}>
                  <CTableDataCell>{kindred.name}</CTableDataCell>
                  <CTableDataCell>{kindred.gps}</CTableDataCell>
                  <CTableDataCell>{kindred.state}</CTableDataCell>
                  <CTableDataCell>{kindred.lga}</CTableDataCell>
                  <CTableDataCell>{kindred.ward}</CTableDataCell>
                  <CTableDataCell>{kindred.town}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="info"
                      style={{ color: 'white' }}
                      size="sm"
                      onClick={() => handleEdit(kindred)}
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
          <CModalTitle>{currentKindred.id ? 'Edit Kindred' : 'Add Kindred'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
          <CFormSelect
              className="mb-2"
              label="State"
              onChange={(e) => setCurrentKindred({ ...currentKindred, state: e.target.value })}
            >
              <option value="">Select State</option>
              <option value="State A">State A</option>
              <option value="State B">State B</option>
            </CFormSelect>
            <CFormSelect
              className="mb-2"
              label="LGA"
              onChange={(e) => setCurrentKindred({ ...currentKindred, state: e.target.value })}
            >
              <option value="">Select State</option>
              <option value="State A">State A</option>
              <option value="State B">State B</option>
            </CFormSelect>
            <CFormSelect
              className="mb-2"
              label="Ward"
              onChange={(e) => setCurrentKindred({ ...currentKindred, state: e.target.value })}
            >
              <option value="">Select State</option>
              <option value="State A">State A</option>
              <option value="State B">State B</option>
            </CFormSelect>
            <CFormSelect
              className="mb-2"
              label="Town"
              onChange={(e) => setCurrentKindred({ ...currentKindred, state: e.target.value })}
            >
              <option value="">Select State</option>
              <option value="State A">State A</option>
              <option value="State B">State B</option>
            </CFormSelect>
            <CFormInput
              className="mb-2"
              label="Kindred Name"
              value={currentKindred.name}
              onChange={(e) => setCurrentKindred({ ...currentKindred, name: e.target.value })}
            />
            <CFormInput
              className="mb-2"
              label="GPS Coordinates"
              value={currentKindred.gps}
              onChange={(e) => setCurrentKindred({ ...currentKindred, gps: e.target.value })}
            />
            
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

export default ManageKindred
