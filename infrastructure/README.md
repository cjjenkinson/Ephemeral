# Trackstack Infrastructure

## Useful commands

- `yarn test:infra` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

       <!-- {
           "stack": "AuthService",
           "handlers": [
               {
                   "name": "token",
                   "entry": "./src/services/auth/token"
               },
               {
                   "name": "authenticate",
                   "entry": "./src/services/auth/authenticate"
               },
               {
                   "name": "authorise",
                   "entry": "./src/services/auth/authorise"
               }
           ]
       } -->
