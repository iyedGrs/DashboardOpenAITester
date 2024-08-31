/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
// src/components/FileUpload.js
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

const FileUpload = ({ onFileUpload, setLoading }) => {
  const dispatch = useDispatch()
  const [file, setFile] = useState(null)
  const handleFileChange = (e) => {
    // setFile(e.target.files[0])
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (event) => {
      const data = event.target.result
      // console.log(data, 'this is data')
      setFile(data)
    }
    reader.readAsText(file)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const localeStoreData = localStorage.getItem('vulnerabilities') || []
    if (localeStoreData.length > 0) {
      const datatoadd = JSON.parse(localeStoreData)
      dispatch({ type: 'AddData', data: JSON.parse(localeStoreData) })
      return
    }
    if (!file) {
      alert('Please upload a file')
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    // console.log(formData, 'this is file content')
    try {
      setLoading(true)
      const response = await axios.post(
        'http://localhost:5000/analyze_code',
        { code: file },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      // console.log('this is the data fileupload mel aIIIII    ' + response.data)
      // console.log('hedhi mel fileupload', response.data)
      console.log('hehdi response', response)
      console.log('res is here', response.data.Vulnerabilities)
      // dispatch({ type: 'AddData', data: response.data })
      onFileUpload(response.data.Vulnerabilities)
    } catch (error) {
      console.error('Error uploading file ya iyeeedd:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  )
}

export default FileUpload
