import React, { Component } from 'react';


class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      tasks : [],
      activeItem : {
        id : null,
        title : null, 
        completed : false,
      },
      editing : false,
    }

    this.fetchTask = this.fetchTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCookie = this.getCookie.bind(this);
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
    let url = 'http://127.0.0.1:8000/taskList/'
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

    let url = 'http://127.0.0.1:8000/taskAdd';
    let csrf = this.getCookie('csrftoken');

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


  render() {

    let tasks = this.state.tasks;

    return (
      <div className="container mt-5">
        <ul class="list-group">
          <li className="list-group-item p-3 bg-dark">
            <form onSubmit={this.handleSubmit} className='d-flex'>
              <div class="form-floating mb-3" style={{flex:7}}>
                <input type="title" onInput={this.handleChange} class="form-control" id="titel" placeholder="Enter title"/>
                <label for="title">Enter the task</label>
              </div>
              <input type="submit" value="Add" className="btn btn-success fw-bolder" style={{flex:2}}/>
            </form>
          </li>
          
          {tasks.map((element, index) => {
            return (
              <li  key={index} className="list-group-item d-flex">
                <div style={{flex:7}}>
                {element.title}
                </div>
                
                <div style={{flex:1}}>
                  <input type="submit" className="btn btn-outline-success" value="Edit"/>
                </div> 
                <div style={{flex:1}}>
                  
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