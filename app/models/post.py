from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime


class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # columns
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    story = db.Column(db.String(4000), nullable=False)
    photo = db.Column(db.String(1000))
    created_at = db.Column(
        db.Date, default=datetime.date.today, nullable=False)
    updated_at = db.Column(
        db.Date, default=datetime.date.today, nullable=False)

    # relationships
    post_user = db.relationship('User', back_populates='user_post')
    post_comment = db.relationship(
        'Comment', back_populates='comment_post', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'title': self.title,
            'story': self.story,
            'photo': self.photo,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'User_firstName': self.post_user.first_name,
            'User_lastName': self.post_user.last_name
        }
