from django.db import models

# Create your models here.
class Login(models.Model):
    email = models.EmailField(max_length=100, null=True)
    password = models.CharField(max_length=100, null=True)
    userType = models.CharField(max_length=100, null=True)

class UserReg(models.Model):
    user = models.ForeignKey(Login,on_delete=models.CASCADE,null = True)
    first_name = models.CharField(max_length = 20)
    last_name = models.CharField(max_length = 20)
    contact = models.CharField(max_length = 20)
    email = models.EmailField()
    address = models.CharField(max_length = 50)
    password = models.CharField(max_length=100, null=True)
    status = models.CharField(max_length=50, null=True, default='pending')

class Doctor(models.Model):
    user = models.ForeignKey(Login,on_delete=models.CASCADE,null = True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    gender = models.CharField(max_length=1)
    age = models.PositiveIntegerField()
    specialization = models.CharField(max_length=50)
    experience_years = models.PositiveIntegerField()
    address = models.TextField()
    password = models.CharField(max_length=100, null=True)
    image = models.ImageField(upload_to='doctor_images/', null=True, blank=True)
    status = models.CharField(max_length=50, null=True, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

class Appointment(models.Model):
    doId = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    logId = models.ForeignKey(UserReg, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    reason = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=20, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

class GenericTip(models.Model):
    CATEGORY_CHOICES = [
        ('health', 'Health'),
        ('pregnancy', 'Pregnancy'),
        ('parenting', 'Parenting'),
        ('exercise', 'Exercise'),
    ]
    title = models.CharField(max_length=200)
    content = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='health')
    image = models.ImageField(upload_to='tips/', null=True, blank=True)
    author_doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, null=True, blank=True)
    is_admin_authored = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class BabySong(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    audio_file = models.FileField(upload_to='baby_songs/', null=True, blank=True)
    video_url = models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class VaccinationChart(models.Model):
    AGE_GROUP_CHOICES = [
        ('newborn', 'Newborn (0–1 month)'),
        ('infant', 'Infant (2–12 months)'),
        ('toddler', 'Toddler (1–3 years)'),
        ('child', 'Child (4–12 years)'),
        ('teen', 'Teen (13–18 years)'),
        ('adult', 'Adult (18+ years)'),
        ('pregnant', 'Pregnant Women'),
    ]
    vaccine_name = models.CharField(max_length=100)
    disease_prevented = models.CharField(max_length=200)
    age_group = models.CharField(max_length=20, choices=AGE_GROUP_CHOICES)
    recommended_age = models.CharField(max_length=100)  
    dosage = models.CharField(max_length=100) 
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
