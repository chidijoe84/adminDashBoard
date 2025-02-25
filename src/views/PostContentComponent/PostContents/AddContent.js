import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
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
  CFormTextarea,
} from '@coreui/react'
import { Link } from 'react-router-dom'

const AddContent = () => {
  const PostSchema = Yup.object().shape({
    appName: Yup.string().required('App Name is required'),
    visibility: Yup.string().required('Please select who can see'),
    startDate: Yup.date().required('Start Date is required'),
    endDate: Yup.date()
      .min(Yup.ref('startDate'), 'End Date must be after Start Date')
      .required('End Date is required'),
    description: Yup.string().min(10, 'Description too short').required('Description is required'),
  })

  const formik = useFormik({
    initialValues: {
      appName: '',
      visibility: '',
      startDate: '',
      endDate: '',
      description: '',
    },
    validationSchema: PostSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log('values', values)
      try {
        const response = await axios.post('https://your-api.com/post', values)
        console.log('Response:', response.data)
        alert('Post submitted successfully!')
        resetForm() // Reset the form after successful submission
      } catch (error) {
        console.error('Error:', error.response?.data || error.message)
        alert('Failed to submit post!')
      }
      setSubmitting(false)
    },
  })

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Post Content</strong>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={formik.handleSubmit} className="row g-3">
          <CCol md={6}>
            <CFormInput
              type="text"
              id="appName"
              label="App Name"
              name="appName"
              value={formik.values.appName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.appName && formik.errors.appName && (
              <div className="text-danger">{formik.errors.appName}</div>
            )}
          </CCol>

          <CCol md={6}>
            <CFormSelect
              id="visibility"
              label="Select Who Can See"
              name="visibility"
              value={formik.values.visibility}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Choose...</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </CFormSelect>
            {formik.touched.visibility && formik.errors.visibility && (
              <div className="text-danger">{formik.errors.visibility}</div>
            )}
          </CCol>

          <CCol md={6}>
            <CFormInput
              id="startDate"
              type="date"
              label="Start Date"
              name="startDate"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.startDate && formik.errors.startDate && (
              <div className="text-danger">{formik.errors.startDate}</div>
            )}
          </CCol>

          <CCol md={6}>
            <CFormInput
              id="endDate"
              type="date"
              label="End Date"
              name="endDate"
              value={formik.values.endDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.endDate && formik.errors.endDate && (
              <div className="text-danger">{formik.errors.endDate}</div>
            )}
          </CCol>

          <CCol md={12}>
            <CFormTextarea
              id="description"
              label="Enter Content Description"
              rows={3}
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></CFormTextarea>
            {formik.touched.description && formik.errors.description && (
              <div className="text-danger">{formik.errors.description}</div>
            )}
          </CCol>

          <CCol xs={12}>
            <Link to="/post-content/content-list">
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
  )
}

export default AddContent
