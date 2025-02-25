import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CTable,
  CTableRow,
  CTableHead,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const Widgets = () => {
  const validationSchema = Yup.object().shape({
    state: Yup.string().required('State is required'),
    lga: Yup.string().required('LGA is required'),
    file: Yup.mixed().required('File is required'),
  })

  const formik = useFormik({
    initialValues: {
      state: '',
      lga: '',
      file: null,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form Submitted:', values)
      alert('Data uploaded successfully!')
    },
  })

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Post User-Data</strong>
        </CCardHeader>
        <CCardBody>
          <CForm className="row g-3" onSubmit={formik.handleSubmit}>
            {/* State Selection */}
            <CCol md={6}>
              <CFormSelect
                id="inputState"
                label="State"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Choose...</option>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
              </CFormSelect>
              {formik.touched.state && formik.errors.state && (
                <div className="text-danger">{formik.errors.state}</div>
              )}
            </CCol>

            {/* LGA Selection */}
            <CCol md={6}>
              <CFormSelect
                id="inputLGA"
                label="LGA"
                name="lga"
                value={formik.values.lga}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Choose...</option>
                <option value="Ikeja">Ikeja</option>
                <option value="Gwagwalada">Gwagwalada</option>
              </CFormSelect>
              {formik.touched.lga && formik.errors.lga && (
                <div className="text-danger">{formik.errors.lga}</div>
              )}
            </CCol>

            {/* File Upload */}
            <CCol xs={6}>
              <CFormInput
                id="inputAddress"
                type="file"
                label="Load Data"
                name="file"
                onChange={(event) => formik.setFieldValue('file', event.currentTarget.files[0])}
                onBlur={formik.handleBlur}
              />
              {formik.touched.file && formik.errors.file && (
                <div className="text-danger">{formik.errors.file}</div>
              )}
            </CCol>

            {/* Buttons */}
            <CCol xs={12}>
              {/* <CButton color="secondary" className="me-2" type="button">
              Back
            </CButton> */}
              <CButton color="primary" type="submit" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? 'Uploading...' : 'Upload Data'}
              </CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>
          <strong>Information For Anambra</strong>
        </CCardHeader>
        <CCardBody>
          {/* Responsive Wrapper */}
          <div className="table-responsive">
            <CTable className="table table-striped">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">LGA Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">LGA ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ward Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ward ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableHeaderCell scope="row">1</CTableHeaderCell>
                  <CTableDataCell>Mark</CTableDataCell>
                  <CTableDataCell>Otto</CTableDataCell>
                  <CTableDataCell>@mdo</CTableDataCell>
                  <CTableDataCell>@mdo</CTableDataCell>
                  <CTableDataCell>
                    <Link to="/post-user-data/Village-list">
                      <CButton color="primary" className="m-2">
                        View Villages
                      </CButton>
                    </Link>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">2</CTableHeaderCell>
                  <CTableDataCell>Jacob</CTableDataCell>
                  <CTableDataCell>Thornton</CTableDataCell>
                  <CTableDataCell>@fat</CTableDataCell>
                  <CTableDataCell>@fat</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="primary" className="m-2">
                      View Villages
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">3</CTableHeaderCell>
                  <CTableDataCell colSpan={2}>Larry the Bird</CTableDataCell>
                  <CTableDataCell>@twitter</CTableDataCell>
                  <CTableDataCell>@twitter</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="primary" className="m-2">
                      View Villages
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Widgets
