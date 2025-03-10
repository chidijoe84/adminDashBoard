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
  CRow,
  CCol,
  CCardText,
  CCardTitle,
} from '@coreui/react'

const quartersData = [
  {
    id: 1,
    name: 'Quarter One',
    gps: '6.5244, 3.3792',
    state: 'Lagos',
    lga: 'Ikeja',
    ward: 'Ward A',
  },
  {
    id: 2,
    name: 'Quarter Two',
    gps: '7.5244, 4.3792',
    state: 'Lagos',
    lga: 'Surulere',
    ward: 'Ward B',
  },
]

const QuartersManager = () => {
  const [quarters, setQuarters] = useState(quartersData)
  const [modal, setModal] = useState(false)
  const [currentQuarter, setCurrentQuarter] = useState({
    name: '',
    gps: '',
    state: 'Lagos',
    lga: '',
    ward: '',
  })

  const handleEdit = (quarter) => {
    setCurrentQuarter(quarter)
    setModal(true)
  }

  const handleSave = () => {
    setQuarters((prev) => {
      const exists = prev.find((q) => q.id === currentQuarter.id)
      return exists
        ? prev.map((q) => (q.id === currentQuarter.id ? currentQuarter : q))
        : [...prev, { ...currentQuarter, id: prev.length + 1 }]
    })
    setModal(false)
  }

  return (
    <div>
      <h2>Quarters Management</h2>

      <CCard className="mb-4">
        <CCardHeader>
          <strong>Filter Quota List</strong>
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
          <strong>Quarters Managemen</strong>
        </CCardHeader>
        <CCardBody>
          <CButton
            color="primary"
            onClick={() => {
              setCurrentQuarter({ name: '', gps: '', state: 'Lagos', lga: '', ward: '' })
              setModal(true)
            }}
          >
            + Add Quarter
          </CButton>
          <CTable striped hover className="mt-3">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>GPS Coordinates</CTableHeaderCell>
                <CTableHeaderCell>State</CTableHeaderCell>
                <CTableHeaderCell>LGA</CTableHeaderCell>
                <CTableHeaderCell>Ward</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {quarters.map((q) => (
                <CTableRow key={q.id}>
                  <CTableDataCell>{q.name}</CTableDataCell>
                  <CTableDataCell>{q.gps}</CTableDataCell>
                  <CTableDataCell>{q.state}</CTableDataCell>
                  <CTableDataCell>{q.lga}</CTableDataCell>
                  <CTableDataCell>{q.ward}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="info"
                      style={{ color: 'white' }}
                      size="sm"
                      onClick={() => handleEdit(q)}
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
          <CModalTitle>{currentQuarter.id ? 'Edit Quarter' : 'Add Quarter'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput className="mb-2" label="State" value={currentQuarter.state} disabled />
            <CFormInput className="mb-2" label="LGA" value={currentQuarter.lga} disabled />
            <CFormInput className="mb-2" label="Ward" value={currentQuarter.ward} disabled />
            <CFormInput
              className="mb-2"
              label="Quarter Name"
              value={currentQuarter.name}
              onChange={(e) => setCurrentQuarter({ ...currentQuarter, name: e.target.value })}
            />
            <CFormInput
              className="mb-2"
              label="GPS Coordinates"
              value={currentQuarter.gps}
              onChange={(e) => setCurrentQuarter({ ...currentQuarter, gps: e.target.value })}
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

export default QuartersManager
