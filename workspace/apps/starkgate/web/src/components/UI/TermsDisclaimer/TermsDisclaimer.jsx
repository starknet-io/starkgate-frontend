import PropTypes from 'prop-types';

export const TermsDisclaimer = ({text, link}) => {
  const style = {
    padding: '4px 25px',
    fontSize: '14px',
    fontFamily: 'Inter',
    textAlign: 'center',
    fontWeight: 400,
    lineHeight: 1.5
  };

  const textStyle = {
    color: 'white'
  };

  const linkStyle = {
    color: '#69a5ff'
  };

  return (
    <div style={style}>
      <div style={textStyle}>
        <p>{text}</p>
        <a href={`${window.location.href}terms`} rel="noreferrer" style={linkStyle} target="_blank">
          {link}
        </a>
      </div>
    </div>
  );
};

TermsDisclaimer.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string
};
