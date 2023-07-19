from flask import Blueprint, request
from sqlalchemy.orm import joinedload
from app.models import db, Comment
from app.forms.form import CommentForm
from flask_login import login_required, current_user

comment_routes = Blueprint('comment', __name__)

# GET ALL COMMENTS


@comment_routes.route('/', methods=["GET"])
def getComments():
    comments = Comment.query.all()
    print([comment.to_dict() for comment in comments])
    return [comment.to_dict() for comment in comments]

# GET ALL COMMENTS FOR A POST


@comment_routes.route('/post/<int:id>', methods=["GET"])
def commentIndex(id):
    comments = Comment.query.filter(Comment.post_id == id).all()
    print([comment.to_dict() for comment in comments])
    return [comment.to_dict() for comment in comments]

# GET COMMENTS BY ID


@comment_routes.route('/<int:id>', methods=["GET"])
def getCommentByID(id):
    comments = Comment.query.filter(Comment.id == id).first()
    return comments.to_dict()

# GET ALL COMMENTS BY USER ID


@comment_routes.route('/user/<int:id>', methods=["GET"])
def getCommentByUserID(id):
    comments = Comment.query.filter(Comment.user_id == id).all()
    return [comment.to_dict() for comment in comments]

# CREATE NEW COMMENTS


@comment_routes.route('/new/<int:id>', methods=["GET", "POST"])
def newComment(id):
    if request.method == "POST":

        form = CommentForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        data = form.data
        print('data', data)
        if form.validate_on_submit():
            newComment = Comment(
                comment=data['comment'],
                user_id=data['user_id'],
                post_id=data['post_id']
            )

            db.session.add(newComment)
            db.session.commit()
            return newComment.to_dict()

# UPDATE COMMENTS


@comment_routes.route('/update-comments/<int:id>', methods=["GET", "POST"])
def commentUpdate(id):

    comment = Comment.query.filter(Comment.id == id).first()
    if request.method == "POST":

        # print('comment', comment)
        data = request.get_json()
        # print('data', data)
        new_comment = data.get('comment')
        # print('post', post)
        comment.body = comment
        # print('comment.body', comment)
        db.session.commit()
        return comment.to_dict()
    return

# DELETE COMMENTS


@comment_routes.route('/delete-comments/<int:id>', methods=["GET", "POST"])
def deleteComment(id):
    comment = Comment.query.filter(Comment.id == id).first()
    db.session.delete(comment)
    # question.delete()
    db.session.commit()
    return {"message": "Successfully Deleted"}
