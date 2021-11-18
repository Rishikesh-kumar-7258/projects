import React, { Component } from 'react';


class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      tasks : [],
      activeItem : {
        id : null,
        title : '', 
        completed : false,
      },
      editing : false,
    }

    this.fetchTask = this.fetchTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCookie = this.getCookie.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.strikeUnstrike = this.strikeUnstrike.bind(this);
  }

  getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

  componentDidMount()
  {
    this.fetchTask()
  }

  fetchTask()
  {
    let url = 'http://127.0.0.1:8000/api/taskList/'
    fetch(url)
    .then(response => response.json())
    .then(data => 
      this.setState({
        tasks : data,
      })
    )
  }

  handleChange(e)
  {
    let value = e.target.value

    this.setState({
      activeItem : {
        ...this.state.activeItem,
        title : value
      }
    })
  }

  handleSubmit(e)
  {
    e.preventDefault();

    let url = 'http://127.0.0.1:8000/api/taskAdd';
    let csrf = this.getCookie('csrftoken');

    if (this.state.editing === true)
    {
      url = `http://127.0.0.1:8000/api/taskEdit/${this.state.activeItem.id}`;
      this.setState({
        editing : false
      })
    }

    fetch(url, {
      'method' : "POST",
      'headers' : 
      {
        'Content-type' : 'application/json',
        'X-CSRFToken' : csrf
      },
      'body' : JSON.stringify(this.state.activeItem)
    }).then((response) => {
      this.fetchTask();
      this.setState({
        activeItem : {
          id : null,
          title : '', 
          completed : false,
        }
      })
    }).catch(error => console.log(error))
  }

  startEdit(task){
    this.setState({
      activeItem : task,
      editing : true
    })
  }
  
  deleteItem(task)
  {
    let csrf = this.getCookie('csrftoken');

    fetch(`http://127.0.0.1:8000/api/taskDelete/${task.id}`, {
      'method' : 'DELETE',
      'headers' : {
        'Content-type' : 'application/json',
        'X-CSRFToken' : csrf
      }
    }).then( response => {
      this.fetchTask()
    })
  }


  strikeUnstrike(task){
    task.completed = !task.completed;

    let csrf = this.getCookie('csrftoken');
    let url = `http://127.0.0.1:8000/api/taskEdit/${task.id}`;

    fetch(url, {
      'method' : 'POST',
      'headers' : {
        'Content-type' : 'application/json',
        'X-CSRFToken' : csrf
      },
      'body' : JSON.stringify(task)
    })
    .then(response => this.fetchTask())
  }


  render() {

    let tasks = this.state.tasks;
    let self = this

    return (
      <div className="container mt-5">
        <ul class="list-group">
          <li className="list-group-item p-3 bg-dark">
            <form onSubmit={this.handleSubmit} className='d-flex'>
              <div class="form-floating mb-3" style={{flex:7}}>
                <input type="title" onInput={this.handleChange} class="form-control" value={this.state.activeItem.title} id="titel" placeholder="Enter title"/>
                <label for="title">Enter the task</label>
              </div>
              <input type="submit" value="Add" className="btn btn-success fw-bolder form-control" style={{flex:2}}/>
            </form>
          </li>
          
          {tasks.map((element, index) => {
            return (
              <li  key={index} className="list-group-item d-flex">
                <div style={{flex:7}} onClick={() => self.strikeUnstrike(element)}>
                  {element.completed === false ? (
                    
                    <span>{element.title}</span>

                  ) : (
                    <strike>{element.title}</strike>
                  )}
                </div>
                
                <div style={{flex:1}}>
                  <input type="submit" onClick={() => self.startEdit(element)} className="btn btn-outline-success" value="Edit"/>
                </div> 
                <div style={{flex:1}}>
                  <input type="submit" onClick={() => self.deleteItem(element)} className="btn btn-outline-danger" value="Delete"/>
                </div> 
              </li>
            )
          })}

        </ul>
      </div>
    )
  }
};

export default App;