from django.urls import reverse
from django.core import mail
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
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


class PostListViewTests(APITestCase):
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

    def test_authenticated_posts(self):
        """
        Authenticated users may submit new posts.
        """
        user = create_new_user('testuser')
        self.client.force_authenticate(user=user)
        response = self.client.post(
            reverse('post-list'),
            {'content': 'test post', 'creator': user}
        )
        self.assertEqual(response.status_code, 201)

    def test_unauthenticated_posts(self):
        """
        Unauthenticated users may not submit new posts.
        """
        response = self.client.post(
            reverse('post-list'),
            {'content': 'test post'}
        )
        self.assertEqual(response.status_code, 403)


class PostDetailViewTests(APITestCase):
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

    def test_post_creator_modify(self):
        """
        A post's creator may modify the post.
        """
        user = create_new_user(username='testuser')
        post = create_new_post('new post content', user)
        self.client.force_authenticate(user=user)
        response = self.client.put(
            reverse('post-detail', args=[1]),
            {'content': 'updated post content'}
        )
        self.assertContains(
            response,
            '"content":"updated post content"')

    def test_post_not_creator_modify(self):
        """
        A user may not modify a different user's post.
        """
        user_1 = create_new_user(username='testuser_1')
        post = create_new_post('new post content', user_1)
        user_2 = create_new_user(username='testuser_2')
        self.client.force_authenticate(user=user_2)
        response = self.client.put(
            reverse('post-detail', args=[1]),
            {'content': 'updated post content'}
        )
        self.assertEqual(response.status_code, 403)

    def test_post_creator_delete(self):
        """
        A post's creator may delete the post.
        """
        user = create_new_user(username='testuser')
        post = create_new_post('new post content', user)
        self.client.force_authenticate(user=user)
        response = self.client.delete(reverse('post-detail', args=[1]))
        self.assertEqual(response.status_code, 204)

    def test_post_not_creator_delete(self):
        """
        A user may not delete a different user's post.
        """
        user_1 = create_new_user(username='testuser_1')
        post = create_new_post('new post content', user_1)
        user_2 = create_new_user(username='testuser_2')
        self.client.force_authenticate(user=user_2)
        response = self.client.delete(reverse('post-detail', args=[1]))
        self.assertEqual(response.status_code, 403)


class UserCreateViewTests(APITestCase):
    def test_user_creation(self):
        """
        Upon successful POST, a new user should be created.
        """
        response = self.client.post(
            reverse('user-create'),
            {
                'username': 'testuser',
                'email': 'test@gmail.com',
                'password': 'Testing321'
            }
        )
        self.assertEqual(response.status_code, 201)

    def test_user_creation_no_username(self):
        """
        Users creation attempts without a username will not succeed.
        """
        response = self.client.post(
            reverse('user-create'),
            {
                'email': 'test@gmail.com',
                'password': 'Testing321'
            }
        )
        self.assertNotEqual(response.status_code, 201)

    def test_user_creation_no_email(self):
        """
        Users creation attempts without an email address will not
        succeed.
        """
        response = self.client.post(
            reverse('user-create'),
            {
                'username': 'testuser',
                'password': 'Testing321'
            }
        )
        self.assertNotEqual(response.status_code, 201)

    def test_user_creation_no_password(self):
        """
        Users creation attempts without an email address will not
        succeed.
        """
        response = self.client.post(
            reverse('user-create'),
            {
                'username': 'testuser',
                'email': 'test@gmail.com',
            }
        )
        self.assertNotEqual(response.status_code, 201)

    def test_user_creation_duplicate_username(self):
        """
        Users cannot be created with existing usernames.
        """
        _ = self.client.post(
            reverse('user-create'),
            {
                'username': 'testuser',
                'email': 'test@gmail.com',
                'password': 'Testing321'
            }
        )
        response = self.client.post(
            reverse('user-create'),
            {
                'username': 'testuser',
                'email': 'test2@gmail.com',
                'password': 'Testing321'
            }
        )
        self.assertNotEqual(response.status_code, 201)

    def test_user_creation_duplicate_email(self):
        """
        Users cannot be created with existing email addresses.
        """
        _ = self.client.post(
            reverse('user-create'),
            {
                'username': 'testuser',
                'email': 'test@gmail.com',
                'password': 'Testing321'
            }
        )
        response = self.client.post(
            reverse('user-create'),
            {
                'username': 'testuser2',
                'email': 'test@gmail.com',
                'password': 'Testing321'
            }
        )
        self.assertNotEqual(response.status_code, 201)

    def test_welcome_email(self):
        """
        New users should receive a welcome email.
        """
        response = self.client.post(
            reverse('user-create'),
            {
                'username': 'testuser',
                'email': 'test@gmail.com',
                'password': 'Testing321'
            }
        )
        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].subject, 'Welcome to Wall App!')
