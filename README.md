## HOW TO SETUP AND RUN APPLICATION

Make sure to have docker desktop installed on the computer in order to be able to follow these steps.

1. First open the terminal in the root of the project
2. Build the docker image running the following command:
   <code>npm run docker-build</code>
   The "docker-build" is a script already included in the package.json to build the docker image.
3. Now, run the following command in order to start the container and run the application:
   <code>npm run docker</code>
   The "docker" is a script already included in the package.json to start the container using the image previously built.
4. Done! The application is up and running on "http://localhost:3000"

## DESCRIPTION

This is front-end application made with Next.Js 12 for the Solvo assessment where we need a page with a form to create employees and the functionallity of seeing the stored employees.
