import styled from 'styled-components';

export const Wrapper = styled.header`
  padding: 20px 10px 10px 10px;
  margin: 0;
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.h1`
  font-size: 1.6em;
  margin: 0;
  color: ${props => props.theme.colors.primary};
`;

export const AddIcon = styled.a`
  font-size: 2em;
  float: right;
  line-height: 20px;
  transition: all 300ms;
  color: ${props => props.theme.colors.primary};

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;
