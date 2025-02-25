import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CTable,
  CTableRow,
  CTableHead,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CRow,
  CCol,
} from '@coreui/react'
import { Link } from 'react-router-dom'

const VillageList = () => {
  return (
    <div>
      <CRow>
        <Link to="/post-user-data/add-Village">
          <CButton color="primary" className="mb-2" type="submit">
            Add New Village
          </CButton>
        </Link>
      </CRow>

      <CCard className="mb-4">
        <CCardHeader>
          <strong>List Of Villages In Igbo Ward</strong>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Village Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Village ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date Added</CTableHeaderCell>
                <CTableHeaderCell scope="col">Added By</CTableHeaderCell>
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
                  <Link to="/post-user-data/edit-Village">
                    <CButton color="primary" className="m-2" type="submit">
                      Edit Village info
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
                  <Link to="/post-user-data/edit-Village">
                    <CButton color="primary" className="m-2" type="submit">
                      Edit Village info
                    </CButton>
                  </Link>
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">3</CTableHeaderCell>
                <CTableDataCell colSpan={2}>Larry the Bird</CTableDataCell>
                <CTableDataCell>@twitter</CTableDataCell>
                <CTableDataCell>@twitter</CTableDataCell>

                <CTableDataCell>
                  <Link to="/post-user-data/edit-Village">
                    <CButton color="primary" className="m-2" type="submit">
                      Edit Village info
                    </CButton>
                  </Link>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
        <CCol
          xs={12}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            padding: '10px',
          }}
        >
          <Link to="/post-user-data">
            <CButton color="secondary" className="me-2" type="button">
              Back
            </CButton>
          </Link>
        </CCol>
      </CCard>
    </div>
  )
}

export default VillageList
