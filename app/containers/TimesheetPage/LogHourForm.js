import React from 'react';
import styled from 'styled-components';
import PropType from 'prop-types';

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-left: 20%;
  margin-right: 20%;
`;

const FormTitle = styled.div`
`;

const FormActions = styled.div`
  display: flex;
  justify-content: center;
`;

const H1 = styled.h1`
  text-align: center;
`;

const FormAction = styled.button`
  font-size: 1.1rem;
  width: 100%;
`;

const FormActionWrapper = styled.div`
  width: 100%;
`;

function LogHourForm({ history }) {
  return (
    <Wrapper>
      <FormTitle><H1>Add Time</H1></FormTitle>

      <div className="field">
        <label htmlFor="project" className="label">Your Projects</label>
        <div id="project" className="control">
          <div className="select">
            <select>
              <option>Choose a project</option>
              <option>Project A</option>
              <option>Project B</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label htmlFor="activities" className="label">Activities</label>
        <div id="activities" className="control">
          <div className="select">
            <select>
              <option>Choose an activity</option>
              <option>Activity A</option>
              <option>Activity B</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label htmlFor="timelast" className="label">How long it last?</label>
        <div id="timelast" className="control">
          <input type="text" className="input" placeholder="blabla" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="desc" className="label">Description</label>
        <div id="desc" className="control">
          <textarea type="text" className="textarea" />
        </div>
      </div>

      <FormActions>
        <FormActionWrapper className="control">
          <FormAction className="button is-primary">Submit</FormAction>
        </FormActionWrapper>
        <FormActionWrapper className="control">
          <FormAction className="button" onClick={() => history.push('/')} >Cancel</FormAction>
        </FormActionWrapper>
      </FormActions>
    </Wrapper>
  );
}

LogHourForm.propTypes = {
  history: PropType.object,
};

export default LogHourForm;
