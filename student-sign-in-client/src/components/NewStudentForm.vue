<template>
    
    <div>
        <div class="alert alert-danger" v-show="errors.length > 0 ">
            <li v-for="error in errors">{{error}}</li>
        </div>

        <div class="card add-student m-2 p-2">
            <h4 class="card-title">Add new student</h4>

            <!-- ! this is where the form starts -->
            <div class="form-group">
                <label for="name">Name</label>
                <!-- ? adding v-model.trim (modifier) trim off the whitespaces -->
                <!-- ? will need to add an errors property in the Vue JS -->
                <input id="name" class="form-control" v-model.trim="newStudentName">
            </div>
            <div class="form-group">
                <label for="starID">Star ID</label>
                <input id="starID" class="form-control" v-model.trim="newStarID">
            </div>

            <!-- ! This is the button section -->
            <button class="btn btn-primary" v-on:click.prevent="addStudent">Add</button>
        </div>

    </div>



</template>

<script>

export default {
    name: 'NewStudentForm',
    data(){
        return{
            newStudentName: '',
            newStarID: '',
            errors: []

        } 
    },
    methods: {
        addStudent(){
            this.errors = []
            if (this.newStudentName && this.newStarID) {
                let student = { name: this.newStudentName, starID: this.newStarID, present: false };
                // emit message to parent with info about new student.
                this.$emit('student-added', student);
                this.newStudentName = '';
                this.newStarID = '';
            } else {
                this.errors.push('Name and StarID are required.')
            }

        }
    }
}


</script>




<style>



</style>