import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';

import Seat from './Seat';
import { SeatContext } from './SeatContext';

function TicketWidget() {
  const {
    state: { hasLoaded, seats, numOfRows, seatsPerRow },
  } = React.useContext(SeatContext);

  console.log("seats received");

  const getSeat = (seatID) => {
    
    for (let index = 0; index < seats.length; index++) {//don't use foreach for this one


      const seat = seats[index];
      if(seat._id === seatID){

        return seat;
      }
    }

  }

  if (!hasLoaded) {
    return <CircularProgress />;
  }
  // console.log(hasLoaded, seats, numOfRows, seatsPerRow);
  else if(hasLoaded){
    console.log("HAS BEEN LOADED", getSeat('A-1'));
    return (
      <Wrapper>
        {range(numOfRows).map((rowIndex) => {
          const rowName = getRowName(rowIndex);

          return (
            <Row key={rowIndex}>
              <RowLabel>Row {rowName}</RowLabel>
              {range(seatsPerRow).map((seatIndex) => {
                const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                const seat = seats[seatId];
                // const seat = getSeat(seatId);

                console.log("the seat inside render", seat);
                console.log("seatID", seatId);

                return (
                  <SeatWrapper key={seatId}>
                    <Seat
                      rowIndex={rowIndex}
                      seatIndex={seatIndex}
                      width={36}
                      height={36}
                      price={seat.price}
                      status={seat.isBooked ? 'unavailable' : 'available'}
                    />
                  </SeatWrapper>
                );
              })}
            </Row>
          );
        })}
      </Wrapper>
    );
  }
  else {
    return (<div>nothing</div>)
  }
}

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  transform: translateX(calc(-100% - 30px));
  font-size: 14px;
  color: white;
  font-weight: bold;
  line-height: 46px;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

export default TicketWidget;
