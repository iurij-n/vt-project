<template>
    <b-container fluid>
      <div class="form-wrapper">
        <b-form @submit.prevent="updateEmployee">
          <b-form-group 
            :label-cols="2" 
            breakpoint="md" 
            horizontal 
            label="Name of the employee:"
            for="name">
            <b-col :md="5">
              <b-input 
                id="name" 
                v-model="formData.name" 
                maxlength="60" 
                required />
            </b-col>
          </b-form-group>
          <b-form-group
              :label-cols="2"
              breakpoint="md"
              horizontal
              label="Employee salary:"
              for="salary">
              <b-col :md="5">
              <b-input
                 id="salary"
                 v-model="formData.salary"
                 maxlength="20"
                 required />
              </b-col>
          </b-form-group>
          <b-form-group
              :label-cols="2"
              breakpoint="md"
              horizontal
              label="Employee age:"
              for="age">
              <b-col :md="5">
              <b-input
                 id="age"
                 v-model="formData.age"
                 maxlength="100"
                 required />
              </b-col>
          </b-form-group>
          <br><br >
          <b-col
            :md="5"
            offset="4">
            <b-button
              type="submit"
              variant="info">Save</b-button>
            <b-button
              :to="{ name: 'EmployeeDetails' }"
              variant="danger">Cancel</b-button>
          </b-col>
         </b-form>
        </div>
        <b-modal
            ref="alertModal"
            :title="alertModalTitle"
            :ok-only="true"
            @ok="onAlertModalOkClick">
            <p class="my-4">{{ alertModalContent }}</p>
        </b-modal>
    </b-container>
</template>

<script>
import EmploeesService from '@/api-services/employees.service'
import LocalEmploeesService from '@/api-services/localEmployees.service'

export default {
  name: 'EmployeeUpdate',
  data() {
    return {
        formData: {
          name: '',
          salary: '',
          age: ''
      },
      alertModalTitle: '',
      alertModalContent: '',
      isSuccessfully: false
    }
  },
  created() {
    EmploeesService.get_employee_details(this.$router.currentRoute.params.id).then(() => {
      this.employee = LocalEmploeesService.get_local_employee_details(this.$router.currentRoute.params.id)
      this.formData.name = this.employee.employee_name
      this.formData.salary = this.employee.employee_salary
      this.formData.age = this.employee.employee_age
    })
  },
  methods: {
    updateEmployee() {
        EmploeesService.update(this.$router.currentRoute.params.id, this.formData).then((response) => {
          if (response.data.status == 'success') {
            LocalEmploeesService.update(this.$router.currentRoute.params.id, this.formData)
            }
        this.isSuccessfully = true
        this.alertModalTitle = response.data.status
        this.alertModalContent = response.data.message
        this.$refs.alertModal.show()
      }).catch((error) => {
        this.isSuccessfully = false
        this.alertModalTitle = 'Error'
        this.alertModalContent = error
        this.$refs.alertModal.show()
      })
    },
    onAlertModalOkClick() {
      if (this.isSuccessfully) {
        this.$router.push({ name: 'EmployeeList' })
      }
    }
  }
}
</script>