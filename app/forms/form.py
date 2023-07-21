from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired


class PostForm(FlaskForm):
    owner_id = IntegerField('OwnerId')
    photo = StringField('Post')
    title = StringField('Post', validators=[DataRequired()])
    story = StringField('Post', validators=[DataRequired()])
    submit = SubmitField('Post Post')


class CommentForm(FlaskForm):
    user_id = IntegerField('userId', validators=[DataRequired()])
    post_id = IntegerField('postId', validators=[DataRequired()])
    comment = StringField('Comment', validators=[DataRequired()])
    submit = SubmitField('Post Comment')
