/* eslint-disable import/no-extraneous-dependencies */
import { useTokenVerify } from '@/hooks/useTokenVerify';
import { useSearchParams } from 'react-router-dom';
import ValidatingScreen from './ValidatingScreen';

function ConfirmEmail() {
  const [search] = useSearchParams();
  const [response, loading, verifyError] = useTokenVerify(search);

  return (<ValidatingScreen response={response} loading={loading} error={verifyError} />);
}

export default ConfirmEmail;
