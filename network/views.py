from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.core.paginator import Paginator
from .models import User, Post, Follow
import json

def index(request):
    posts = Post.objects.order_by("-timestamp").all()
    paginator = Paginator(posts, 10 )
    pageNumber = request.GET.get("page")
    pagePosts = paginator.get_page(pageNumber)
    return render(request, "network/index.html", {"pageNumber": pageNumber, "pagePosts": pagePosts})


def login_view(request):
    if request.method == "POST":
        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(
                request,
                "network/login.html",
                {"message": "Invalid username and/or password."},
            )
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(
                request, "network/register.html", {"message": "Passwords must match."}
            )

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(
                request, "network/register.html", {"message": "Username already taken."}
            )
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


def new_post(request):
    if request.method == "POST":
        content = request.POST["content"]
        user = request.user
        post = Post(content=content, user=user)
        post.save()
        post.likes.set([])
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/new_post.html")


def profile(request, username):
    user = User.objects.get(username=username)
    posts = user.posts.order_by("-timestamp").all()
    followers = Follow.objects.filter(followed_user=user)
    following = Follow.objects.filter(user=user)
    is_following = followers.filter(user=request.user).exists()
    paginator = Paginator(posts, 10)
    pageNumber = request.GET.get("page")
    pagePosts = paginator.get_page(pageNumber)
    return render(
        request,
        "network/profile.html",
        {
            "pagePosts": pagePosts,
            "user_profile": user,
            "followers": followers,
            "following": following,
            "is_following": is_following,
        },
    )


def follow(request, username):
    followed = User.objects.get(username=username)
    follower = User.objects.get(pk=request.user.id)
    follow = Follow(user=follower, followed_user=followed)
    follow.save()
    return HttpResponseRedirect(
        reverse(
            "profile",
            args=(username,),
        )
    )


def unfollow(request, username):
    followed = User.objects.get(username=username)
    follower = User.objects.get(pk=request.user.id)
    follow = Follow.objects.get(user=follower, followed_user=followed)
    follow.delete()
    return HttpResponseRedirect(
        reverse(
            "profile",
            args=(username,),
        )
    )

def following(request):
    user = request.user
    following = Follow.objects.filter(user=user)
    posts = Post.objects.filter(user__in=following.values_list("followed_user"))
    paginator = Paginator(posts, 10)
    pageNumber = request.GET.get("page")
    pagePosts = paginator.get_page(pageNumber)
    return render(request, "network/following.html", {"pagePosts": pagePosts,})

def edit_post(request, post_id):
    if request.method == 'PUT':
        # Get the edited content from the request's body
        edited_content = json.loads(request.body).get('content')
        # Find the post based on the post ID
        post = Post.objects.get(pk=post_id)
        # Check if the logged-in user is the owner of the post
        if post.user == request.user:
            # Update the post content
            post.content = edited_content
            post.save()
            return JsonResponse({'message': 'Post updated successfully'})
        else:
            return JsonResponse({'error': 'You are not allowed to edit this post'}, status=403)