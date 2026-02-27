from django.shortcuts import render,redirect,get_object_or_404
from. models import*
from django.contrib import messages
from datetime import datetime, date

# Create your views here.
def home(request):
    return render(request, 'index.html')

def adminHome(request):
    return render(request, 'ADMIN/index.html')

def userHome(request):
    return render(request, 'USER/index.html')

def doctorHome(request):
    return render(request, 'DOCTOR/index.html')

def shopHome(request):
    return render(request, 'SHOP/index.html')

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

def shop_reg(request):
    if request.method == 'POST':
        shop_name = request.POST["shop_name"]
        owner_name = request.POST["owner_name"]
        phone = request.POST["phone"]
        email = request.POST["email"]
        address = request.POST["address"]
        password = request.POST["password"]
        image = request.FILES.get("image")

        if Login.objects.filter(email=email).exists():
            messages.error(request, "Email already registered.")
            return redirect('/shop_reg')

        user = Login.objects.create(email=email, password=password, userType="Shop")

        ShopReg.objects.create(
            user=user,
            shop_name=shop_name,
            owner_name=owner_name,
            phone=phone,
            email=email,
            address=address,
            password=password,
            image=image
        )
        messages.success(request, "Shop Registered Successfully! Waiting for Admin Approval.")
        return redirect("/login")

    return render(request, 'shop_reg.html')

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
            doctor = Doctor.objects.filter(user=user).first()
            if doctor:
                if doctor.status == "doctorApprove":
                    request.session['uid'] = doctor.id
                    messages.success(request, "Login Successful")
                    return redirect('/doctorHome/')
                elif doctor.status == "pending":
                    messages.error(request, "Your account is pending admin approval.")
                elif doctor.status == "doctorBlock":
                    messages.error(request, "Your account has been blocked by the admin.")
                elif doctor.status == "doctorReject":
                    messages.error(request, "Your account registration has been rejected.")
                else:
                    messages.error(request, "Your account is not active.")
                return redirect('/login/')
            else:
                messages.error(request, "Doctor profile not found.")
                return redirect('/login/')

        elif user.userType == "Shop":
            shop = ShopReg.objects.filter(user=user, status="shopApprove").first()
            if shop:
                request.session['uid'] = shop.id
                messages.success(request, "Login Successful")
                return redirect('/shopHome/')
            elif ShopReg.objects.filter(user=user, status="pending").exists():
                messages.error(request, "Shop approval pending.")
                return redirect('/login/')
            elif ShopReg.objects.filter(user=user, status="shopBlock").exists():
                messages.error(request, "Shop is blocked.")
                return redirect('/login/')
            else:
                messages.error(request, "Shop profile not found or rejected.")
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

def view_shops(request):
    shops = ShopReg.objects.all()
    return render(request, "ADMIN/view_shops.html", {'shops': shops})

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
    elif(action == "doctorReject"):
        client = Doctor.objects.get(id = id)
        client.status = "doctorReject"
        client.save()
        return redirect("/view_doctor")
    elif(action == "doctorBlock"):
        client = Doctor.objects.get(id = id)
        client.status = "doctorBlock"
        client.save()
        return redirect("/view_doctor")
    elif(action == "doctorUnblock"):
        client = Doctor.objects.get(id = id)
        client.status = "doctorApprove"
        client.save()
        return redirect("/view_doctor")

    elif(action == "shopApprove"):
        shop = ShopReg.objects.get(id = id)
        shop.status = "shopApprove"
        shop.save()
        return redirect("/view_shops")
    elif(action == "shopReject"):
        shop = ShopReg.objects.get(id = id)
        shop.status = "shopReject"
        shop.save()
        return redirect("/view_shops")
    elif(action == "shopBlock"):
        shop = ShopReg.objects.get(id = id)
        shop.status = "shopBlock"
        shop.save()
        return redirect("/view_shops")

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
    doct = Doctor.objects.filter(status='doctorApprove')
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
    today = date.today()
    appointments = Appointment.objects.filter(logId=uid, date__gte=today).order_by('date', 'time')
    return render(request, 'USER/appointmentList.html', {'appointments': appointments})

def appointmentHistory(request):
    uid = request.session.get("uid")
    today = date.today()
    appointments = Appointment.objects.filter(logId=uid, date__lt=today).order_by('-date', '-time')
    return render(request, 'USER/appointmentHistory.html', {'appointments': appointments})

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


# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>     SHOP MANAGEMENT     >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

def addProduct(request):
    uid = request.session.get("uid")
    shop = ShopReg.objects.get(id=uid)
    if request.method == 'POST':
        name = request.POST['name']
        description = request.POST['description']
        price = request.POST['price']
        stock = request.POST['stock']
        image = request.FILES.get('image')
        
        Product.objects.create(
            shop=shop,
            name=name,
            description=description,
            price=price,
            stock=stock,
            image=image
        )
        messages.success(request, "Product added successfully!")
        return redirect('/shopProducts/')
    return render(request, 'SHOP/addProduct.html')

def editProduct(request):
    id = request.GET.get("id")
    product = Product.objects.get(id=id)
    if request.method == 'POST':
        product.name = request.POST['name']
        product.description = request.POST['description']
        product.price = request.POST['price']
        product.stock = request.POST['stock']
        if request.FILES.get('image'):
            product.image = request.FILES.get('image')
        product.save()
        messages.success(request, "Product updated successfully!")
        return redirect('/shopProducts/')
    return render(request, 'SHOP/addProduct.html', {'product': product})

def deleteProduct(request):
    id = request.GET.get("id")
    Product.objects.get(id=id).delete()
    return redirect('/shopProducts/')

def shopProducts(request):
    uid = request.session.get("uid")
    shop = ShopReg.objects.get(id=uid)
    products = Product.objects.filter(shop=shop)
    return render(request, 'SHOP/shopProducts.html', {'products': products})

def addEvent(request):
    uid = request.session.get("uid")
    shop = ShopReg.objects.get(id=uid)
    if request.method == 'POST':
        title = request.POST['title']
        description = request.POST['description']
        date = request.POST['date']
        time = request.POST['time']
        location = request.POST['location']
        image = request.FILES.get('image')
        
        Event.objects.create(
            shop=shop,
            title=title,
            description=description,
            date=date,
            time=time,
            location=location,
            image=image
        )
        messages.success(request, "Event created successfully!")
        return redirect('/shopEvents/')
    return render(request, 'SHOP/addEvent.html', {'today': datetime.now()})

def editEvent(request):
    id = request.GET.get("id")
    event = Event.objects.get(id=id)
    if request.method == 'POST':
        event.title = request.POST['title']
        event.description = request.POST['description']
        event.date = request.POST['date']
        event.time = request.POST['time']
        event.location = request.POST['location']
        if request.FILES.get('image'):
            event.image = request.FILES.get('image')
        event.save()
        messages.success(request, "Event updated successfully!")
        return redirect('/shopEvents/')
    return render(request, 'SHOP/addEvent.html', {'event': event, 'today': datetime.now()})

def deleteEvent(request):
    id = request.GET.get("id")
    Event.objects.get(id=id).delete()
    return redirect('/shopEvents/')

def shopEvents(request):
    uid = request.session.get("uid")
    shop = ShopReg.objects.get(id=uid)
    events = Event.objects.filter(shop=shop)
    return render(request, 'SHOP/shopEvents.html', {'events': events})

def shopOrders(request):
    uid = request.session.get("uid")
    shop = ShopReg.objects.get(id=uid)
    # Get orders that contain products from this shop
    orders = Order.objects.filter(items__product__shop=shop).distinct().prefetch_related('items__product')
    return render(request, 'SHOP/shopOrders.html', {'orders': orders})

def updateOrderStatus(request):
    if request.method == 'POST':
        order_id = request.POST.get('order_id')
        status = request.POST.get('status')
        order = Order.objects.get(id=order_id)
        order.status = status
        order.save()
        messages.success(request, f"Order #{order_id} status updated to {status}.")
    return redirect('/shopOrders/')


# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>     USER SHOPPING     >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

def viewShops(request):
    shops = ShopReg.objects.filter(status='shopApprove')
    return render(request, 'USER/viewShops.html', {'shops': shops})

def viewShopProducts(request):
    shop_id = request.GET.get('id')
    shop = ShopReg.objects.get(id=shop_id)
    products = Product.objects.filter(shop=shop, stock__gt=0)
    return render(request, 'USER/viewShopProducts.html', {'shop': shop, 'products': products})

def addToCart(request):
    if request.method == 'POST':
        user_id = request.session.get('uid')
        user = UserReg.objects.get(id=user_id)
        product_id = request.POST.get('product_id')
        quantity = int(request.POST.get('quantity', 1))
        product = Product.objects.get(id=product_id)
        
        # Check stock before adding
        if product.stock < quantity:
            messages.error(request, f"Sorry, only {product.stock} items left in stock.")
            return redirect(f'/viewShopProducts?id={product.shop.id}')

        # Check if product is already in cart for this user
        cart_item, created = Cart.objects.get_or_create(
            user=user,
            product=product,
            defaults={'quantity': quantity}
        )
        
        if not created:
            # Check combined quantity against stock
            if cart_item.quantity + quantity > product.stock:
                messages.error(request, f"Cannot add more. You already have {cart_item.quantity} in cart and stock is {product.stock}.")
            else:
                cart_item.quantity += quantity
                cart_item.save()
                messages.success(request, f"Updated quantity for {product.name} in cart.")
        else:
            messages.success(request, f"Added {product.name} to cart.")
            
        return redirect(f'/viewShopProducts?id={product.shop.id}')
    return redirect('/viewShops/')

def viewCart(request):
    user_id = request.session.get('uid')
    user = UserReg.objects.get(id=user_id)
    cart_items = Cart.objects.filter(user=user)
    
    total_amount = 0
    total_items = 0
    for item in cart_items:
        item.subtotal = item.product.price * item.quantity
        total_amount += item.subtotal
        total_items += item.quantity
        
    return render(request, 'USER/viewCart.html', {
        'cart_items': cart_items,
        'total_amount': total_amount,
        'total_items': total_items
    })

def updateCartQuantity(request):
    if request.method == 'POST':
        cart_id = request.POST.get('cart_id')
        quantity = int(request.POST.get('quantity'))
        cart_item = Cart.objects.get(id=cart_id)
        
        if quantity > cart_item.product.stock:
            messages.error(request, f"Only {cart_item.product.stock} items available in stock.")
        else:
            cart_item.quantity = quantity
            cart_item.save()
            messages.success(request, "Cart updated.")
            
    return redirect('/viewCart/')

def removeFromCart(request):
    cart_id = request.GET.get('id')
    Cart.objects.get(id=cart_id).delete()
    messages.success(request, "Item removed from cart.")
    return redirect('/viewCart/')

def checkout(request):
    user_id = request.session.get('uid')
    user = UserReg.objects.get(id=user_id)
    cart_items = Cart.objects.filter(user=user)
    
    total_amount = sum(item.product.price * item.quantity for item in cart_items)
    if total_amount == 0:
        return redirect('/viewCart/')
        
    return render(request, 'USER/payment.html', {'total_amount': total_amount})

def processPayment(request):
    if request.method == 'POST':
        user_id = request.session.get('uid')
        user_reg = UserReg.objects.get(id=user_id)
        total_amount = request.POST.get('total_amount')
        # Get cart items
        cart_items = Cart.objects.filter(user=user_reg)
        
        # 1. Final Stock Check before processing
        for item in cart_items:
            if item.quantity > item.product.stock:
                messages.error(request, f"Sorry, {item.product.name} is no longer available in the requested quantity.")
                return redirect('/viewCart/')

        # 2. Create Order
        order = Order.objects.create(
            user=user_reg,
            total_amount=total_amount,
            status='pending'
        )
        
        # 3. Create OrderItems and reduce stock
        for item in cart_items:
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )
            # Reduce stock
            item.product.stock -= item.quantity
            item.product.save()
            
        # Clear Cart
        cart_items.delete()
        
        messages.success(request, "Payment successful! Your order has been placed.")
        return redirect('/userHome/')
    return redirect('/viewCart/')

def userViewEvents(request):
    today = date.today()
    events = Event.objects.filter(shop__status='shopApprove', date__gte=today).order_by('date', 'time')
    return render(request, 'USER/userViewEvents.html', {'events': events})

def eventHistory(request):
    today = date.today()
    events = Event.objects.filter(shop__status='shopApprove', date__lt=today).order_by('-date', '-time')
    return render(request, 'USER/eventHistory.html', {'events': events})

def userOrders(request):
    user_id = request.session.get('uid')
    user = UserReg.objects.get(id=user_id)
    orders = Order.objects.filter(user=user).order_by('-created_at')
    return render(request, 'USER/userOrders.html', {'orders': orders})
