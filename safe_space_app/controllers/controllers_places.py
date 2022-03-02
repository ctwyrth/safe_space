from safe_space_app import app
from flask import render_template, redirect, request, session
from safe_space_app.models.places import Place

@app.route('/new_place')
def new_place():
    return render_template('/new_place.html')

@app.route('/create_place', methods=['POST'])
def create_place():
    if not Place.validate_projectName(request.form):
        return redirect('/?form_route?')
    data = {
        'xx': request.form['xx'],
        'xx': request.form['xx']
    }
    Place.save_place(data)
    return redirect('/show')

@app.route('/show_place/<int:id>')
def show_place(id):
    data = {
        'id': id
    }
    return render_template("/details.html", place = Place.show(data))

@app.route('/edit_place/<int:id>')
def edit_place(id):
    data = {
        'id': id
    }
    return render_template("edit.html", place = Place.show(data))

@app.route('/update_place/<int:id>', methods=['POST']) 
def update_place(id):
    if not Place.validate_place(request.form):
        return redirect(f'/edit_place/{id}')
    data = {
        'id': id,
        "xx":request.form['xx'],
    }
    Place.update(data)
    return redirect(f"/show/{id}")

@app.route('/delete_place/<int:id>') 
def delete_place(id):
    data = {
        'id': id,
    }
    Place.delete(data)
    return redirect('/show')

# Possible routes for multijoin element
# @app.route('/PLACEHOLDER', methods=['POST'])
# def make_PLACEHOLDER():
#     data = {
#         'placeholder_id': request.form['placeholder_id'],
#         'user_id': request.form['user_id'],
#         'PLACEHOLDER': request.form['PLACEHOLDER']
#     }
#     placeholder.new_PLACEHOLDER(data)
#     return redirect(f"/show_placeholder/{request.form['placeholder_id']}")

# @app.route('/PLACEHOLDER_update', methods=['POST'])
# def PLACEHOLDER_update():
#     data = {
#         'PLACEHOLDER_id': request.form['PLACEHOLDER_id'],
#         'user_id': request.form['user_id'],
#         'placeholder_id': request.form['placeholder_id'],
#         'PLACEHOLDER': request.form['PLACEHOLDER']
#     }
#     placeholder.PLACEHOLDER_update(data)
#     return redirect(f"/show_placeholder/{request.form['placeholder_id']}")