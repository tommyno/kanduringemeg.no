// @ts-nocheck
import { useState } from "react";

import sleep from "utils/sleep";

import Spinner from "components/Spinner";

import styles from "./CallForm.module.scss";

const CallForm = (): JSX.Element => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    // Get value from form
    const number = event.target.elements.number.value;

    // await sleep(5000);

    // Send number to API
    const url = `/api/call/${number}`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      setIsSubmitting(false);
      if (response.ok) {
        setIsFormSubmitted(true);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      // console.log("catch error", error);
    }
  };

  // Show if form has been submitted successfully
  if (isFormSubmitted) {
    return (
      <div className={styles.callingMessage}>
        <h2>Det ringer, det ringer!</h2>
        <p>Du har 20 sekunder på å finne telefonen.</p>
        <button
          className={styles.button}
          type="button"
          onClick={() => {
            setIsFormSubmitted(false);
          }}
        >
          Jeg fant telefonen!
        </button>
      </div>
    );
  }

  // Show call form
  return (
    <>
      {!isFormSubmitted && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <p>Jasså, har du rotet bort telefonen? Igjen?</p>
          <label htmlFor="number" className="visuallyhidden">
            Ditt mobilnummer
          </label>

          <div className={styles.inputWrap}>
            <input
              type="tel"
              placeholder="Mobilnummer"
              name="number"
              id="number"
              minLength={8}
              maxLength={8}
              disabled={isSubmitting}
              className={`${styles.input} text-medium`}
              aria-invalid={isError}
              required
            />
            <div className={styles.spinnerWrap}>
              {isSubmitting && <Spinner />}
            </div>
          </div>

          {errorMessage && (
            <div className={styles.errorMessage}>
              <p>{errorMessage}</p>
            </div>
          )}

          <button
            type="submit"
            className="visuallyhidden"
            disabled={isSubmitting}
          >
            Ring meg
          </button>
        </form>
      )}
    </>
  );
};

export default CallForm;
