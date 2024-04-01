from . import views
from rest_framework import routers


router = routers.DefaultRouter()
router.register('tasque', views.TodoView, basename='tasque')

urlpatterns = [
]

urlpatterns += router.urls