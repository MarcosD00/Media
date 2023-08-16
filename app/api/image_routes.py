# from flask import Blueprint, request
# from app.models import db, Image
# from flask_login import current_user, login_required
# from app.s3_helpers import (
#     upload_file_to_s3, get_unique_filename)

# photo_routes = Blueprint("photo", __name__)


# @photo_routes.route("'/new-post'", methods=["POST"])
# @login_required
# def upload_photo():
#     form = photoForm()

#     if form.validate_on_submit():

#         photo = form.data["photo"]
#         photo.filename = get_unique_filename(photo.filename)
#         upload = upload_file_to_s3(photo)
#         print(photo, "~~~~~~~~~~~~~~~~~~~~~~~")

#         if "url" not in upload:
#             # if the dictionary doesn't have a url key
#             # it means that there was an error when you tried to upload
#             # so you send back that error message (and you printed it above)
#             return render_template("post_form.html", form=form, errors=[upload])

#         url = upload["url"]
#         new_photo = Post(photo=url)
#         db.session.add(new_photo)
#         db.session.commit()
#         return redirect("/post/")

#     if form.errors:
#         print(form.errors)
#         return render_template("post_form.html", form=form, errors=form.errors)

#     return render_template("post_form.html", form=form, errors=None)
