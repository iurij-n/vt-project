import Axios from 'axios'

export default {
  getAll() {
    return Axios.get('/api/v1/employees')
  },

  get_employee_details(id) {
    return Axios.get('/api/v1/employee/'+id)
  },

  create(data) {
    return Axios.post('https://dummy.restapiexample.com/api/v1/create', data)
  },

  update(id, data) {
    return Axios.put('https://dummy.restapiexample.com/api/v1/update'/{id}, data)
  },

  delete(id) {
    // console.log(Axios.delete('/api/v1/delete/'+id))
    return Axios.delete('/api/v1/delete/'+id)
  }
}