import React, { Component } from 'react'
import axios from '../config/axios'

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Home extends Component {
    state = {
        tasks: [],
        selectedId : 0
    }

    addTask = (userid) => {
        const todo = this.task.value
        const completed = false
        console.log(todo);
        

        // Post task baru

        axios.post (
            '/tasks/',
            {
                userid,
                todo, // persingkat
                completed
            }
        ).then ( () => {
            // get tasks
            this.getTasks()
        }).catch((err) =>{
        })
    }

    changeTaskDone = (tasks) => {
        console.log(tasks);
        
        axios.patch( `/tasks/` + tasks,{
            completed : true
        }).then((res) => {
            this.getTasks()
        }).catch((err) => {
            console.log(err);
        })
    }

    changeTaskCancel = (tasks) => {
        console.log(tasks);
        
        axios.patch( `/tasks/` + tasks,{
            completed : false
        }).then((res) => {
            this.getTasks()
        }).catch((err) => {
            console.log(err);
        })
    }

    deleteTask = (id) => {
        axios.delete('/tasks/' + id)
        .then(() => {
            this.getTasks()
        })
    }

    getTasks = (id) => {
        const user = this.props.userid         
        axios.get('/tasks/',{
            params : {
                userid : user
            }
        }).then(res => {
            console.log(res);
            this.setState({tasks: res.data}) // Tampilkan Tugas di Halaman
        }).catch((err) => {
            console.log(err);
        })
    }

        componentDidMount(){
            // Get Tasks
            this.getTasks()
        }
    
        renderTasks = () => {
            return this.state.tasks.map(task => {
                if(!task.completed){
                    return (
                        <li className='list-group-item d-flex justify-content-between'>
                            <span>{task.todo}</span>
                            <span>
                            <button 
                                className='btn btn-outline-primary'
                                onClick={() => {this.changeTaskDone(task.id)}}>
                                Done
                            </button>
                            <button 
                                className='btn btn-outline-primary'
                                onClick={() => {this.deleteTask(task.id)}}>
                                Delete
                            </button>
                        </span>
                    </li>
                )
            }
    
                return (
                    <li className='list-group-item d-flex justify-content-between bg-warning'>
                        <span>{task.todo}</span>
                        <span>
                        <button 
                            className='btn btn-outline-primary'
                            onClick={() => {this.changeTaskCancel(task.id)}}>
                            Not Done
                        </button>
                        </span>
                    </li>
                )
            })
        }
    
        render() {
            // Jika user sudah login
            if(this.props.userid){
                return (
                    <div className="container">
                            <h1 className="display-4 text-center animated bounce delay-1s">List Tasks</h1>
                            
                            <form className="form-group mt-5">
                                <input type="text" className="form-control" placeholder="What do you want to do?" 
                                defaultValue={''} ref={input => this.task = input}/>
                            </form>

                            <button type="submit" className="btn btn-block btn-primary mt-3" 
                                onClick={() => this.addTask(this.props.userid)}>Masukkan Tugas!
                            </button>

                            <ul className="list-group list-group-flush mb-5">
                                {this.renderTasks()}
                            </ul>

                            </div>
                )
            }
    
            return <Redirect to='/login'/>
            
        }
    }
    
    const mapToProps = state => {
        return {
            userid: state.auth.id
        }
    }
    
    export default connect(mapToProps)(Home)