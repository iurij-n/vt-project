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
      <b-button
        variant="success"
        :key="employee.id"
        @click="onUpdateClick">Update</b-button>
      <b-button
        variant="danger"
        @click="onDeleteClick">Delete</b-button>
      <b-button
        :to="{ name: 'EmployeeList' }">Cancel</b-button>
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
          :ok-only="true"
          @ok="onOkConfirm">
          <p class="my-4">{{ alertModalContent }}</p>
        </b-modal>
    </div>
</template>
<script>
import EmploeesService from '@/api-services/employees.service'
import LocalEmploeesService from '@/api-services/localEmployees.service'
  
export default {
  name: 'EmployeeDetails',
  data() {
      return {
          employee: {},
          alertModalTitle: '',
          alertModalContent: ''
      }
  },
  created() {
    EmploeesService.get_employee_details(this.$router.currentRoute.params.id).then(() => {
          this.employee = LocalEmploeesService.get_local_employee_details(this.$router.currentRoute.params.id)
      })
  },
  methods: {
      onUpdateClick() {
        this.$router.push({ name: 'EmployeeUpdate', params: { id: this.employee.id } })
      },
      onDeleteClick() {
        this.selectedEmployeeId = this.employee.id
        this.$refs.deleteConfirmModal.show()

      },
      onDeleteConfirm() {
        EmploeesService.delete(this.employee.id).then((response) => {
          if (response.data.status == 'success') {
            LocalEmploeesService.delete(this.employee)
            }
          this.alertModalTitle = response.data.status
          this.alertModalContent = response.data.message
          this.$refs.alertModal.show()
        }).catch(() => {
          this.alertModalTitle = 'Error'
          this.alertModalContent = 'Unable to delete database record'
          this.$refs.alertModal.show()
        })
      },
      onOkConfirm() {
        this.$router.push({ name: 'EmployeeList' })
      },
      onDeleteModalHide() {
      this.selectedEmployeeId = null
    }
    }
  }
</script>
