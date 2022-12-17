<template>
    <div>
      <b-row>
        <b-col
          md="2"
          offset-md="10">
          <b-button variant="success">
            <router-link
              :to="{ name: 'EmployeeCreate' }">
                Create employee
            </router-link>
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
                  @deleteEmployee="deleteEmployee"
                  @dblClickRow="dblClickRow"/>
              </tbody>
            </table>
          </div>
        </b-col>
      </b-row>
      <b-modal
        ref="deleteConfirmModal"
        title="Confirm your action"
        @ok="onDeleteConfirm"
        @hide="onDeleteModalHide">
        <p class="my-4">Are you sure you want to delete this eployee?</p>
      </b-modal>
      <b-modal
        ref="alertModal"
        :title="alertModalTitle"
        :ok-only="true">
        <p class="my-4">{{ alertModalContent }}</p>
      </b-modal>
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
    detailsEmployee(employeeId) {
      this.$router.push({ name: 'EmployeeDetails', params: { id: employeeId } })
    },
    updateEmployee(employeeId) {
      this.$router.push({ name: 'EmployeeUpdate', params: { id: employeeId } })
    },
    deleteEmployee(employeeId) {
      this.selectedEmployeeId = employeeId
      this.$refs.deleteConfirmModal.show()
    },
    fetchEmployees() {
      EmploeesService.getAll().then((response) => {
        this.employees = response.data.data
      })
    },
    onDeleteConfirm() {
      EmploeesService.delete(this.selectedEmployeeId).then((response) => {
        this.alertModalTitle = 'Successfully'
        this.alertModalContent = response.data.message
        this.$refs.alertModal.show()
        this.fetchEmployees()
      }).catch((error) => {
        this.alertModalTitle = 'Error'
        this.alertModalContent = error.response.data
        this.$refs.alertModal.show()
      })
    },
    onDeleteModalHide() {
      this.selectedEmployeeId = null
    },
    dblClickRow(employeeId) {
      this.$router.push({ name: 'EmployeeDetails', params: { id: employeeId } })
  }
}
}

</script>
