import React, { useState, useEffect } from 'react'
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
  CFormSelect,
} from '@coreui/react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const townsData = [
  { id: 1, name: 'Town One', gps: '6.5244, 3.3792', ward: 'Ward A' },
  { id: 2, name: 'Town Two', gps: '7.5244, 4.3792', ward: 'Ward B' },
]

const TownsManager = () => {
  const [towns, setTowns] = useState(townsData)
  const [modal, setModal] = useState(false)
  const [currentTown, setCurrentTown] = useState({ name: '', gps: '', ward: '' })
  const [allState, setAllState] = useState()
  const [LGA, setLGA] = useState()
  const [lgaWards, setWards] = useState()
  const [allTown, setAllTown] = useState([])

  const getAllState = async () => {
    const allState = await axios.get('http://localhost:4001/api/v1/getAllState/getAllState')
    console.log('all state', allState)
    setAllState(allState.data.data)
  }

  const filterLGA = async (stateId) => {
    console.log('stateId', stateId)
    const getLGA = await axios.get(
      `http://localhost:4001/api/v1/getAllState/getStateLGA/${stateId}`,
    )
    console.log('getLGA', getLGA.data.data)
    setLGA(getLGA.data.data)
  }

  const filterWard = async (lga_id) => {
    console.log('lga_id', lga_id)
    const getWards = await axios.get(
      `http://localhost:4001/api/v1/getAllState/getWardByLGA/${lga_id}`,
    )
    console.log('getWards', getWards.data.data)
    setWards(getWards.data.data)
  }

  const getAllTown = async () => {
    const getAllTowns = await axios.get("http://localhost:4001/api/v1/createTown/getAllTown")
    console.log("allTown", getAllTowns.data.towns)
    setAllTown(getAllTowns.data.towns)
  }
  useEffect(() => {
    getAllTown()
    getAllState()
  }, [])

  const handleEdit = (town) => {
    setCurrentTown(town)
    setModal(true)
  }

  const formik = useFormik({
    initialValues: {
      stateId: '',
      LGAId: '',
      wardId: '',
      townName: '',
      townLat: '',
      townLong: '',
      createdBy: 'AdminUser',
    },
    validationSchema: Yup.object({
      stateId: Yup.string().required('State is required'),
      LGAId: Yup.string().required('LGA is required'),
      wardId: Yup.string().required('Ward is required'),
      townName: Yup.string().required('Town Name is required'),
      townLat: Yup.string().required('Latitude is required'),
      townLong: Yup.string().required('Longitude is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          'http://localhost:4001/api/v1/createTown/createTown',
          values,
        )
        console.log('Response:', response.data)
        alert('Town created successfully!')
        resetForm()
      } catch (error) {
        console.error('Error creating town:', error)
        alert(error.response?.data?.message || 'An error occurred while creating the town.')
      }
    },
  })

  console.log('allState', allState)
  return (
    <div>
      <h2>Towns Management</h2>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Filter Town List</strong>
        </CCardHeader>
        <CCardBody>
          <div className="filter-section mb-3">
            <CRow>
              <CCol xs={4}>
                <CFormSelect
                  className="mb-2"
                  onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                >
                  <option value="">Select State</option>
                  <option value="State A">State A</option>
                  <option value="State B">State B</option>
                </CFormSelect>
              </CCol>
              <CCol xs={4}>
                <CFormSelect
                  className="mb-2"
                  onChange={(e) => setFilters({ ...filters, lga: e.target.value })}
                >
                  <option value="">Select LGA</option>
                  <option value="LGA A">LGA A</option>
                  <option value="LGA B">LGA B</option>
                </CFormSelect>
              </CCol>
              <CCol xs={4}>
                <CFormSelect
                  className="mb-2"
                  onChange={(e) => setFilters({ ...filters, ward: e.target.value })}
                >
                  <option value="">Select Ward</option>
                  <option value="Ward A">Ward A</option>
                  <option value="Ward B">Ward B</option>
                </CFormSelect>
              </CCol>
            </CRow>
          </div>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>
          <strong>List of Town</strong>
        </CCardHeader>

        <CCardBody>
          <CButton
            color="primary"
            onClick={() => {
              setCurrentTown({ name: '', gps: '', ward: '' })
              setModal(true)
            }}
          >
            + Add Town
          </CButton>
          <CTable striped hover className="mt-3">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Town Name</CTableHeaderCell>
                <CTableHeaderCell>Town Lat</CTableHeaderCell>
                <CTableHeaderCell>Town Long</CTableHeaderCell>
                <CTableHeaderCell>State</CTableHeaderCell>
                <CTableHeaderCell>LGA</CTableHeaderCell>
                <CTableHeaderCell>Ward</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {allTown?.map((t) => (
                <CTableRow key={t.id}>
                  <CTableDataCell>{t.townName}</CTableDataCell>
                  <CTableDataCell>{t.townLat}</CTableDataCell>
                  <CTableDataCell>{t.townLong}</CTableDataCell>
                  <CTableDataCell>{t.stateName}</CTableDataCell>
                  <CTableDataCell>{t.lgaName}</CTableDataCell>
                  <CTableDataCell>{t.wardName}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="info"
                      style={{ color: 'white' }}
                      size="sm"
                      onClick={() => handleEdit(t)}
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
          <CModalTitle>{currentTown.id ? 'Edit Town' : 'Add Town'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form onSubmit={formik.handleSubmit}>
            <CFormSelect
              className="mb-2"
              name="stateId"
              onChange={(e) => {
                formik.handleChange(e)
                filterLGA(e.target.value)
              }}
              value={formik.values.stateId}
            >
              <option value="">Select State</option>
              {allState?.map((state) => (
                <option key={state.stateId} value={state.stateId}>
                  {state.stateName}
                </option>
              ))}
            </CFormSelect>
            {formik.touched.stateId && formik.errors.stateId && (
              <div className="text-danger">{formik.errors.stateId}</div>
            )}

            <CFormSelect
              className="mb-2"
              name="LGAId"
              onChange={(e) => {
                formik.handleChange(e)
                filterWard(e.target.value)
              }}
              value={formik.values.LGAId}
            >
              <option value="">Select LGA</option>
              {LGA?.map((lga) => (
                <option key={lga.lga_id} value={lga.lga_id}>
                  {lga.lga_name}
                </option>
              ))}
            </CFormSelect>
            {formik.touched.LGAId && formik.errors.LGAId && (
              <div className="text-danger">{formik.errors.LGAId}</div>
            )}

            <CFormSelect
              className="mb-2"
              name="wardId"
              onChange={formik.handleChange}
              value={formik.values.wardId}
            >
              <option value="">Select Ward</option>
              {lgaWards?.map((ward) => (
                <option key={ward.ward_id} value={ward.ward_id}>
                  {ward.ward_name}
                </option>
              ))}
            </CFormSelect>
            {formik.touched.wardId && formik.errors.wardId && (
              <div className="text-danger">{formik.errors.wardId}</div>
            )}

            <CFormInput
              className="mb-2"
              name="townName"
              placeholder="Town Name"
              onChange={formik.handleChange}
              value={formik.values.townName}
            />
            {formik.touched.townName && formik.errors.townName && (
              <div className="text-danger">{formik.errors.townName}</div>
            )}

            <CFormInput
              className="mb-2"
              name="townLat"
              placeholder="Latitude"
              onChange={formik.handleChange}
              value={formik.values.townLat}
            />
            {formik.touched.townLat && formik.errors.townLat && (
              <div className="text-danger">{formik.errors.townLat}</div>
            )}

            <CFormInput
              className="mb-2"
              name="townLong"
              placeholder="Longitude"
              onChange={formik.handleChange}
              value={formik.values.townLong}
            />
            {formik.touched.townLong && formik.errors.townLong && (
              <div className="text-danger">{formik.errors.townLong}</div>
            )}

            <CModalFooter>
              <CButton color="secondary" onClick={() => setModal(false)}>
                Cancel
              </CButton>
              <CButton type="submit" color="primary">
                Submit
              </CButton>
            </CModalFooter>
          </form>
        </CModalBody>
      </CModal>
    </div>
  )
}

export default TownsManager
