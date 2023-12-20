//execute function which we are going to call inside of a component, async function with TInput. We send that
// input inside of our action, action will run it trough ActionState and makes sure its validated.
//in tryCatch, inside try we set condition to early return if we don't have any results. No need for callbacks
//If we have field errors that means something went wrong with the validation, we don't need callbacks here. We extract the error and pass them accordingly
//If we have server error we are going to set the error and call a options callback on error coz thats not the type of error which we are going to render under input fields. These errors will be rendered under a tost
//If we have result.data means successfully created the record then we set the data ans call a option callback so that we can work on the data like redirecting to an specific ID.
// Finally which servers as finally props with options callback with oncomplete
//then we return all

import { useState, useCallback } from "react";

import { ActionState, FieldErrors } from "@/lib/create-safe-action";

//defining type of Action
type Action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>;

//interface: what to expect from this hook, is going to work with output, gonna have a optional onSuccess handler,
//which gonna give us the data as output and returns a void, OnError for server error, onComplete a finally function.

interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

// useAction works with input and output, First prop is action with a (Type Action), second one will be options with UseActionOption, works with output, By default its going to be an empty obj

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: UseActionOptions<TOutput> = {}
) => {
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<TInput> | undefined
  >(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true);

      try {
        const result = await action(input);

        if (!result) {
          return;
        }
// no need if clause here
        setFieldErrors(result.fieldErrors);

        if (result.error) {
          setError(result.error);
          options.onError?.(result.error);
        }

        if (result.data) {
          setData(result.data);
          options.onSuccess?.(result.data);
        }
      } finally {
        setIsLoading(false);
        options.onComplete?.();
      }
    },
    [action, options]
  );

  return {
    execute,
    fieldErrors,
    error,
    data,
    isLoading,
  };
};
