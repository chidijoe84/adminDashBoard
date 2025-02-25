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
} from '@coreui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link } from 'react-router-dom'

const AddVillage = () => {
  const AppSchema = Yup.object().shape({
    wardName: Yup.string().required('Ward Name is required'),
    villageName: Yup.string().required('Village Name is required'),
  })

  const formik = useFormik({
    initialValues: {
      wardName: '',
      villageName: '',
    },
    validationSchema: AppSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log('value', values)
      try {
        const response = await axios.post('https://your-api.com/add-app', values)
        console.log('Response:', response.data)
        alert('Application added successfully!')
        resetForm() // Reset the form after successful submission
      } catch (error) {
        console.error('Error:', error.response?.data || error.message)
        alert('Failed to add application!')
      }
      setSubmitting(false)
    },
  })

  return (
    <div>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Add New Village</strong>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={formik.handleSubmit} className="row g-3">
            <CCol md={6}>
              <CFormInput
                type="text"
                id="wardName"
                label="Ward Name"
                name="wardName"
                value={formik.values.wardName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.wardName && formik.errors.wardName && (
                <div className="text-danger">{formik.errors.wardName}</div>
              )}
            </CCol>

            <CCol md={6}>
              <CFormInput
                type="text"
                id="villageName"
                label="Village Name"
                name="villageName"
                value={formik.values.villageName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.villageName && formik.errors.villageName && (
                <div className="text-danger">{formik.errors.villageName}</div>
              )}
            </CCol>

            <CCol xs={12}>
              <Link to="/post-user-data/Village-list">
                <CButton color="secondary" className="me-2" type="button">
                  Back
                </CButton>
              </Link>

              <CButton color="primary" type="submit" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? 'Submitting...' : 'Submit'}
              </CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default AddVillage
