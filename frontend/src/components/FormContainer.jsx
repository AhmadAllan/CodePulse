import PropTypes from 'prop-types';

const FormContainer = ({ children }) => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center mt-5">
        <div className="w-full md:w-6/12 card p-5">{children}</div>
      </div>
    </div>
  );
};

FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormContainer;
