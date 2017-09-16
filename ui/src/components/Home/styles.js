import styled from 'styled-components'
import { font } from '../../styles';

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background: ${p => p.bg};
`

export const Title = styled.h1`
  ${font.family}
  ${font.rainbow}
  text-align: center;
  letter-spacing: 6px;
  text-transform: uppercase;
  font-weight: 300;
`

export const SubTitle = styled.h3`
  ${font.family}
  text-align: center;
  letter-spacing: 3px;
  text-tansform: uppercase;
  color: black;
  font-weight: 100;
  margin: 0 0 20px 0;
`
