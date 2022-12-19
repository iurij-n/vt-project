<template>
    <div>
      <b-row>
        <b-col
          md="2"
          offset-md="10">
          <b-button
          :to="{ name: 'EmployeeCreate' }"
          variant="success">
                Create employee
          </b-button>
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
                </tr>
              </thead>
              <tbody>
                <employee-list-row
                  v-for="(employee, n) in dataLocalStorage"
                  :key="n"
                  :employee="employee"
                  @dblClickRow="dblClickRow"/>
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
      employees: [],
      alertModalTitle: '',
      alertModalContent: '',
      dataLocalStorage: []
    }
  },
  created() {
    EmploeesService.getAll().then((response) => {
      this.employees = response.data.data
      if(!localStorage.getItem('localEmployeeList')) {
        const parsed = JSON.stringify(this.employees)
        localStorage.setItem('localEmployeeList', parsed)
        this.dataLocalStorage = JSON.parse(localStorage.getItem('localEmployeeList'))
      }
    }).catch((error) => {
      console.log(error)
    })
    this.dataLocalStorage = JSON.parse(localStorage.getItem('localEmployeeList'))
  },
  methods: {
    dblClickRow(employeeId) {
      this.$router.push({ name: 'EmployeeDetails', params: { id: employeeId } })
  }
}
}

</script>
