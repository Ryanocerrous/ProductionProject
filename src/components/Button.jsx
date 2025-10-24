import PropTypes from 'prop-types';
import classNames from 'classnames';

const baseClass = 'btn';

function Button({ variant = 'primary', href, children, icon: Icon, ...rest }) {
  const classes = classNames(baseClass, {
    'btn-primary': variant === 'primary',
    'btn-secondary': variant === 'secondary'
  });

  const content = (
    <span className="btn-content">
      <span className="btn-label">{children}</span>
      {Icon ? <Icon aria-hidden="true" className="btn-icon" /> : null}
    </span>
  );

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary']),
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
  icon: PropTypes.elementType
};

export default Button;
