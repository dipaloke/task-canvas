import { z } from "zod";

//following two types are generics which will work with any type of actions. all in need is input from user and output that users should receive.
//The Output, Which could be a success and get the data (prisma type like a board), or could be an error: could be a string if its a server error,
//could be an obj with a specific key inside and an array of errors.

//individual field errors got from zod. Each string is going to be an individual error
export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

// action state will take a TInput and TOutput. which will be an obj with optional field errors and server error and optional result called data
export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>; // obj of errors
  error?: string | null; // server error
  data?: TOutput; // result: prisma data type
};

// safeAction will receive input and output which will have a schema, handler with validatedData which gives a promise with actionState.
// safeAction will return an async function  which takes TInput and returns a promise with actionState. first we validate our schema,
//If we haven't receive a success msg then return fieldErrors. outside of if clause we return the validated data

export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validationResult = schema.safeParse(data);
    if (!validationResult.success) {
      return {
        fieldErrors: validationResult.error.flatten()
          .fieldErrors as FieldErrors<TInput>,
      };
    }
    return handler(validationResult.data);
  };
};
