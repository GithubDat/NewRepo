import React, { Component } from 'react';

import axios from 'axios';
import {
  TextField
} from 'office-ui-fabric-react/lib/TextField';
import { DocumentCard } from 'office-ui-fabric-react/lib/DocumentCard';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

import '../assets/stylesheets/User.css';


class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      user: []
    };
    { this._getUser(this.state.userId) }
  }

  componentDidMount() {
    //   return (
    //   {_getUser}
    //   );
  }

  _getUser = () => {
    const userid = this.state.userId;
    axios.get(`https://reqres.in/api/users/` + userid)
      .then(response => {
        const user = response.data.data;
        console.log('Resp:', response);

        console.log('Resp Data:', response.data.data);
        this.setState({ user: user });
      })
  }

  _validateNumber = (value) => {
    return isNaN(Number(value))
      ? `The value should be a number`
      : '';
  }

  _onChanged = (value) => {
    console.log(value);
    this.setState({ userId: value });
  }

  render() {
    return (
      <div className="user-form">
        <div className="accept-user-container">
          <TextField
            className='accept-user-id'
            label="Enter User ID"
            placeholder="a"
            value={this.state.userId}
            onChanged={this._onChanged}
            onGetErrorMessage={this._validateNumber}
          />
          <PrimaryButton
            className="btn userid__submit"
            text="Get Details"
            onClick={this._getUser}
            type="submit"
          />
        </div>
        <div className="user-card-container">
          <DocumentCard>
            <img className="user-picture" src={this.state.user.avatar} alt="" />
            <div className="details">
              <p className="id">
                ID: {this.state.user.id}
              </p>
              <p className="name">
                Name: {this.state.user.first_name + " " + this.state.user.last_name}
              </p>
            </div>
          </DocumentCard>
        </div>
      </div>
    )
  }
}

export default User;