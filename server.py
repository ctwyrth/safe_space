from safe_space_app import app
from safe_space_app.controllers import controllers_users
from safe_space_app.controllers import controllers_places
from safe_space_app.controllers import controllers_events
# from safe_space_app.controllers import controllers_places_comments
# from safe_space_app.controllers import controllers_events_comments

if __name__ == '__main__':
    app.run(debug=True)
