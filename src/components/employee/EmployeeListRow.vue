<template>
  <tr @dblclick="onRowDblclick">
    <td>{{ employee.employee_name }}</td>
    <td>{{ employee.employee_salary }}</td>
    <td>{{ employee.employee_age }}</td>
  </tr>
</template>
<script>
  export default {
    name: 'EmpoyeeListRow',
    props: [ 'employee' ],
    methods: {
      onDetailsClick() {
        this.$emit('detailsEmployee', this.employee.id)
      },
      onUpdateClick() {
        this.$emit('updateEmployee', this.employee.id)
      },
      onDeleteClick() {
        this.$emit('deleteEmployee', this.employee.id)
      },
      onRowDblclick() {
        this.$emit('dblClickRow', this.employee.id)
      }
    }
  };
</script>
