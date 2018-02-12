import React from 'react'
import styled from 'styled-components';
import ProjectPerson from './ProjectPerson';

const ProjectNameWrapper = styled.h3`
`;

const ProjectDescriptionWrapper = styled.div`
  margin-top: 1rem;
`;

const ProjectDescriptionHeader = styled.h4`
`;

const ProjectDescriptionContent = styled.div`
`;

const ProjectPeopleWrapper = styled.div`
  margin-top: 2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectPeopleHeader = styled.h4`
  display: block;
  flex-grow: 0;
`
const ProjectPeopleContent = styled.div`
  flex-grow: 1;
  border-left: 1px solid black;
  border-top: 1px solid black;
  border-right: 1px solid black;
  margin-right: 2rem;
  padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const renderPeople = (people) => (
  people.map((person) => (
    <ProjectPerson person={person} key={`${person.name}-${person.position}`} />
  ))
);

export default (props) => {
  const { project } = props;

  if (!project) {
    return <div></div>;
  }

  return (
    <div style={{ flexGrow: '1', display: 'flex', flexDirection: 'column' }}>
      <ProjectNameWrapper>
        {project.name}
      </ProjectNameWrapper>
      <ProjectDescriptionWrapper>
        <ProjectDescriptionHeader>Description</ProjectDescriptionHeader>
        <ProjectDescriptionContent>
          <p>{project.description}</p>
        </ProjectDescriptionContent>
      </ProjectDescriptionWrapper>
      <ProjectPeopleWrapper>
        <ProjectPeopleHeader>People</ProjectPeopleHeader>
        <ProjectPeopleContent>
          { renderPeople(project.people) }
        </ProjectPeopleContent>
      </ProjectPeopleWrapper>
    </div>
  );
};
