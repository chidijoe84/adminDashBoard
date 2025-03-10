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
} from '@coreui/react'
import axios from 'axios'

const subscribersData = [
  { id: 1, name: 'John Doe', quarter: '', kindred: '' },
  { id: 2, name: 'Jane Smith', quarter: 'North', kindred: 'Alpha' },
]

const SubscriberAssignment = () => {
  const [subscribers, setSubscribers] = useState([])
  const [modal, setModal] = useState(false)
  const [currentSubscriber, setCurrentSubscriber] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const fetchSubscribers = async () => {
    if (!isLoaded) {
      try {
        const response = await axios.get(
          'http://localhost:4001/api/v1/createSubscriber/listSubscribers',
        )
        console.log('response', response)
        setSubscribers(response.data.data)
        setIsLoaded(true)
      } catch (error) {
        console.error('Error fetching subscribers:', error)
      }
    }
  }

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const handleAssign = (subscriber) => {
    console.log('subscriber', subscriber)
    if (!subscriber.quarter && !subscriber.kindred) {
      setCurrentSubscriber(subscriber)
      setModal(true)
    }
  }

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4001/api/v1/user/updateUserQuartarKindred/${currentSubscriber.id}`,
        {
          Quarter: currentSubscriber.quarter,
          Kindred: currentSubscriber.kindred,
        },
      )

      if (response.data.success) {
        setSubscribers((prev) =>
          prev.map((sub) => (sub.id === currentSubscriber.id ? currentSubscriber : sub)),
        )
        setModal(false)
      } else {
        alert(response.data.message) // Handle failure
      }
    } catch (error) {
      console.error('Error updating subscriber:', error)
      alert('Failed to update subscriber. Please try again.')
    }
  }

  return (
    <div>
      <h2>Assign Quarter & Kindred</h2>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Subscriber List</strong>
        </CCardHeader>
        <CCardBody>
          <CTable striped hover className="mt-3">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>State</CTableHeaderCell>
                <CTableHeaderCell>LGA</CTableHeaderCell>
                <CTableHeaderCell>Ward</CTableHeaderCell>
                <CTableHeaderCell>Town</CTableHeaderCell>
                <CTableHeaderCell>Quarter</CTableHeaderCell>
                <CTableHeaderCell>Kindred</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {subscribers.map((sub) => (
                <CTableRow key={sub.id}>
                  <CTableDataCell>
                    {sub.firstName} {sub.lastName}
                  </CTableDataCell>
                  <CTableDataCell>{sub.state}</CTableDataCell>
                  <CTableDataCell>{sub.LGA}</CTableDataCell>
                  <CTableDataCell>{sub.ward}</CTableDataCell>
                  <CTableDataCell>{sub.town}</CTableDataCell>
                  <CTableDataCell>{sub.Quarter || 'Unassigned'}</CTableDataCell>
                  <CTableDataCell>{sub.Kindred || 'Unassigned'}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="success"
                      style={{ color: 'white' }}
                      size="sm"
                      onClick={() => handleAssign(sub)}
                      disabled={sub.Quarter && sub.Kindred} // Disable instead of hiding
                    >
                      Assign
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
          <CModalTitle>Assign Quarter & Kindred</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormSelect
              className="mb-2"
              label="Quarter"
              value={currentSubscriber?.Quarter || ''}
              onChange={(e) =>
                setCurrentSubscriber({ ...currentSubscriber, Quarter: e.target.value })
              }
              disabled={!!currentSubscriber?.Quarter} // Disable if quarter is already assigned
            >
              <option value="">Select Quarter</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="East">East</option>
              <option value="West">West</option>
            </CFormSelect>

            <CFormSelect
              className="mb-2"
              label="Kindred"
              value={currentSubscriber?.kindred || ''}
              onChange={(e) =>
                setCurrentSubscriber({ ...currentSubscriber, kindred: e.target.value })
              }
            >
              <option value="">Select Kindred</option>
              <option value="Alpha">Alpha</option>
              <option value="Beta">Beta</option>
              <option value="Gamma">Gamma</option>
              <option value="Delta">Delta</option>
            </CFormSelect>
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

export default SubscriberAssignment
