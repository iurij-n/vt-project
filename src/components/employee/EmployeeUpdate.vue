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
    EmploeesService.get_employee_details(this.$router.currentRoute.params.id).then((response) => {
        this.formData.name = response.data.data.employee_name
        this.formData.salary = response.data.data.employee_salary
        this.formData.age = response.data.data.employee_age
        })
  },
  methods: {
    updateEmployee() {
        EmploeesService.update(this.$router.currentRoute.params.id, this.formData).then((response) => {
        this.isSuccessfully = true
        this.alertModalTitle = response.data.status
        this.alertModalContent = response.data.message
        this.$refs.alertModal.show()
      }).catch((error) => {
        this.isSuccessfully = false
        this.alertModalTitle = 'Error'
        this.alertModalContent = error.response.data
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