from flask import Blueprint, request
from app.models import db, Post, Comment
from app.forms.form import PostForm
from flask_login import login_required, current_user
from sqlalchemy import func

post_routes = Blueprint('post', __name__)


@post_routes.route('/', methods=["GET"])
# @login_required
def postIndex():
    """
       view all posts
    """
    posts = Post.query.all()
    print(posts[0].post_user)
    return [post.to_dict() for post in posts]


@post_routes.route('/<int:id>', methods=['GET'])
def getSinglePost(id):
    # form['csrf_token'].data = request.cookies['csrf_token']
    post = Post.query.get(id)
    return post.to_dict()


@post_routes.route('/new-post', methods=['POST'])
@login_required
def newPost():
    """
    adds new posts
    """
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    if form.validate_on_submit():
        newPost = Post(
            owner_id=current_user.id,
            photo=data['photo'],
            title=data['title'],
            story=data['story']
        )
        newPost.post_user = current_user
        db.session.add(newPost)
        db.session.commit()
        return newPost.to_dict()
    else:
        return form.errors


@post_routes.route('/update-post/<int:id>', methods=['POST'])
def updatePost(id):
    # form['csrf_token'].data = request.cookies['csrf_token']
    print(id)
    post = Post.query.filter(Post.id == id).first()
    if request.method == 'POST':
        data = request.get_json()

        new_photo_text = data.get('photo')
        new_post_text = data.get('story')
        new_title_text = data.get('title')

        post.photo = new_photo_text
        post.title = new_title_text
        post.story = new_post_text

        db.session.commit()
        return post.to_dict()

    return "nothing found"


@post_routes.route('/delete-post/<int:id>', methods=['POST'])
def deletePost(id):
    post = Post.query.filter(Post.id == id).first()
    db.session.delete(post)
    db.session.commit()
    return {"message": "Successfully Deleted"}
