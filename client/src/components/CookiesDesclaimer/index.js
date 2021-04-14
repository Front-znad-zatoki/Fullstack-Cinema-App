import { useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../../utils/localStorage';

function CookiesDesclaimer() {
  const hasCookie = getLocalStorage('cookies-consent');
  const [cookiesConsent, setCookiesConsent] = useState(hasCookie);
  const handleCookies = () => {
    setLocalStorage('cookies-consent', true);
    setCookiesConsent(true);
  };
  return !cookiesConsent ? (
    <div className="cookies">
      <h3>This website uses cookies</h3>
      <p>
        We use cookies to give you the best online experience. Please let us
        know if you agree.
      </p>
      <div className="button__group">
        <button className="button--submit" onClick={handleCookies}>
          Accept
        </button>
      </div>
    </div>
  ) : null;
}

export default CookiesDesclaimer;
