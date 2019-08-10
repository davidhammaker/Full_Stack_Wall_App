from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from .models import Post


def create_new_user(username):
    """
    Create a new User instance.

    :param username: string; the user's username.
    :return: User.
    """
    return User.objects.create_user(username=username)


def create_new_post(content, user):
    """
    Create a new Post instance.

    :param content: string; the posted content.
    :param user: User; the creator of the posted content.
    :return: Post.
    """
    return Post.objects.create(content=content, creator=user)


class PostListViewTests(TestCase):
    def test_no_posts(self):
        """
        If no posts have been made, the API should yield an empty list.
        """
        response = self.client.get(reverse('post-list'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.getvalue(), b'[]')

    def test_post_content(self):
        """
        If a user submits a post, the list view should contain the
        posted content.
        """
        user = create_new_user('testuser')
        post = create_new_post('new post content', user)
        response = self.client.get(reverse('post-list'))
        self.assertContains(response, '"content":"new post content"')

    def test_post_username(self):
        """
        If a user submits a post, the list view should contain the
        user's username.
        """
        user = create_new_user('testuser')
        post = create_new_post('new post content', user)
        response = self.client.get(reverse('post-list'))
        self.assertContains(response, '"creator":"testuser"')

    def test_multiple_posts(self):
        """
        If multiple posts are submitted, the list view should contain
        multiple posts.
        """
        user_1 = create_new_user('testuser1')
        post_1 = create_new_post('new post content 1', user_1)
        user_2 = create_new_user('testuser2')
        post_2 = create_new_post('new post content 2', user_2)
        response = self.client.get(reverse('post-list'))
        self.assertContains(response, '"content":"new post content 1"')
        self.assertContains(response, '"content":"new post content 2"')


class PostDetailViewTests(TestCase):
    def test_no_post(self):
        """
        If no post matches the URL, the response should be a 404.
        """
        response = self.client.get(reverse('post-detail', args=[1]))
        self.assertEqual(response.status_code, 404)

    def test_post_content(self):
        """
        If a user submits a post, the list view should contain the
        posted content.
        """
        user = create_new_user('testuser')
        post = create_new_post('new post content', user)
        response = self.client.get(reverse('post-detail', args=[1]))
        self.assertContains(response, '"content":"new post content"')

    def test_post_username(self):
        """
        If a user submits a post, the list view should contain the
        user's username.
        """
        user = create_new_user('testuser')
        post = create_new_post('new post content', user)
        response = self.client.get(reverse('post-detail', args=[1]))
        self.assertContains(response, '"creator":"testuser"')
