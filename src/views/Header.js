import React from "react";
import styled from "styled-components";
import shieldImage from "./medshieldYellow.png";

/**
 * Using styled-components you can visual HTML primitives and use props with it!
 * The idea behind this external package, it's to have a better structure and overview for your HTML and CSS
 * Using styled-components, you can have styling conditions using the following syntax: ${props => ...}
 * https://www.styled-components.com/
 */
const ShieldPicture = styled.div`
  background-image: url(${shieldImage});
  background-position: center;
  height: 100%;
  width: 6%;
  background-repeat: no-repeat;
  background-size: 100%;
  overflow:auto;
`;

const Container = styled.div`
  height: ${props => props.height}px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #800032;
`;

const Title = styled.h1`
  font-weight: bold;
  color: #A89D2A;
  text-align: center;
`;
/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
const Header = props => {
  return (
    <Container height={props.height}>
      <Title>Medieval </Title>
        <ShieldPicture></ShieldPicture>
        <Title> Warfare</Title>
    </Container>
  );
};

/**
 * Don't forget to export your component!
 */
export default Header;
