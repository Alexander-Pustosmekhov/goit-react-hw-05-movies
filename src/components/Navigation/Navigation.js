import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import s from './Navigation.module.css';
import { constants } from 'helpers/constants';

const { home, movies } = constants;

const StyledLink = styled(NavLink)`
  color: black;

  &.active {
    color: orange;
  }
`;

export default function Navigation() {
  return (
    <nav className={s.nav}>
      <StyledLink to={home} className={s.home}>
        Home
      </StyledLink>
      <StyledLink to={movies} className={s.movies}>
        Movies
      </StyledLink>
    </nav>
  );
}
