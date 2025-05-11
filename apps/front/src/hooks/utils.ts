import toast from 'react-hot-toast';

export function toastError(error?: Error) {
  let message = 'An error has occured';
  if (error) {
    const errorObj = 'error' in error ? (error.error as any) : null;
    message = 'message' in errorObj ? errorObj?.message! : null;
  }
  toast.error(message);
}
