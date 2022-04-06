import axios from 'axios';

function apiService() {
  const api = axios.create({baseURL: process.env.NEXT_PUBLIC_HOSTNAME})

  return {
    handleRegister(data: any) {
      return api.post('/api/handle-register', data)
    },
    uploadFile(path: string, file: File) {
      const formData = new FormData()
      formData.append('path', path)
      formData.append('file', file)
      return api.post('/api/upload-file',
        formData,
        {headers: {
            'content-type': 'multipart/form-data'
          }}).then(result => {
            return result.data
      }).catch(err => {
        console.log({err})
        return null
      })
    }
  }
}

export default apiService()
