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
                <!-- <employee-list-row
                  v-for="employee in employees"
                  :key="employee.id"
                  :employee="employee"
                  @dblClickRow="dblClickRow"/> -->
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
      // console.log('employees', this.employees)
      // console.log(!localStorage.getItem('dataLocalStorage'))
      // this.dataLocalStorage.push(this.employees)
      // this.dataLocalStorage = this.employees
      // console.log(this.dataLocalStorage)
      // localStorage.localEmployeeList = this.dataLocalStorage
      // // console.log('localStorage.localEmployeeList', localStorage.localEmployeeList)
      // const parsed = JSON.stringify(this.dataLocalStorage)
      // localStorage.setItem('localEmployeeList', parsed)
      // console.log('localStorage.localEmployeeList', localStorage.localEmployeeList)


    //   if(localStorage.getItem('dataLocalStorage')) {
    //   try {
    //     this.dataLocalStorage = JSON.parse(localStorage.getItem('cats'));
    //   } catch(e) {
    //     localStorage.removeItem('cats');
    //   }
    // }
      // if(!localStorage.getItem('dataLocalStorage')) {
      //   this.dataLocalStorage = this.employees
      //   const parsed = JSON.stringify(this.dataLocalStorage)
      //   localStorage.setItem('localEmployeeList', parsed)
      //   console.log('localStorage.localEmployeeList', localStorage.localEmployeeList)
      // }
      console.log('this.dataLocalStorage -', this.dataLocalStorage.length)
      if(!this.dataLocalStorage.length) {
        this.dataLocalStorage = response.data.data
        const parsed = JSON.stringify(this.dataLocalStorage)
        localStorage.setItem('localEmployeeList', parsed)
        console.log('localStorage.localEmployeeList', localStorage.localEmployeeList)
      }
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
