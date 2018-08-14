import React from 'react';
import PropTypes from 'prop-types';
import {
  withLive,
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live'


const Key = ({ propName }) => {
  return (
    <React.Fragment>
      <code className="props__prop-name">{propName}</code>
    </React.Fragment>
  )
}

const Type = ({ type }) => {
  return (
    <span className="props__prop-type">{type.name}</span>
  )
}

const PropSpec = ({ value }) => (
  <details className="props__prop-specs">
    <summary>PropType AST</summary>
    <pre className="props__prop-shape">
      {JSON.stringify(value, null, 2)}
    </pre>
  </details>
)

const Enum = ({ values }) => {
  if (Array.isArray(values)) {
    return (
      <ul className="props__prop-enum">
        {values.map((value, key) => (
          <li key={key}>{value.value}</li>
        ))}
      </ul>
    )
  }

  return null
}

const Description = ({ type, required, description }) => {
  return (
    <div className="y-spacing">
      {type && (<Type type={type} />)}
      <p>{required && (<span className="props__prop-required-tag">required</span>)} {description}</p>
      {type && type.value && (
        <React.Fragment>
          <Enum values={type.value} />
          <PropSpec value={type.value} />
        </React.Fragment>
      )}
    </div>
  )
}

const Props = ({props}) => {
  return (
    <div className="props__container">
      <table className="props__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
        {
          Object.keys(props).map(key => {
            return (
              <tr key={key}>
                <td><Key propName={key} {...props[key]} /></td>
                <td><Description {...props[key]} /></td>
                <td>{(props[key].defaultValue && props[key].defaultValue.value) && (props[key].defaultValue.value)}</td>
              </tr>
            );
          })
        }
        </tbody>
      </table>
    </div>
  )
}

Props.propTypes = {
  props: PropTypes.object.isRequired
};

export default Props;