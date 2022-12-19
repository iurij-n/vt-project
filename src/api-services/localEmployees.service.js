export default {
  
    create(data) {
        let localStorageData = JSON.parse(localStorage.getItem('localEmployeeList'))
        let id = localStorageData.slice(-1)[0].id+1
        localStorageData.push({"id":id,"employee_name":data.name,"employee_salary":data.salary,"employee_age":data.age,"profile_image":""})
        localStorage.setItem('localEmployeeList', JSON.stringify(localStorageData))
    },

    get_local_employee_details(id) {
        let localStorageData = JSON.parse(localStorage.getItem('localEmployeeList'))
        for(let i=0; i<localStorageData.length; i++) {
            if(localStorageData[i].id == id) {
            return localStorageData[i]
            }
        }
      },
    
    update(id, data) {
        let localStorageData = JSON.parse(localStorage.getItem('localEmployeeList'))
        for(let i=0; i<localStorageData.length; i++) {
            if(localStorageData[i].id == id) {
            localStorageData[i].employee_name = data.name
            localStorageData[i].employee_salary = data.salary
            localStorageData[i].employee_age = data.age
            }
        }
        localStorage.setItem('localEmployeeList', JSON.stringify(localStorageData))
    },
  
    delete(employee) {
        let localStorageData = JSON.parse(localStorage.getItem('localEmployeeList'))
        for(let i=0; i<localStorageData.length; i++) {
            if(localStorageData[i].id == employee.id) {
            localStorageData.splice(i, 1)
            break
            }
        }
        localStorage.setItem('localEmployeeList', JSON.stringify(localStorageData))
    }
  }