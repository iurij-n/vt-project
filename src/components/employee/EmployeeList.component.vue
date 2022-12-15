<template>
    <div>
      <b-row>
        <b-col
          md="2"
          offset-md="10">
          <a href="#">Create owner</a>
        </b-col>
      </b-row>
      <br>
      <b-row>
        <b-col md="12">
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Employee name</th>
                  <th>Employee salary</th>
                  <th>Employee age</th>
                  <th>Details</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="employee in employees"
                  :key="employee.id">
                  <td>{{ employee.employee_name }}</td>
                  <td>{{ employee.employee_salary }}</td>
                  <td>{{ employee.employee_age }}</td>
                  <td>
                    <b-button variant="default">Details</b-button>
                  </td>
                  <td>
                    <b-button variant="success">Update</b-button>
                  </td>
                  <td>
                    <b-button variant="danger">Delete</b-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-col>
      </b-row>
    </div>
  </template>
<script>
import EmploeesService from '@/api-services/employees.service'
export default {
  name: 'EmployeeList',
  props: {
    msg: String
  },
  data() {
    return {
      employees: []
    }
  },
  created() {
    EmploeesService.getAll().then((response) => {
      this.employees = response.data.data
    }).catch((error) => {
      console.log(error.response.data)
    })
  }
}
</script>
this.employees = response.data