/**
*
* PeopleFlexGrid
*
*/

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import * as UnknownAvatar from '../../images/unknown_person-202x202.png';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const PersonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 230px;
  height: 230px;
  align-items: center;
  text-align: center;
  margin-botton: -10px;
`;

const PersonPictureContainer = styled.div`
  width: 160px;
  height: 160px;
`;

const PersonImg = styled.img`
  margin: 0 auto;
`;

const PersonNameContainer = styled.span`
  display: block;
`;

function PeopleFlexGrid(props) {
  const { people, personSelected } = props;

  return (
    <Container>
      {
        people.map((person, index) => (
          <PersonContainer
            key={person.get('kUserId')}
            tabIndex={index}
            role="button"
            onClick={() => { personSelected(person.get('kUserId')); }}
          >
            <PersonPictureContainer>
              <PersonImg src={UnknownAvatar} />
            </PersonPictureContainer>
            <PersonNameContainer>
              {person.get('name')}
            </PersonNameContainer>
          </PersonContainer>
        ))
      }
    </Container>
  );
}

PeopleFlexGrid.propTypes = {
  people: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
    kUserId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  personSelected: PropTypes.func,
};

export default PeopleFlexGrid;
