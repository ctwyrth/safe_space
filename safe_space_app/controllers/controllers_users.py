from array import array
from safe_space_app import app
from flask import render_template, redirect, request, session, jsonify
from safe_space_app.models.users import User
from flask_bcrypt import Bcrypt
from flask import flash

bcrypt = Bcrypt(app)

@app.route('/')
def index():
    return render_template('/index.html')

@app.route('/register')
def register():
    return render_template('/register.html')

@app.route('/create_user', methods=['POST'])
def create_user():
    if not User.validate_user(request.form):
        return redirect('/register')
    pw_hash = bcrypt.generate_password_hash(request.form['password'])
    print(pw_hash)
    data = {
        'fname': request.form['fname'],
        'lname': request.form['lname'],
        'email': request.form['email'],
        'password': pw_hash
    }
    user_id = User.save_user(data)  # returns new id from INSERT query
    session['user_id'] = user_id  # to pass information between pages
    session['fname'] = request.form['fname']
    session['lname'] = request.form['lname']
    return redirect('/dashboard')

@app.route('/login', methods=['POST'])
def login():
    valid = User.validate_login(request.form)
    if not 'check' in valid:
        print('Failure has redirected you back to the front page.')
        return jsonify(valid)
    print('Validation has succeeded.')
    data = {
        'email': request.form['email']
    }
    users_in_db = User.get_by_email(data)
    if not users_in_db:
        print('The email check failed.')
        flash('No such email exists in our records.', 'error_email_login')
        return redirect('/')
    else:
        print('The email check succeeded.')
        user_in_db = users_in_db[0]
    if not bcrypt.check_password_hash(user_in_db['password'], request.form['password']):
        print('The password check failed.')
        flash('The password you entered does not match the username you provided.', 'error_password_login')
        return redirect('/')
    session['user_id'] = user_in_db['id']
    session['fname'] = user_in_db['first_name']
    session['lname'] = user_in_db['last_name']
    print(session['user_id'], session['fname'], session['lname'])
    return jsonify(valid)

@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        return redirect('/')
    print('We have reached the promised land!')
    return render_template("dashboard.html")

# MAY NOT BE NEEDED FOR BELT PROJECT -------------------------------------------------
@app.route('/show_users')
def show_all_users():
    return render_template('/results.html', users = User.show_all())

@app.route('/show_user/<int:id>')
def show_user(id):
    data = {
        'id': id
    }
    return render_template("/details_user.html", user = User.show_user(data))

@app.route('/edit_user/<int:id>')
def edit_user(id):
    data = {
        'id': id
    }
    return render_template("edit_user.html", user = User.show_user(data))

@app.route('/update_user/<int:id>', methods=['POST']) 
def update_user(id):
    if not User.validate_user_update(request.form):
        return redirect('/')
    data = {
        'id': id,
        "xx":request.form['xx'],
    }
    User.update(data)
    return redirect(f"/show/{id}")

@app.route('/delete/<int:id>') 
def delete_user(id):
    data = {
        'id': id,
    }
    User.delete(data)
    return redirect('/show')
# SEE UPPER COMMENT -----------------------------------------------------------------------^^^

@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')