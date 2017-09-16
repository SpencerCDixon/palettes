import styled from 'styled-components'
import { font } from '../../styles';
import { reflex } from 'reflexbox';

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background: ${p => p.bg};
`

export const Title = reflex(styled.h1`
  ${font.family}
  ${font.rainbow}
  text-align: center;
  letter-spacing: 6px;
  text-transform: uppercase;
  font-weight: 300;
`);

export const SubTitle = reflex(styled.h3`
  ${font.family}
  text-align: center;
  letter-spacing: 3px;
  text-tansform: uppercase;
  color: black;
  font-weight: 100;
`);
