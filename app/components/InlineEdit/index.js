/**
*
* InlineEdit
*
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaCheck from 'react-icons/lib/fa/check';
import TiTimes from 'react-icons/lib/ti/times';
import TextareaAutoresize from 'react-autosize-textarea';
import { ClipLoader } from 'react-spinners';

const Container = styled.div`
  display: flex;

  ${({ stateName }) => (
    [STATE_HOVERED, STATE_EDITING].includes(stateName) ? `
      outline: 1px solid grey;
    ` : ''
  )}
`;

const ContentContainer = styled.div`
  display: flex;
  flex-grow: 1;
  position: relative;
  width: 100%;
`;

const ButtonsContainer = styled.a`
  display: none;
  color: inherit;
  margin-right: 5px;
  flex-grow: 0;

  ${({ stateName }) => (
    [STATE_HOVERED, STATE_SAVING].includes(stateName) ? `
      display: block;
    ` : ''
  )}
`;

const EditActionsWrapper = styled.div`
  display: flex;
  flex-grow: 0;
  position: absolute;
  bottom: -28px;
  right: 0px;
`;

const EditButton = styled.div`
`;

const TextArea = styled(TextareaAutoresize)`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const CheckChangesButton = styled.a`
  display: flex;
  color: inherit;
  margin-left: 2px;
  margin-right: 1px;
`;

const DiscardChangesButton = styled.a`
  display: flex;
  color: inherit;
  margin-left: 1px;
  margin-right: 2px;
`;

const STATE_NORMAL = 'STATE_NORMAL';
const STATE_HOVERED = 'STATE_HOVERED';
const STATE_EDITING = 'STATE_EDITING';
const STATE_SAVING = 'STATE_SAVING';

const TextBeingSaved = styled.span`
  font-style: italic;
  color: grey;
`;

class InlineEdit extends Component {
  constructor(props) {
    super(props);
    this.state = { name: props.saving ? STATE_SAVING : STATE_NORMAL, content: props.children };

    this.unhover = this.unhover.bind(this);
    this.hover = this.hover.bind(this);
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.contentChanged = this.contentChanged.bind(this);
    this.dicardChanges = this.dicardChanges.bind(this);
    this.commitChanges = this.commitChanges.bind(this);
    this.renderNormalOrHoveredContent = this.renderNormalOrHoveredContent.bind(this);
    this.renderTextArea = this.renderTextArea.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.saving !== (this.state.name === STATE_SAVING)) {
      this.setState({ ...this.state, name: nextProps.saving ? STATE_SAVING : STATE_NORMAL });
    }
  }

  contentChanged(evt) {
    this.setState({ ...this.state, content: evt.target.value });
  }

  unhover() {
    if (this.state.name === STATE_HOVERED) {
      this.setState({ ...this.state, name: STATE_NORMAL });
    }
  }

  dicardChanges() {
    this.setState({ name: STATE_NORMAL, content: this.props.children });
  }

  commitChanges() {
    this.props.onCommit(this.state.content);
  }

  hover() {
    if (this.state.name === STATE_NORMAL) {
      this.setState({ ...this.state, name: STATE_HOVERED });
    }
  }

  edit() { this.setState({ ...this.state, name: STATE_EDITING }); }
  save() { this.setState({ ...this.state, name: STATE_SAVING }); }

  renderButtonsContainerNonEditingState() {
    return (
      <EditButton>
        { this.state.name !== STATE_SAVING && <FaPencil size={18} /> }
        { this.state.name === STATE_SAVING && <ClipLoader size={18} /> }
      </EditButton>
    );
  }

  renderButtonsContainerForEditingState(stateName) {
    return (
      <EditActionsWrapper stateName={stateName}>
        <CheckChangesButton title="Confirm changes" onMouseDown={this.commitChanges}>
          <FaCheck size={19} />
        </CheckChangesButton>
        <DiscardChangesButton title="Discard changes" onMouseDown={this.dicardChanges}>
          <TiTimes size={22} />
        </DiscardChangesButton>
      </EditActionsWrapper>
    );
  }

  renderTextArea() {
    return (
      <TextArea
        autoFocus="true"
        value={this.state.content}
        onChange={this.contentChanged}
        onBlur={this.commitChanges}
      />
    );
  }

  renderNormalOrHoveredContent() {
    const innerText = this.props.children;
    if (!innerText) {
      return <span>Not set</span>;
    }

    return innerText;
  }

  render() {
    return (
      <Container
        onMouseEnter={this.hover}
        onMouseLeave={this.unhover}
        stateName={this.state.name}
        onClick={this.edit}
        title={'Click for edit'}
      >
        <ContentContainer>
          { (this.state.name === STATE_NORMAL || this.state.name === STATE_HOVERED) && this.renderNormalOrHoveredContent() }
          { this.state.name === STATE_EDITING && this.renderTextArea() }
          { this.state.name === STATE_SAVING && <TextBeingSaved>{this.state.content}</TextBeingSaved> }
          { this.state.name === STATE_EDITING && this.renderButtonsContainerForEditingState(this.state.name) }
        </ContentContainer>
        <ButtonsContainer stateName={this.state.name}>
          { this.state.name !== STATE_EDITING && this.renderButtonsContainerNonEditingState() }
        </ButtonsContainer>
      </Container>
    );
  }
}

InlineEdit.propTypes = {
  children: PropTypes.any,
  onCommit: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default InlineEdit;
