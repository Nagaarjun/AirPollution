import * as React from "react";
import { Col, Row } from "react-bootstrap";
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

const Green = styled(Col)`
  color:green;
`;

const Lightgreen = styled(Col)`
  color:lightgreen;
`;

const Yellow = styled(Col)`
  color:yellow;
`;
const Orange = styled(Col)`
  color:orange;
`;
const Lightred = styled(Col)`
  color:lightred;
`;
const Red = styled(Col)`
  color:red;
`;

export interface DashBoardProps {
}
export interface DashBoardState {
}

export const DashBoard: React.FC<RouteProps> = (props: RouteProps) => {
    const [msg, Setmsg] = React.useState<any>({});
    let pollutionObject:any = {};
    let ws = new WebSocket('ws://city-ws.herokuapp.com');

  React.useEffect(() => {
    ws.onopen = () => console.log('ws opened');
    ws.onclose = () => console.log('ws closed');  
    ws.onmessage = (e:any) => {
      const message = JSON.parse(e.data);
      Array.isArray(message) && message.forEach((ms:any)=>{
        pollutionObject[ms.city]= ms.aqi;
      })
      Setmsg((prev:any) => {return {...prev, ...pollutionObject}});
    };
    return () => {
      ws.close();
    }
  }, []);

  const getClassName = (value:number)=>{
    if(value>=0 && value<=50) return "green"
    if(value>=51 && value<=100) return "lightgreen"
    if(value>=101 && value<=200) return "yellow"
    if(value>=201 && value<=300) return "orange"
    if(value>=301 && value<=400) return "lightred"
    if(value>=401 && value<=500) return "red"
    return "";
  }

    return (
      <>
        <Title>
          Welcome to Air Quality Index
        </Title>
        <CenterDiv>
          {Object.keys(msg).map((key, i) => {
            return(
              <Row key={i}>
                <Col>{key}</Col>
                {msg[key]>=0 && msg[key]<=50 && <Green>{msg[key]}</Green>}
                {msg[key]>=51 && msg[key]<=100 && <Lightgreen>{msg[key]}</Lightgreen>}
                {msg[key]>=101 && msg[key]<=200 && <Yellow>{msg[key]}</Yellow>}
                {msg[key]>=201 && msg[key]<=300 && <Orange>{msg[key]}</Orange>}
                {msg[key]>=301 && msg[key]<=400 && <Lightred>{msg[key]}</Lightred>}
                {msg[key]>=401 && msg[key]<=500 && <Red>{msg[key]}</Red>}
              </Row>
            )
          })}
        </CenterDiv>
      </>
    );
}
