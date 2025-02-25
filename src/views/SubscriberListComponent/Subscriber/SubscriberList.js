import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableRow,
  CTableHead,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CFormInput,
  CFormSelect,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CFormCheck,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const Buttons = () => {
  const [isChecked, setIsChecked] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      phoneNumber: '',
      subID: '',
      state: '',
      lga: '',
      ward: '',
      village: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'), // Name is always required
      state: Yup.lazy((value) => {
        return isChecked ? Yup.string().required('State is required') : Yup.string()
      }), // State is required only if checkbox is checked
    }),
    onSubmit: (values) => {
      console.log('Form Submitted', values)
    },
  })

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked
    setIsChecked(checked)

    if (!checked) {
      // Reset state-related fields when checkbox is unchecked
      formik.setValues({
        ...formik.values,
        state: '',
        lga: '',
        ward: '',
        village: '',
      })

      // Remove validation error on state field when checkbox is unchecked
      formik.setFieldTouched('state', false)
      formik.setErrors({ ...formik.errors, state: undefined })
    }
  }
  
  return (
    <CRow>
      <CCol xs={12}>
        <form onSubmit={formik.handleSubmit}>
          <CCard className="mb-4">
            <CCardBody>
              <CRow className="g-3">
                <CCol md={4}>
                  <label>Name</label>
                  <CFormInput
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-danger">{formik.errors.name}</div>
                  )}
                </CCol>
                <CCol md={4}>
                  <label>Phone Number</label>
                  <CFormInput
                    type="text"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </CCol>
                <CCol md={4}>
                  <label>SubID</label>
                  <CFormInput
                    type="text"
                    name="subID"
                    value={formik.values.subID}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </CCol>
              </CRow>

              <CCol md={12} className="mt-3">
                <CFormCheck
                  id="flexCheckDefault"
                  label="in"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              </CCol>

              <CRow className="g-3">
                <CCol md={3}>
                  <label>Select State</label>
                  <CFormSelect
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={!isChecked}
                  >
                    <option value="">Choose...</option>
                    <option value="state1">State 1</option>
                    <option value="state2">State 2</option>
                  </CFormSelect>
                  {formik.touched.state && formik.errors.state && (
                    <div className="text-danger">{formik.errors.state}</div>
                  )}
                </CCol>
                <CCol md={3}>
                  <label>LGA</label>
                  <CFormSelect
                    name="lga"
                    value={formik.values.lga}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={!isChecked || !formik.values.state} // Disable if state is not selected
                  >
                    <option value="">Choose...</option>
                    <option value="all">All</option>
                  </CFormSelect>
                </CCol>
                <CCol md={3}>
                  <label>Ward</label>
                  <CFormSelect
                    name="ward"
                    value={formik.values.ward}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={!isChecked || !formik.values.state} // Disable if state is not selected
                  >
                    <option value="">Choose...</option>
                    <option value="all">All</option>
                  </CFormSelect>
                </CCol>
                <CCol md={3}>
                  <label>Village</label>
                  <CFormSelect
                    name="village"
                    value={formik.values.village}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={!isChecked || !formik.values.state} // Disable if state is not selected
                  >
                    <option value="">Choose...</option>
                    <option value="all">All</option>
                  </CFormSelect>
                </CCol>
                <CCol md={6} className="mt-3">
                  <CButton color="primary" type="submit">
                    Search for subscriber
                  </CButton>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </form>

        <CCard className="mb-4">
          <CCardHeader>
            <strong>Subscribers List</strong>
          </CCardHeader>
          <CCardBody>
            <div className="table-responsive">
              <CTable className="table table-striped">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Level</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">SubsID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
                    <CTableHeaderCell scope="col">State </CTableHeaderCell>
                    <CTableHeaderCell scope="col">LGA </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Ward </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Village </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Subs Since </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Last Use </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">1</CTableHeaderCell>
                    <CTableDataCell>Admin</CTableDataCell>
                    <CTableDataCell>suspended</CTableDataCell>
                    <CTableDataCell>2233ijnpu</CTableDataCell>
                    <CDropdown variant="btn-group">
                      <CDropdownToggle color="primary">Perform Actions</CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem href="#">Update Status</CDropdownItem>
                        <CDropdownItem href="#">Update Level</CDropdownItem>
                        <CDropdownItem href="#">Send Message</CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                    <CTableDataCell>Abel Adamu</CTableDataCell>
                    <CTableDataCell>0812984039849</CTableDataCell>
                    <CTableDataCell>Adamawa </CTableDataCell>
                    <CTableDataCell>yola</CTableDataCell>
                    <CTableDataCell>ituru</CTableDataCell>
                    <CTableDataCell>angaz</CTableDataCell>
                    <CTableDataCell>9/08/2024</CTableDataCell>
                    <CTableDataCell>29/01/2025</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">2</CTableHeaderCell>
                    <CTableDataCell>Admin</CTableDataCell>
                    <CTableDataCell>Active</CTableDataCell>
                    <CTableDataCell>2233ijnpu</CTableDataCell>
                    <CDropdown variant="btn-group">
                      <CDropdownToggle color="primary">Perform Actions</CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem href="#">Update Status</CDropdownItem>
                        <CDropdownItem href="#">Update Level</CDropdownItem>
                        <CDropdownItem href="#">Send Message</CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                    <CTableDataCell>@fat</CTableDataCell>
                    <CTableDataCell>@fat</CTableDataCell>
                    <CTableDataCell>@fat</CTableDataCell>
                    <CTableDataCell>@fat</CTableDataCell>
                    <CTableDataCell>@fat</CTableDataCell>
                    <CTableDataCell>@fat</CTableDataCell>
                    <CTableDataCell>@fat</CTableDataCell>
                    <CTableDataCell>@fat</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">3</CTableHeaderCell>
                    <CTableDataCell>Users</CTableDataCell>
                    <CTableDataCell>deactivated</CTableDataCell>
                    <CTableDataCell>1010eourc</CTableDataCell>
                    <CDropdown variant="btn-group">
                      <CDropdownToggle color="primary">Perform Actions</CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem href="#">Update Status</CDropdownItem>
                        <CDropdownItem href="#">Update Level</CDropdownItem>
                        <CDropdownItem href="#">Send Message</CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                    <CTableDataCell>@twitter</CTableDataCell>
                    <CTableDataCell>@twitter</CTableDataCell>
                    <CTableDataCell>@twitter</CTableDataCell>
                    <CTableDataCell>@twitter</CTableDataCell>
                    <CTableDataCell>@twitter</CTableDataCell>
                    <CTableDataCell>@twitter</CTableDataCell>
                    <CTableDataCell>@twitter</CTableDataCell>
                    <CTableDataCell>@twitter</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Buttons
