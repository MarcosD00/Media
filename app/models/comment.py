from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime


class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # columns
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('posts.id')), nullable=False)
    comment = db.Column(db.String(500), nullable=False)
    created_at = db.Column(
        db.Date, default=datetime.date.today, nullable=False)
    updated_at = db.Column(
        db.Date, default=datetime.date.today, nullable=False)

    # relationships

    comment_user = db.relationship(
        'User', back_populates='user_comment')
    comment_post = db.relationship(
        'Post', back_populates='post_comment')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'comment': self.comment,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'User_id': self.comment_user.id,
            # "User_firstName": self.comment_user.first_name,
            # 'User_lastName': self.comment_user.last_name,
            # "Post_post": self.comment_post.post,
            # "Post_ownerId": self.comment_post.owner_id
        }
