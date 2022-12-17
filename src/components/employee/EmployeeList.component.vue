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
                <employee-list-row
                  v-for="employee in employees"
                  :key="employee.id"
                  :employee="employee"
                  @detailsEmployee="detailsEmployee"
                  @updateEmployee="updateEmployee"
                  @deleteEmployee="deleteEmployee"/>
              </tbody>
            </table>
          </div>
        </b-col>
      </b-row>
    </div>
  </template>
<script>
import EmploeesService from '@/api-services/employees.service'
import EmployeeListRow from '@/components/employee/EmployeeListRow'

export default {
  name: 'EmployeeList',
  components: {
    EmployeeListRow
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
  },
  methods: {
    detailsEmployee(employeeId) {
      console.log('details', employeeId)
    },
    updateEmployee(employeeId) {
      console.log('update', employeeId)
    },
    deleteEmployee(employeeId) {
      console.log('delete', employeeId)
    }
  }
}
</script>
