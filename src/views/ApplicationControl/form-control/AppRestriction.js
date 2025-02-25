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

const AppRestriction = () => {
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>App Restrictions List </strong>
      </CCardHeader>
      <CCardBody>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">
                By State{' '}
                <CButton color="primary" type="submit">
                  Add
                </CButton>
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">
                By LGA{' '}
                <CButton color="primary" type="submit">
                  Add
                </CButton>
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">
                By Ward{' '}
                <CButton color="primary" type="submit">
                  Add
                </CButton>
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">
                By town{' '}
                <CButton color="primary" type="submit">
                  Add
                </CButton>
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableHeaderCell>1</CTableHeaderCell>
              <CTableDataCell>Anambra</CTableDataCell>

              <CTableDataCell>Awka</CTableDataCell>
              <CTableDataCell>Awka south</CTableDataCell>
              <CTableDataCell>Idemili</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>2</CTableHeaderCell>
              <CTableDataCell>Enugu</CTableDataCell>

              <CTableDataCell>Ezeagu</CTableDataCell>
              <CTableDataCell>Iwolo</CTableDataCell>
              <CTableDataCell>awha</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>3</CTableHeaderCell>
              <CTableDataCell>Abia</CTableDataCell>

              <CTableDataCell>Umuahi</CTableDataCell>
              <CTableDataCell>ahia</CTableDataCell>
              <CTableDataCell>ubah</CTableDataCell>
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
        <Link to="/application-control/application-list">
          <CButton color="secondary" className="me-2" type="button">
            Back
          </CButton>
        </Link>
      </CCol>
    </CCard>
  )
}

export default AppRestriction
