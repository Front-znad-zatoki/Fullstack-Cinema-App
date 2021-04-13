import Loader from 'react-loader-spinner';

function CustomLoader() {
  return (
    <Loader
      type="ThreeDots"
      color="#6e093a"
      height={100}
      width={100}
      //   timeout={2000}
      style={{ textAlign: 'center' }}
    />
  );
}

export default CustomLoader;
