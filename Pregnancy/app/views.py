from django.shortcuts import render,redirect,get_object_or_404
from. models import*
from django.contrib import messages
from datetime import datetime

# Create your views here.
def home(request):
    return render(request, 'index.html')

def adminHome(request):
    return render(request, 'ADMIN/index.html')

def userHome(request):
    return render(request, 'USER/index.html')

def doctorHome(request):
    return render(request, 'DOCTOR/index.html')

def ad(request):
    Login.objects.create(email="admin@gmail.com",password="admin@123",userType="Admin")
    return redirect("/")

def user_reg(request):
    if request.method == 'POST':
        first_name = request.POST["fname"]
        last_name = request.POST["lname"]
        contact = request.POST["phone"]
        email = request.POST["email"]
        address = request.POST["address"]
        password = request.POST["password"]

        if Login.objects.filter(email=email).exists():
            messages.error(request, "Email already registered.")
            return redirect('/client_reg')

        user = Login.objects.create(email=email, password=password, userType="User")
        UserReg.objects.create(
            user=user,
            first_name=first_name,
            last_name=last_name,
            contact=contact,
            email=email,
            address=address,
            password=password,
        )

        messages.success(request, "User Registered Successfully!")
        return redirect("/login")

    return render(request, 'user_reg.html')


def doctor_reg(request):
    if request.POST:
        name = request.POST["name"]
        phone = request.POST["phone"]
        email = request.POST["email"]
        age = request.POST["age"]
        gender = request.POST.get("gender")
        experience_years = request.POST.get("experience_years")
        specialization = request.POST.get("specialization")
        address = request.POST["address"]
        password = request.POST.get("password")
        image = request.FILES.get("image")

        user = Login.objects.create(email=email, password=password, userType="Doctor")

        Doctor.objects.create(
            user=user,
            name=name,image=image,
            phone=phone,
            email=email,
            age=age,
            gender=gender,
            experience_years=experience_years,
            specialization=specialization,
            address=address,
            password=password,
        )
        messages.success(request, "Doctor Registered Successfully!")
        return redirect("/login")

    return render(request, 'doctor_reg.html')

def login(request):
    if request.POST:
        email = request.POST.get("email")
        password = request.POST.get("password")

        user = Login.objects.filter(email=email,password=password).first()

        if user is None:
            messages.error(request, "Invalid email or password.")
            return redirect('/login/')

        if user.userType == "Admin":
            messages.success(request, "Logged in as Admin")
            return redirect('/adminHome/')

        elif user.userType == "User":
            user = UserReg.objects.filter(user=user,status="userApprove").first()
            if user:
                request.session['uid'] = user.id  # Store LabReg ID
                messages.success(request, "Login Successful as User")
                return redirect('/userHome/')
            else:
                messages.error(request, "User profile not found.")
                return redirect('/login/')


        elif user.userType == "Doctor":
            doct = Doctor.objects.filter(user=user,status="doctorApprove").first()
            if doct:
                request.session['uid'] = doct.id  
                messages.success(request, "Login Successful")
                return redirect('/doctorHome/')
            else:
                messages.error(request, "Doctor profile not found.")
                return redirect('/login/')

        else:
            messages.error(request, "Invalid user type.")
            return redirect('/login/')

    return render(request, 'login.html')

#.................................              ADMIN                .............................................

def view_user(request):
    user = UserReg.objects.all()
    return render(request,"ADMIN/view_user.html",{'user':user})


def view_doctor(request):
    doct = Doctor.objects.all()
    return render(request,"ADMIN/view_doctor.html",{'doct':doct})

def admin_action(request):
    id = request.GET.get("id")
    action = request.GET.get("action")
    if(action == "userBlock"):
        user = UserReg.objects.get(id = id)
        user.status = "userBlock"
        user.save()
        return redirect("/view_user")
    elif(action == "userApprove"):
        user = UserReg.objects.get(id = id)
        user.status = "userApprove"
        user.save()
        return redirect("/view_user")

    elif(action == "doctorApprove"):
        client = Doctor.objects.get(id = id)
        client.status = "doctorApprove"
        client.save()
        return redirect("/view_doctor")
    elif(action == "doctorBlock"):
        client = Doctor.objects.get(id = id)
        client.status = "doctorBlock"
        client.save()
        return redirect("/view_doctor")

def addVaccine(request):
    if request.POST:
        vaccine_name = request.POST.get('vaccine_name')
        disease_prevented = request.POST.get('disease_prevented')
        age_group = request.POST.get('age_group')
        recommended_age = request.POST.get('recommended_age')
        dosage = request.POST.get('dosage')
        notes = request.POST.get('notes')

        VaccinationChart.objects.create(
            vaccine_name=vaccine_name,
            disease_prevented=disease_prevented,
            age_group=age_group,
            recommended_age=recommended_age,
            dosage=dosage,
            notes=notes,
        )
        messages.success(request, "Vaccine entry added.")
        return redirect('/vaccineList/')
    
    return render(request, 'ADMIN/addvaccine.html')

def vaccineList(request):
    vaccines = VaccinationChart.objects.all()
    return render(request, 'ADMIN/vaccineList.html', {'vaccines': vaccines})

def deleteVaccine(request):
    id=request.GET.get("id")
    vac = VaccinationChart.objects.get(id=id)
    vac.delete()
    return redirect('/vaccineList/')

def addHealthTip(request):
    if request.method == 'POST':
        title = request.POST['title']
        content = request.POST['content']
        image = request.FILES.get('image')
        GenericTip.objects.create(
            title=title,
            content=content,
            category='health',
            image=image,
            is_admin_authored=True
        )
        messages.success(request, "Health tip added successfully!")
        return redirect('/healthTipList/')
    return render(request, 'ADMIN/addHealthTip.html')

def healthTipList(request):
    tips = GenericTip.objects.filter(category='health')
    return render(request, 'ADMIN/healthTipList.html', {'tips': tips})

def deleteHealthTip(request):
    id = request.GET.get("id")
    GenericTip.objects.get(id=id).delete()
    return redirect('/healthTipList/')

def addBabySong(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        description = request.POST.get('description')
        audio_file = request.FILES.get('audio_file')
        video_url = request.POST.get('video_url')
        BabySong.objects.create(
            title=title,
            description=description,
            audio_file=audio_file,
            video_url=video_url
        )
        messages.success(request, "Baby song added successfully!")
        return redirect('/babySongList/')
    return render(request, 'ADMIN/addBabySong.html')

def babySongList(request):
    songs = BabySong.objects.all()
    return render(request, 'ADMIN/babySongList.html', {'songs': songs})

def deleteBabySong(request):
    id = request.GET.get("id")
    BabySong.objects.get(id=id).delete()
    return redirect('/babySongList/')


#.................... USER  .....................................

def doctorView(request):
    doct = Doctor.objects.all()
    return render(request, 'USER/doctor.html', {'doct': doct})

def appointment(request):
    id=request.GET.get("id")
    uid = request.session.get("uid")
    doctor = Doctor.objects.get(id=id)
    logId = UserReg.objects.get(id=uid)

    if request.method == "POST":
        date = request.POST.get("date")
        time = request.POST.get("time")
        reason = request.POST.get("reason")

        if Appointment.objects.filter(doId=doctor, date=date, time=time).exists():
            messages.error(request, "This time slot is already booked.")
        else:
            Appointment.objects.create(
                doId=doctor,
                logId=logId,
                date=date,
                time=time,
                reason=reason
            )
            messages.success(request, "Appointment booked successfully.")
            return redirect('/appointmentList/')  

    return render(request, 'USER/appointment.html', {'doctor': doctor,'logId':logId})

def appointmentList(request):
    uid = request.session.get("uid")
    appointments = Appointment.objects.filter(logId=uid)
    return render(request, 'USER/appointmentList.html', {'appointments': appointments})

def userViewTips(request):
    category = request.GET.get('category', 'health')
    if category == 'doctor':
        tips = GenericTip.objects.filter(author_doctor__isnull=False)
    elif category == 'all':
        tips = GenericTip.objects.all()
    else:
        tips = GenericTip.objects.filter(category=category)
    return render(request, 'USER/viewTips.html', {'tips': tips, 'category': category})

def userViewVaccine(request):
    vaccines = VaccinationChart.objects.all()
    return render(request, 'USER/vaccineList.html', {'vaccines': vaccines})

def userViewBabySongs(request):
    songs = BabySong.objects.all()
    return render(request, 'USER/viewBabySongs.html', {'songs': songs})

#>>>>>>>>>>>>>>>>>>>>>>>>>>>>     DOCTOR          >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

def userList(request):
    users = UserReg.objects.all()
    return render(request, 'DOCTOR/userList.html', {'users': users})

def appointmentDetails(request):
    uid = request.session.get("uid")
    appoint = Appointment.objects.filter(doId=uid)
    return render(request, 'DOCTOR/appointmentList.html',{'appoint': appoint})

def approveAppointment(request):
    id = request.GET.get("id")
    app = Appointment.objects.get(id=id)
    app.status = 'approved'
    app.save()
    return redirect('/appointmentDetails/')

def rejectedAppointment(request):
    id = request.GET.get("id")
    app = Appointment.objects.get(id=id)
    app.status = 'rejected'
    app.save()
    return redirect('/appointmentDetails/')

def doctorAddTip(request):
    uid = request.session.get("uid")
    doctor = Doctor.objects.get(id=uid)
    if request.method == 'POST':
        title = request.POST['title']
        content = request.POST['content']
        category = request.POST['category']
        image = request.FILES.get('image')
        GenericTip.objects.create(
            title=title,
            content=content,
            category=category,
            image=image,
            author_doctor=doctor
        )
        messages.success(request, "Tip added successfully!")
        return redirect('/doctorManageTips/')
    return render(request, 'DOCTOR/addTip.html')

def doctorManageTips(request):
    uid = request.session.get("uid")
    doctor = Doctor.objects.get(id=uid)
    tips = GenericTip.objects.filter(author_doctor=doctor)
    return render(request, 'DOCTOR/manageTips.html', {'tips': tips})

def doctorEditTip(request):
    id = request.GET.get("id")
    tip = GenericTip.objects.get(id=id)
    if request.method == 'POST':
        tip.title = request.POST['title']
        tip.content = request.POST['content']
        tip.category = request.POST['category']
        if request.FILES.get('image'):
            tip.image = request.FILES.get('image')
        tip.save()
        messages.success(request, "Tip updated successfully!")
        return redirect('/doctorManageTips/')
    return render(request, 'DOCTOR/editTip.html', {'tip': tip})

def doctorDeleteTip(request):
    id = request.GET.get("id")
    GenericTip.objects.get(id=id).delete()
    return redirect('/doctorManageTips/')

def doctorProfile(request):
    uid = request.session.get("uid")
    doctor = Doctor.objects.get(id=uid)
    return render(request, 'DOCTOR/profile.html', {'doctor': doctor})

def doctorUpdateProfile(request):
    uid = request.session.get("uid")
    doctor = Doctor.objects.get(id=uid)
    if request.method == "POST":
        doctor.name = request.POST.get("name")
        doctor.phone = request.POST.get("phone")
        doctor.age = request.POST.get("age")
        doctor.specialization = request.POST.get("specialization")
        doctor.experience_years = request.POST.get("experience_years")
        doctor.address = request.POST.get("address")
        
        if request.FILES.get("image"):
            doctor.image = request.FILES.get("image")
            
        doctor.save()
        messages.success(request, "Profile updated successfully!")
        return redirect('/doctorProfile/')
        
    return render(request, 'DOCTOR/editProfile.html', {'doctor': doctor})

