import Loader from "../components/Loader";

const ModalContainer = ({ isOpen, onClose, title, content, object }) => {
  const modalClassName = isOpen
    ? "fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
    : "hidden";

  const modalContentClassName = isOpen
    ? "bg-white rounded-lg shadow-lg opacity-100 scale-100 transition-all transform ease-out duration-300 w-1/2"
    : "opacity-0 scale-95 -translate-y-10 pointer-events-none transition-all transform ease-in duration-300";

  return (
    <div className={modalClassName}>
      <div className="fixed inset-0 bg-black opacity-60"></div>
      <div className={`relative w-1/3 max-w-md p-5 ${modalContentClassName}`}>
        {object ? (
          <>
            <div className="p-4">
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-2">{title}</h3>
              </div>
              <div>{content}</div>
            </div>
            <div className="p-3 text-right space-x-4">
              <button
                onClick={onClose}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                Close
              </button>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default ModalContainer;
