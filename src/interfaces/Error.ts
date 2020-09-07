import {ReactNode} from "react";

export interface IError {
    [errorType: string]: {
        error: boolean;
        message: ReactNode
    }
}
