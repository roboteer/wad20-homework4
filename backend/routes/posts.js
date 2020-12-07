const express = require('express');
const router = express.Router();
const authorize = require('../middlewares/authorize');
const PostModel = require('../models/PostModel');


router.get('/', authorize, (request, response) => {

    // Endpoint to get posts of people that currently logged in user follows or their own posts

    PostModel.getAllForUser(request.currentUser.id, (postIds) => {

        if (postIds.length) {
            PostModel.getByIds(postIds, request.currentUser.id, (posts) => {
                response.status(201).json(posts)
            });
            return;
        }
        response.json([])

    })

});

// Task 1
router.post('/', authorize,  (request, response) => {

    // Endpoint to create a new post
    console.log("NEW POST HAS ARRIVED");
    console.log(request.body);
    console.log(request.currentUser);

    PostModel.create(
        {
        userId: request.currentUser.id,
        text: request.body.text,
        media: request.body.media
        }, () => {
            //response.status(201).json()
            response.json({
                ok: true
            })
        });
});


//Task 2
router.put('/:postId/likes', authorize, (request, response) => {

    // Endpoint for current user to like a post
    console.log('PUT A LIKE')
    console.log(request.body);
    PostModel.like(request.currentUser.id, request.params.postId,
        () => {
            response.json({
                ok: true
            })
        });
});

router.delete('/:postId/likes', authorize, (request, response) => {

    // Endpoint for current user to unlike a post

});

module.exports = router;
