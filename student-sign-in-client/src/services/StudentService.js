import axios from 'axios'

const base_url = '/api/students'

export default {
    
    getAllStudents(){
        return axios.get(base_url).then( response => {
            return response.data
        })
    },
    addStudent(student){
        return axios.post(base_url, student).then( response => {
            return response.data
        })
    },
    updateStudent(student){
        // ex: api/student/3
        return axios.patch(`${base_url}/${student.id}`, student).then (response => {
            return student.data
        })
    },
    deleteStudent(id) {
        return axios.delete('/api/students/' + id).then(response => {
            return response.data 
        })
    }
}