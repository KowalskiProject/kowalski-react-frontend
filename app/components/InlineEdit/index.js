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
import { ClipLoader } from 'react-spinners';

const Container = styled.div`
  display: flex;
  flex-grow: 1;

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

export const STATE_NORMAL = 'STATE_NORMAL';
export const STATE_HOVERED = 'STATE_HOVERED';
export const STATE_EDITING = 'STATE_EDITING';
export const STATE_SAVING = 'STATE_SAVING';

const TextBeingSaved = styled.span`
  font-style: italic;
  color: grey;
`;

// TODO Refactor to be a presentational component, should not have internal state
// InlineEdit =>
//  Presentational component
//  Props:
//    - state(saving, normal, hovered, editing)
//    - value
//    - onCommit onDiscard onChange
//    - children: Funcao para renderizacao do componente de edicao ()
// InlineEdit =>
//  Presentational component
//  Props:
class InlineEdit extends Component {
  constructor(props) {
    super(props);
    this.state = { name: props.saving ? STATE_SAVING : STATE_NORMAL, content: props.value };

    this.unhover = this.unhover.bind(this);
    this.hover = this.hover.bind(this);
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.contentChanged = this.contentChanged.bind(this);
    this.dicardChanges = this.dicardChanges.bind(this);
    this.commitChanges = this.commitChanges.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Whenever a new value is received, update the content
    if (this.props.value !== nextProps.value) {
      this.setState({
        ...this.state,
        content: nextProps.value,
      });
    }

    if (!!nextProps.saving !== (this.state.name === STATE_SAVING)) {
      this.setState({
        ...this.state,
        name: nextProps.saving ? STATE_SAVING : STATE_NORMAL,
        content: nextProps.saving ? this.state.content : this.props.value,
      });
    }
  }

  contentChanged(content) {
    this.setState({ ...this.state, content });
  }

  unhover() {
    if (this.state.name === STATE_HOVERED) {
      this.setState({ ...this.state, name: STATE_NORMAL });
    }
  }

  dicardChanges() {
    this.setState({ name: STATE_NORMAL, content: this.props.value });
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

  formatValue() {
    return this.props.formatter ? this.props.formatter(this.props.value) : this.props.value;
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

  renderEditComponent() {
    return this.props.renderEditComponent({
      content: this.state.content,
      onCommit: this.commitChanges,
      onDiscard: this.dicardChanges,
      onChange: this.contentChanged,
      stateName: this.state.name,
    });
  }

  renderContentOnSaving() {
    if (this.props.displayEditElementWhenSaving) {
      return <TextBeingSaved>{this.renderEditComponent()}</TextBeingSaved>;
    }

    return (
      <TextBeingSaved>
        {
          this.props.formatter
            ? this.props.formatter(this.state.content)
            : this.state.content
        }
      </TextBeingSaved>
    );
  }

  renderButtonsContainerNonEditingState() {
    return (
      <EditButton>
        { this.state.name !== STATE_SAVING && <FaPencil size={18} /> }
        { this.state.name === STATE_SAVING && <ClipLoader size={18} /> }
      </EditButton>
    );
  }

  renderContentOnHovered() {
    const formattedValue = this.formatValue();
    if (this.props.displayEditElementWhenOnHover) {
      return this.renderEditComponent();
    }

    return formattedValue;
  }

  renderContentOnNormalState() {
    const formattedValue = this.formatValue();
    if (this.props.displayEditElementWhenNormal) {
      return this.renderEditComponent();
    }

    return formattedValue;
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
          { this.state.name === STATE_NORMAL && this.renderContentOnNormalState() }
          { this.state.name === STATE_HOVERED && this.renderContentOnHovered() }
          { this.state.name === STATE_EDITING && this.renderEditComponent() }
          { this.state.name === STATE_EDITING && this.renderButtonsContainerForEditingState(this.state.name) }
          { this.state.name === STATE_SAVING && this.renderContentOnSaving() }
        </ContentContainer>
        <ButtonsContainer stateName={this.state.name}>
          { this.state.name !== STATE_EDITING && this.renderButtonsContainerNonEditingState() }
        </ButtonsContainer>
      </Container>
    );
  }
}

InlineEdit.propTypes = {
  formatter: PropTypes.func, // Optional function to format the value shown
  onCommit: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  renderEditComponent: PropTypes.func.isRequired,
  displayEditElementWhenSaving: PropTypes.bool,
  displayEditElementWhenOnHover: PropTypes.bool,
  displayEditElementWhenNormal: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
};

export default InlineEdit;
