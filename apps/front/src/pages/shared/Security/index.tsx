import { useCallback, useState } from 'react';

import { useChangePassword, useConnectedUser } from '../../../hooks/useAuth';

export function Security() {
  const { data: user } = useConnectedUser();

  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [passwordResponce, setPasswordResponce] = useState({
    passwordResponceText:
      "Use 8 or more characters with a mix of letters, number's symbols.",
    passwordResponceKey: '',
  });

  const onChangePassword = (password: string) => {
    setPassword(password);
    if (password.match(/^$|\s+/)) {
      setPasswordResponce({
        passwordResponceText: 'Whitespaces are not allowed',
        passwordResponceKey: '',
      });
    } else if (password.length === 0) {
      setPasswordResponce({
        passwordResponceText: '',
        passwordResponceKey: '',
      });
    } else if (password.length < 8) {
      setPasswordResponce({
        passwordResponceText: 'Weak. Must contain at least 8 characters',
        passwordResponceKey: '0',
      });
    } else if (
      password.search(/[a-z]/) < 0 ||
      password.search(/[A-Z]/) < 0 ||
      password.search(/[0-9]/) < 0
    ) {
      setPasswordResponce({
        passwordResponceText:
          'Average. Must contain at least 1 upper case and number',
        passwordResponceKey: '1',
      });
    } else if (password.search(/(?=.*?[#?!@$%^&*-])/) < 0) {
      setPasswordResponce({
        passwordResponceText: 'Almost. Must contain a special symbol',
        passwordResponceKey: '2',
      });
    } else {
      setPasswordResponce({
        passwordResponceText: 'Awesome! You have a secure password.',
        passwordResponceKey: '3',
      });
    }
  };

  const onSuccess = useCallback(() => {
    setOldPassword('');
    onChangePassword('');
  }, [setOldPassword, onChangePassword]);

  const { mutate } = useChangePassword(onSuccess);

  

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate({
        currentPassword: oldPassword,
        newPassword: password,
      });
    },
    [password, oldPassword],
  );

  if (!user) {
    return null;
  }

  return (
    <div className="col">
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column justify-content-center">
          <div className="card p-sm-4 my-5">
            <div className="card-body">
              <div className="text-center mb-3">
                <h3 className="mb-2">Reset Password</h3>
              </div>
              <div>
                <div className="mb-3">
                  <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <label className="form-label">Old Password</label>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="input-block mb-3">
                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <div className="pass-group" id="passwordInput">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => onChangePassword(e.target.value)}
                        className="form-control pass-input"
                      />
                    </div>
                  </div>
                  <div
                    className={`password-strength d-flex ${
                      passwordResponce.passwordResponceKey === '0'
                        ? 'poor-active'
                        : passwordResponce.passwordResponceKey === '1'
                          ? 'avg-active'
                          : passwordResponce.passwordResponceKey === '2'
                            ? 'strong-active'
                            : passwordResponce.passwordResponceKey === '3'
                              ? 'heavy-active'
                              : ''
                    }`}
                    id="passwordStrength"
                  >
                    <span id="poor" className="active" />
                    <span id="weak" className="active" />
                    <span id="strong" className="active" />
                    <span id="heavy" className="active" />
                  </div>
                  <div id="passwordInfo" className="mb-2" />
                  <p className="fs-12">
                    {passwordResponce.passwordResponceText}
                  </p>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={passwordResponce.passwordResponceKey != '3'}
                    className="btn btn-lg btn-linear-primary w-100"
                  >
                    Save Change
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
