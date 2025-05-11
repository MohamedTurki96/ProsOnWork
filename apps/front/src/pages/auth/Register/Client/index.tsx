import { FormEvent, useCallback, useState } from 'react';

import { UserCreateDTO } from '../../../../api';
import { useRegister } from '../../../../hooks/useAuth';
import { RegisterForm } from '../Form';
import { TermsCondition } from '../Terms';

export function ClientRegister() {
  const { mutate: register } = useRegister();
  const [showTermsCondition, setShowTermsCondition] = useState(false);
  const [data, setData] = useState<UserCreateDTO | null>(null);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      setData({
        isClient: true,
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      });

      setShowTermsCondition(true);
    },
    [setData, setShowTermsCondition],
  );

  return (
    <>
      {showTermsCondition ? (
        <TermsCondition onAccept={() => data && register(data)} />
      ) : (
        <RegisterForm handleSubmit={handleSubmit} />
      )}
    </>
  );
}
