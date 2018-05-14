import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 1rem;
  flex-grow: 1;
`;

export default function ProjectPaneLoadingError({ loadingError }) {
  if (!loadingError) {
    return <div></div>;
  }

  return (
    <Container className="control">
      <article className="message is-danger">
        <div className="message-body">
          { loadingError }
        </div>
      </article>
    </Container>
  );
}

ProjectPaneLoadingError.propTypes = {
  loadingError: PropTypes.string,
};
