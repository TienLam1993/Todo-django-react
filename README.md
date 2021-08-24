# todo-django-react

A CRUD web app helps you to manage your todo list.  
Demo: https://lamgihomnay.herokuapp.com/

This is my final project for Harvard CS50's Web programming with Python and JavaScript course.  
https://cs50.harvard.edu/web/2020/projects/final/capstone/  
Here are some requirements of the project:  
* Your web application must utilize Django (including at least one model) on the back-end and JavaScript on the front-end.
* Your web application must be mobile-responsive.
* Your web application must be sufficiently distinct from the other projects in this course.

## Basic functionalities
Once you logged in, you can create/delete/update tasks in your to-do list.  
You can update information in your profile page.  
Admin user get full permissions over the site.  
This site uses token authentication.  


## Project structure

### Backend 

This project uses Django REST framework on the backend. It is a powerful and flexible toolkit for building Web APIs based on Django.    
https://www.django-rest-framework.org/  

This project has 2 models: one stores data about users and one stores data about tasks. Django REST framework create API endpoints for each model to help the Frontend "talk" with the data.

Serializers.py file renders the data from models into JSON and XML file format. Serializers also provide deserialization, allowing parsed data to be converted back into complex types, after first validating the incoming data.  

In the views.py file, I use ModelViewset. Here is the definition from the document: 
> Django REST framework allows you to combine the logic for a set of related views in a single class, called a ViewSet. Typically, rather than explicitly registering the views in a viewset in the urlconf, you'll register the viewset with a router class, that automatically determines the urlconf for you.  


### Frontend
This project uses React in frontend. It is a JavaScript library for building user interfaces, and single page application.  
https://reactjs.org/    

React is component-based. Everything in React is built from JavaScript component.   

There are mains components from my app: 

* Routes: Help to create routes for react
* Signup: Handle the sign up process
* Login: Handle the log in process
* Profile: View/update user information
* Todo: Create/update/delete tasks

These components communicate with the backend by JavaScript fetch API, send/receive data via JSON format. 



## How to run

*Note that I use window powershell. If you use Linux, there might be something different*.  
*These are for local testing/developement. If you want to deploy, you need to change some settings in Django*. 

### Frontend developement

    cd frontend

    npm install

    npm run build
  
### Backend developement


    python -m venv env               

    python env/scripts/activate.ps1

    pip install -r requirements.txt

    cd backend
    
    python manage.py makemigrations todo
    
    python manage.py migrate

    python manage.py runserver





