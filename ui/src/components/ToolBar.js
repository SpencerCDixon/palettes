import { reflex } from 'reflexbox';
import styled from 'styled-components'
import { media } from '../styles';

const ToolBar = styled.div`
  width: 90%;
  margin: 0 auto;
  ${media.tablet`
    margin: 10px auto;
  `}
  ${media.phone`
    width: 100%;
    margin: 10px 0;
  `}
`

export default reflex(ToolBar);
