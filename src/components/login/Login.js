import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import { BaseContainer } from '../../helpers/layout';

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
`;

const Form = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  background: rgb(0, 0, 0, 0.6);
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: #800032;
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: #800032;
`;

const Label = styled.label`
  color: #800032;
  text-shadow: 0.5px 0.5px 1px #800032;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const SmallLabel = styled.button`
  color: #A89D2A;
  font-size: 9pt;
  margin-bottom: 10px;
  text-transform: uppercase;
  text-align: center;
  border: none;
  background-color: inherit;
  padding: 14px 28px;
  cursor: pointer;
  display: inline-block;
  background: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class Login extends React.Component {
  /**
   * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
   * The constructor for a React component is called before it is mounted (rendered).
   * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
   * These fields are then handled in the onChange() methods in the resp. InputFields
   */
  constructor() {
    super();
    this.state = {
      password: null,
      username: null
    };
  }
  /**
   * HTTP POST request is sent to the backend.
   * If the request is successful, a new user is returned to the front-end
   * and its token is stored in the localStorage.
   */
  async login() {
    try {
      const requestBody = JSON.stringify({
        username: this.state.username,
        password: this.state.password
      });
      const response = await api.put('/users', requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      localStorage.setItem('token', user.token);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      this.props.history.push(`/game`);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  }

  toRegister(){
    this.props.history.push(`/register`);
  }

  /**
   *  Every time the user enters something in the input field, the state gets updated.
   * @param key (the key of the state for identifying the field that needs to be updated)
   * @param value (the value that gets assigned to the identified state key)
   */
  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
  }

  /**
   * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
   * Initialization that requires DOM nodes should go here.
   * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
   * You may call setState() immediately in componentDidMount().
   * It will trigger an extra rendering, but it will happen before the browser updates the screen.
   */
  componentDidMount() {}

  render() {
    return (
      <BaseContainer>
        <FormContainer>
          <Form>
            <Label>Username</Label>
            <InputField
              placeholder="Enter here.."
              onChange={e => {
                this.handleInputChange('username', e.target.value);
              }}
            />
            <Label>Password</Label>
            <InputField
              placeholder="Enter here.."
              onChange={e => {
                this.handleInputChange('password', e.target.value);
              }}
            />
            <ButtonContainer>
              <Button
                disabled={!this.state.username || !this.state.password}
                width="50%"
                onClick={() => {
                  this.login();
                }}
              >
                Login
              </Button>
            </ButtonContainer>
            <SmallLabel
                onClick={() => {
                  this.toRegister();
                }}
            >You don't have an account? Click here!</SmallLabel>
          </Form>
        </FormContainer>
      </BaseContainer>
    );
  }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Login);
