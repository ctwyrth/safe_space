from safe_space_app import app
from flask import render_template, redirect, request, session
from safe_space_app.models.events import Event

@app.route('/new_event')
def new_event():
   return render_template('/new_event.html')

@app.route('/create_event', methods=['POST'])
def create_event():
   if not Event.validate_projectName(request.form):
      return redirect('/?form_route?')
   data = {
      'xx': request.form['xx'],
      'xx': request.form['xx']
   }
   Event.save_event(data)
   return redirect('/show')

@app.route('/show_event/<int:id>')
def show_event(id):
   data = {
      'id': id
   }
   return render_template("/details.html", event = Event.show(data))

@app.route('/edit_event/<int:id>')
def edit_event(id):
   data = {
      'id': id
   }
   return render_template("edit.html", event = Event.show(data))

@app.route('/update_event/<int:id>', methods=['POST']) 
def update_event(id):
   if not Event.validate_event(request.form):
      return redirect(f'/edit_event/{id}')
   data = {
      'id': id,
      'xx':request.form['xx'],
   }
   Event.update(data)
   return redirect(f"/show/{id}")

@app.route('/delete_event/<int:id>') 
def delete_event(id):
   data = {
      'id': id,
   }
   Event.delete(data)
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