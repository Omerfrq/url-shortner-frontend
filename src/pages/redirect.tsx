import { useParams } from 'react-router-dom';

export const RedirectPage = () => {
  const params = useParams<{ shortcode: string }>();
  return <div>{params.shortcode}</div>;
};
