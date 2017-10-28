import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: '',
      error: ''
    }
  }
  componentDidMount() {
    console.log('id is: ', this.props.match.params.id);
    const group_id = this.props.match.params.id;
    axios.get(`/api/v1/groups/${group_id}`)
      .then(({ data }) => {
        this.setState({
          group: data
        })
      })
      .catch((error) => {
        this.setState({
          error
        })
      })
  }
  joinGroup = (e) => {
    e.preventDefault();
    const { user_id, group_id } = this.state;
    const data = { user_id, group_id };
    console.log('stop');
    axios.post('/api/v1/user-groups', {})
    .then( res => {
      this.setState({
        name: '',
        description: '',
        fireRedirect: true
      });
    })
    .catch( error => {
      this.setState({ error })
    })
  }

  render() {
    const { group, error } = this.state;
    return (
      <div>
        <h1>Hello from Group</h1>
        <Link to={'/'} > Go Back </Link>
        <div>
          {
            !!group ?
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Member?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{group.name}</td>
                    <td>{group.description}</td>
                    <td><button type="submit" onClick={this.joinGroup}>Join</button></td>
                  </tr>
                </tbody>
              </table> :
              <div>Loading</div>
          }
          {error && <div>{error}</div>}
        </div>
      </div>
    );
  }
}