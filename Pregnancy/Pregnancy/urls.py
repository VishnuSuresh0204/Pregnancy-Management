"""
URL configuration for Pregnancy project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home),
    path('adminHome/', views.adminHome),
    path('userHome/', views.userHome),
    path('doctorHome/', views.doctorHome),
    path('user_reg/', views.user_reg),
    path('doctor_reg/', views.doctor_reg),
    path('shop_reg/', views.shop_reg),
    path('login/', views.login),
    path('ad/', views.ad),

    # ADMIN
    path('view_user/', views.view_user),
    path('view_doctor/', views.view_doctor),
    path('view_shops/', views.view_shops),
    path('admin_action/', views.admin_action),
    path('addVaccine/', views.addVaccine),
    path('vaccineList/', views.vaccineList),
    path('deleteVaccine/', views.deleteVaccine),
    path('addHealthTip/', views.addHealthTip),
    path('healthTipList/', views.healthTipList),
    path('deleteHealthTip/', views.deleteHealthTip),
    path('addBabySong/', views.addBabySong),
    path('babySongList/', views.babySongList),
    path('deleteBabySong/', views.deleteBabySong),


# USER
    path('viewShops/', views.viewShops),
    path('viewShopProducts/', views.viewShopProducts),
    path('addToCart/', views.addToCart),
    path('viewCart/', views.viewCart),
    path('updateCartQuantity/', views.updateCartQuantity),
    path('removeFromCart/', views.removeFromCart),
    path('checkout/', views.checkout),
    path('processPayment/', views.processPayment),
    path('userViewEvents/', views.userViewEvents),
    path('eventHistory/', views.eventHistory),
    path('userOrders/', views.userOrders),
    path('doctorView/', views.doctorView),
    path('appointment/', views.appointment),
    path('appointmentList/', views.appointmentList),
    path('appointmentHistory/', views.appointmentHistory),
    path('userViewTips/', views.userViewTips),
    path('userViewVaccine/', views.userViewVaccine),
    path('userViewBabySongs/', views.userViewBabySongs),


# DOCTOR
    path('userList/', views.userList),
    path('appointmentDetails/', views.appointmentDetails),
    path('approveAppointment/', views.approveAppointment),
    path('rejectedAppointment/', views.rejectedAppointment),
    path('doctorAddTip/', views.doctorAddTip),
    path('doctorManageTips/', views.doctorManageTips),
    path('doctorEditTip/', views.doctorEditTip),
    path('doctorDeleteTip/', views.doctorDeleteTip),
    path('doctorProfile/', views.doctorProfile),
    path('doctorUpdateProfile/', views.doctorUpdateProfile),

# SHOP
    path('shopHome/', views.shopHome),
    path('addProduct/', views.addProduct),
    path('editProduct/', views.editProduct),
    path('deleteProduct/', views.deleteProduct),
    path('shopProducts/', views.shopProducts),
    path('addEvent/', views.addEvent),
    path('editEvent/', views.editEvent),
    path('deleteEvent/', views.deleteEvent),
    path('shopEvents/', views.shopEvents),
    path('shopOrders/', views.shopOrders),
    path('updateOrderStatus/', views.updateOrderStatus),



]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)