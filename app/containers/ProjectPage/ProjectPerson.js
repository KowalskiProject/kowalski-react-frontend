import React from 'react'
import styled from 'styled-components';

const PersonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  margin: 1.3rem;
`;

const PersonPictureContainer = styled.div`
  width: 125px;
`;

const P = styled.p`
  font-size: 0.8rem;
`
const Img = styled.img`
  max-height: 100%;
  max-width: 100%;
  margin: auto;
`;

export default (props) => {
  const { person } = props;

  return (
    <PersonContainer>
      <PersonPictureContainer>
        <Img src={person.pictureUrl} alt={`${person.name}'s picture`} />
      </PersonPictureContainer>
      <P>{person.name}</P>
      <P>{person.position}</P>
    </PersonContainer>
  );
};
