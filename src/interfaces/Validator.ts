import {ReactNode} from "react";

export interface IValidator {
    validator: (value: any) => boolean | Promise<boolean>
    type: string;
    message: ReactNode;
}
