export class GlobalVariableException extends Error {
    constructor(msg: string){
        super(msg);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, GlobalVariableException.prototype);
    }
}