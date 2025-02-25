import React from 'react'
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
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from '@coreui/react'
import { Link } from 'react-router-dom'

const FormControl = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CRow>
          <Link to="/application-control/post-application">
            <CButton color="primary" className="mb-2" type="submit">
              Add New Application
            </CButton>
          </Link>
        </CRow>

        <CCard className="mb-4">
          <CCardHeader>
            <strong>List OF Applications </strong>
          </CCardHeader>
          <CCardBody>
            <div className="table-responsive">
              <CTable className="table table-striped">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">App Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Date Added</CTableHeaderCell>
                    <CTableHeaderCell scope="col">AppID</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell>1</CTableHeaderCell>
                    <CTableDataCell>Mark Hampa</CTableDataCell>
                    <CTableDataCell>
                      <Link to="/application-control/application-list/app-restriction-list">
                        <CButton color="primary">App Restrictions</CButton>
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>@mdo</CTableDataCell>
                    <CTableDataCell>hshhsiuyeiwo29823</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell>2</CTableHeaderCell>
                    <CTableDataCell>Jacob</CTableDataCell>
                    <CTableDataCell>
                      <Link to="/application-control/application-list/app-restriction-list">
                        <CButton color="primary">App Restrictions</CButton>
                      </Link>
                    </CTableDataCell>

                    <CTableDataCell>@fat</CTableDataCell>
                    <CTableDataCell>hshhsiuyeiwo29823</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell>3</CTableHeaderCell>
                    <CTableDataCell>Larry the Bird</CTableDataCell>
                    <CTableDataCell>
                      <Link to="/application-control/application-list/app-restriction-list">
                        <CButton color="primary">App Restrictions</CButton>
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>@twitter</CTableDataCell>
                    <CTableDataCell>hshhsiuyeiwo29823</CTableDataCell>
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

export default FormControl
