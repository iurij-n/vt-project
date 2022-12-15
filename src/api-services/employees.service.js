import Axios from 'axios'

export default {
  getAll() {
    return Axios.get('/api/v1/employees')
  },

  get(id) {
    return Axios.get('https://dummy.restapiexample.com/api/v1/employees'/{id})
  },

  create(data) {
    return Axios.post('https://dummy.restapiexample.com/api/v1/create', data)
  },

  update(id, data) {
    return Axios.put('https://dummy.restapiexample.com/api/v1/update'/{id}, data)
  },

  delete(id) {
    return Axios.delete('https://dummy.restapiexample.com/api/v1/delete'/{id})
  }
}