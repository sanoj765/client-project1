import styled from "styled-components";

export const Button = styled.button`
  &:hover {
    background: #800032;
    color: #A89D2A;
  }
  padding: 6px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
  width: ${props => props.width || null};
  height: 35px;
  border: none;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.7 : 1)};
  background: #A89D2A;
  transition: all 0.8s ease;
  color: #800032;
  overflow: hidden;
`;
