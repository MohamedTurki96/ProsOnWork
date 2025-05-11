import { FormEvent, useCallback, useState } from 'react';

import { UserCreateDTO, UserPlan } from '../../../../api';
import { useRegister } from '../../../../hooks/useAuth';
import { RegisterForm } from '../Form';
import { Plans } from '../Plans';
import { TermsCondition } from '../Terms';

export function ProviderRegister() {
  const { mutate: register } = useRegister();
  const [showForm, setShowForm] = useState(false);
  const [plan, setPlan] = useState<UserPlan>(UserPlan.Basic);
  const [showTermsCondition, setShowTermsCondition] = useState(false);
  const [data, setData] = useState<UserCreateDTO | null>(null);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      setData({
        plan,
        isClient: false,
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      });

      setShowTermsCondition(true);
    },
    [setData, setShowTermsCondition],
  );

  const handleChoosePlan = useCallback(
    (plan: UserPlan) => {
      setPlan(plan);
      setShowForm(true);
    },
    [setPlan, setShowForm],
  );

  return (
    <>
      {showTermsCondition ? (
        <TermsCondition onAccept={() => data && register(data)} />
      ) : showForm ? (
        <RegisterForm
          handleSubmit={handleSubmit}
          extra={
            <div className="card">
              <div className="card-header">
                <div className="price-level">
                  <h6 className="fs-14">Plan {plan}</h6>
                </div>
              </div>
            </div>
          }
        />
      ) : (
        <Plans onClick={handleChoosePlan} />
      )}
    </>
  );
}
