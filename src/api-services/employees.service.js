import Axios from 'axios'

export default {
  getAll() {
    return Axios.get('/api/v1/employees')
  },

  get_employee_details(id) {
    return Axios.get('/api/v1/employee/' + id)
  },

  create(data) {
    return Axios.post('/api/v1/create', data)
  },

  update(id, data) {
    return Axios.put('/api/v1/update/' + id, data)
  },

  delete(id) {
    console.log(id)
    return Axios.delete('/api/v1/delete/' + id)
  }
}