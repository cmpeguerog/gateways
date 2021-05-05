export default function isUnauthorized(error) {
  return (
    error &&
    error.response &&
    (error.response.status === 401 || error.response.status === 403)
  );
}
