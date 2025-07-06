function ErrorMessage({ message, onRetry }) {
  return (
    <div className="p-4 bg-red-100 text-red-800 rounded my-4 text-center">
      <p>{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Retry
        </button>
      )}
    </div>
  )
}

export default ErrorMessage