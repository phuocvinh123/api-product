import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const Link = styled(RouterLink)`
  /* color: ${(p) => p.theme.primary}; */
  color: black;
  text-decoration: none;

  &:hover {
    text-decoration: none;
    opacity: 0.8;
    color: ${(p) => p.theme.primary};
  }

  &:active {
    opacity: 0.4;
    color: ${(p) => p.theme.primary};
  }
`;
