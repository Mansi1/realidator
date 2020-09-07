# realidator

realidator is a react validator library that validates values.

```
const {valid, error, state} = useValidation({
        email: 'a'
    }, 
    {email: [{
        type: 'required', 
        validator: (value) => !!value,
        message: <Trans>Required</Trans>
]});
```
