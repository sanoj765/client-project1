import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import ausloggenImage from "../../views/ausloggen.png";

const AllContainer = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  left: 0%;
  bottom: 0%;
  height: 100%;
`;

const TopContainer = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  left: 0%;
  top: 0%;
  padding-top: 100px;
  height: 100px;
`;

const CenterContainer = styled.div`
  width: 60%;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  left: 20%;
  bottom: 0%;
  padding-top: 100px;
  height: calc(100% - 100px);
  border-top: solid #A89D2A;
  background-color: rgb(0, 0, 0, 0.6);
  overflow: hidden;
`;

const MidWindow = styled.div`
  width: 50%;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  left: 25%;
  bottom: 0%;
  padding-top: 100px;
  height: 100%;
  border: solid black;
  overflow: hidden;
`;

const TopRightWindow = styled.div`
  width: 25%;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  left: 75%;
  bottom: 50%;
  padding-top: 100px;
  height: 50%;
  border: solid black;
  overflow: hidden;
`;

const BottomRightWindow = styled.div`
  width: 25%;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  left: 75%;
  bottom: 0%;
  padding-top: 100px;
  height: 50%;
  border: solid black;
  overflow: hidden;
`;

const TopLeftWindow = styled.div`
  width: 25%;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  left: 0%;
  bottom: 50%;
  padding-top: 100px;
  height: 50%;
  border: solid black;
  overflow: hidden;
`;

const BottomLeftWindow = styled.div`
  width: 25%;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  left: 0%;
  bottom: 0%;
  padding-top: 100px;
  height: 50%;
  border: solid black;
  overflow: hidden;
`;

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
  max-height: 100%;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CircleButton = styled.button`
  &:hover {
    transform: scale(1.2);
  }
  padding: 6px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  border: none;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.7 : 1)};
  background: #A89D2A;
  transition: all 0.8s ease;
  color: #800032;
  overflow: hidden;
  position: absolute;
  right: 5%;
  top: 20%;
  background-image: url(${ausloggenImage});
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center;
  overflow:auto;
`;

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      users: null
    };
  }

  logout() {
    localStorage.removeItem('token');
    this.props.history.push('/login');
  }

  async componentDidMount() {
    try {
      const response = await api.get('/users');
      // delays continuous execution of an async operation for 1 second.
      // This is just a fake async call, so that the spinner can be displayed
      // feel free to remove it :)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get the returned users and update the state.
      this.setState({ users: response.data });

      // This is just some data for you to see what is available.
      // Feel free to remove it.
      console.log('request to:', response.request.responseURL);
      console.log('status code:', response.status);
      console.log('status text:', response.statusText);
      console.log('requested data:', response.data);

      // See here to get more data.
      console.log(response);
    } catch (error) {
      alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
    }
  }

  render() {
    return (
      <AllContainer>
      <TopContainer>
        <CircleButton
            onClick={() => {
              this.logout();
            }}
        ></CircleButton>
      </TopContainer>
      <CenterContainer>
      <TopLeftWindow>
        {!this.state.users ? (
            <Spinner />
        ) : (
            <div>
              <Users>
                {this.state.users.map(user => {
                  return (
                      <PlayerContainer key={user.id}>
                        <Player user={user} />
                      </PlayerContainer>
                  );
                })}
              </Users>
            </div>
        )}
      </TopLeftWindow>
      <TopRightWindow></TopRightWindow>
      <BottomLeftWindow></BottomLeftWindow>
      <BottomRightWindow></BottomRightWindow>
      <MidWindow>
      <Container>
        <h2>Happy Coding! </h2>
        <p>Get all users from secure end point:</p>
      </Container>
      </MidWindow>
      </CenterContainer>
      </AllContainer>
    );
  }
}

export default withRouter(HomeScreen);
