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
                  v-for="employee in employees"
                  :key="employee.id"
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
      alertModalContent: ''
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
    dblClickRow(employeeId) {
      this.$router.push({ name: 'EmployeeDetails', params: { id: employeeId } })
  }
}
}

</script>
