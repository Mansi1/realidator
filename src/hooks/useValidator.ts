import {IValidator} from "../interfaces/Validator";
import {useEffect, useState} from "react";
import {IErrorState} from "../interfaces/ErrorState";
import {IError} from "../interfaces/Error";
import {IFormState} from "../interfaces/FormState";

export interface UseValidatorState {
    state: IFormState;
    errors: IErrorState;
    isValid: boolean;
}

export const useValidator = <T>(formState: IFormState, validators: { [key: string]: Array<IValidator> }) => {
    const [state, setState] = useState<UseValidatorState>({
        state: formState,
        errors: {},
        isValid: false
    });

    useEffect(() => {
        (async () => {
            let isError = false;
            const internalState: IErrorState = {};
            const validatorKeys = Object.keys(validators)
                .filter(validatorKey => !!formState[validatorKey]);

            for (const validatorKey of validatorKeys) {

                const state = formState[validatorKey];
                const error: IError = {};

                for (const validator of validators[validatorKey]) {
                    const {type, message} = validator
                    const hasError = await validator.validator(state);
                    if (hasError) {
                        isError = true;
                        error[type] = {
                            error: hasError,
                            message
                        }
                    }
                }
                if (Object.keys(error).length > 0) {
                    internalState[validatorKey] = error
                }
            }

            setState({
                state: formState,
                isValid: !isError,
                errors: internalState
            })
        })()
    }, [])

    return state;
}
