import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'umich-lib-components-react'
import classNames from 'classnames';
import './Alert.css'

class Alert extends React.Component {
  state = {
    open: true
  }

  handleClose = () => {
    this.setState({ open: false })
    this.props.onCloseButtonClick()
  }

  render() {
    const {
      intent,
      className
    } = this.props

    const alertClasses = classNames(className, {
      'alert': true,
      'alert--informational': intent === 'informational',
      'alert--success': intent === 'success',
      'alert--warning': intent === 'warning',
      'alert--error': intent === 'error'
    });

    if (this.state.open) {
      return (
        <div className={alertClasses}>
          <div className="alert-inner">
            <p className="alert-message">{this.props.children}</p>
            <Button
              onClick={this.handleClose}
              className="alert-dismiss-button"
              kind="tertiary"
              small={true}
              >Close</Button>
          </div>
        </div>
      )
    }

    return null
  }
}

Alert.propTypes = {
  intent: PropTypes.oneOf([
    'informational',
    'error',
    'warning',
    'success',
    'none'
  ]),
  onCloseButtonClick: PropTypes.func,
  className: PropTypes.string
};

Alert.defaultProps = {
  intent: 'informational',
  onCloseButtonClick: () => {}
};

export default Alert
