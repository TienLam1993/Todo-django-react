# todo-django-react
A simple to-do app with django back-end and react front-end

### Workflow
*Note that I use window powershell. If you use Linux, there might be something different*.

#### Frontend developement



    cd frontend

    npm install

    npm run build
  
#### Backend developement


    python -m venv env               

    python env/scripts/activate.ps1

    pip install -r requirements.txt

    cd backend
    
    python manage.py makemigrations todo
    
    python manage.py migrate

    python manage.py runserver

* These are for developement. If you want to deploy, you need to change some settings. 
* Demo: (https://lamgihomnay.herokuapp.com/)


