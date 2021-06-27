import * as React from "react";
import { RouteProps } from "react-router-dom";
import styled from "styled-components";
const Title = styled.h1`
  font-size: 1.5em;
  color: #747676;
  text-align: center;
  padding: 10px;
`;

const CenterDiv = styled.div`
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 70%;
  overflow-y: scroll;
`;
const Item = styled.div`
  height: 20px;
`;


export interface DashBoardProps {
}
export interface DashBoardState {
}

export const DashBoard: React.FC<RouteProps> = (props: RouteProps) => {
    const [msg, Setmsg] = React.useState<any>();
    let ws = new WebSocket('ws://city-ws.herokuapp.com');
  React.useEffect(() => {
    ws.onopen = () => console.log('ws opened');
    ws.onclose = () => console.log('ws closed');  
    ws.onmessage = (e:any) => {
      const message = JSON.parse(e.data);
      Setmsg(message);
    };
    return () => {
      ws.close();
    }
  }, []);



    return (
      <>
        <Title>
          Welcome to Air Quality Index
        </Title>
        <CenterDiv>
          {Array.isArray(msg) && msg.map((ms:any)=>{
           return(
           <>
              <div>{ms.city}</div>
              <div> {ms.aqi} </div>
            </>
           )
          })}
        </CenterDiv>
      </>
    );
}
