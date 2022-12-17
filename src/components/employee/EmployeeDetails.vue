<template>
    <div class="table-responsive">
      <table class="table table-striped">
        <tr>
          <td>Employee name:</td>
          <td>{{ employee.employee_name }}</td>
        </tr>
        <tr>
          <td>Employee salary:</td>
          <td>{{ employee.employee_salary }}</td>
        </tr>
        <tr>
          <td>Employee age:</td>
          <td>{{ employee.employee_age }}</td>
       </tr>
      </table>
    </div>
</template>
<script>
import EmploeesService from '@/api-services/employees.service'
  
export default {
  name: 'EmployeeDetails',
  data() {
      return {
          employee: {}
      }
  },
  created() {
    EmploeesService.get_employee_details(this.$router.currentRoute.params.id).then((response) => {
          this.employee = response.data.data
      })
      }
  }
</script>
