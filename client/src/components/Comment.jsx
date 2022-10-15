import styled from 'styled-components';
import React from 'react'



const Container = styled.div`
   display: flex;
   gap: 10px;
   margin: 30px 0px;
`;

const AvtarImage = styled.img`
   width: 50px;
   height: 50px;
   border-radius: 50%;
`;

const Details = styled.div`
    display:flex;
    flex-direction: column;
    gap: 10px;
    color: ${({ theme }) => theme.text};
`

const Name = styled.span`
    font-size:13px;
    font-weight: 500;
`;

const Date = styled.span`
    font-size:12px;
    font-weight: 400;
    color: ${({ theme }) => theme.textSoft};
    margin-left: 5px;
`;

const Text = styled.span`
    font-style: 14px;            
`;

const Comment = ({comment}) => {
  return (
    <Container>
      <AvtarImage src='' />
      <Details>
        <Name>Mr_heartcracker <Date>1 Day ago </Date></Name>
        <Text>
          {comment.description}
        </Text>
      </Details>
    </Container>
  )
}

export default Comment
//comments schema 