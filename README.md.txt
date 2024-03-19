Steps to run the code:

1. Run npm install in the ecommerce app frontend project.
2. Run gradle build on all the backend proejcts.
3. Run docker build on all the projects to create docker images and use the following names so that the compose.yaml can execute properly
   projectconfigservice - docker build -t configservice .
   projectdiscoveryservice - docker build -t discoveryservice .
   projectgatewayservice  - docker build -t gatewayservice .
   jwtloginservice - docker build -t authservice .
   productandcategoryservice - docker build -t shopservice .
   ecommmerce-project - docker build -t ecommerceapp .
4. Run the compose.yaml to create and run containers of the created images :
   docker compose -f .\compose.yaml up

