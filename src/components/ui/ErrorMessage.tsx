interface Iprops {
  message: string;
}

const ErrorMessage = ({ message }: Iprops) => {
  return message ? (
    <div className="block text-red-700 font-semibold text-sm">{message}</div>
  ) : null;
};

export default ErrorMessage;
