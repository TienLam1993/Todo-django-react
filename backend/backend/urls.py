from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

from rest_framework import routers
from todo import views
# from . registration import SignupViewSet # for custom resgistration if do not use dj-rest-auth

router = routers.DefaultRouter()
router.register(r'todos', views.TodoView, 'todos')
router.register(r'users', views.UserView, 'users')
 # router.register(r'signup', SignupViewSet, 'signup') # for custom resgistration if do not use dj-rest-auth

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('', TemplateView.as_view(template_name='index.html')),   # for intergration with React. you must run npm build in React project.
]


urlpatterns += [ path('api-auth/', include('rest_framework.urls')) ]