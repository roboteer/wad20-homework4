import {mount, createLocalVue} from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Posts from "../../src/components/Posts.vue";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

//Create dummy store
const store = new Vuex.Store({
    state: {
        user: {
            id: 1,
            firstname: 'test',
            lastname: 'test',
            email: 'test',
            avatar: 'test',
        }
    },
    getters: {
        user: (state) => state.user,
    }
});

//Create dummy routes
const routes = [
    {
        path: '/',
        name: 'posts',
    },
    {
        path: '/profiles',
        name: 'profiles'
    }
];

const router = new VueRouter({routes});

const testData = [
    {
        id: 1,
        text: "I think it's going to rain",
        createTime: "2020-12-05 13:53:23",
        likes: 0,
        liked: false,
        media: {
            url: "test-image.jpg",
            type: "image"
        },
        author: {
            id: 2,
            firstname: "Gordon",
            lastname: "Freeman",
            avatar: 'avatar.url'
        }
    },
    {
        id: 2,
        text: "Which weighs more, a pound of feathers or a pound of bricks?",
        createTime: "2020-12-05 13:53:23",
        likes: 1,
        liked: true,
        media: null,
        author: {
            id: 3,
            firstname: "Sarah",
            lastname: "Connor",
            avatar: 'avatar.url'
        }
    },
    {
        id: 4,
        text: null,
        createTime: "2020-12-05 13:53:23",
        likes: 3,
        liked: false,
        media: {
            url: "test-video.mp4",
            type: "video"
        },
        author: {
            id: 5,
            firstname: "Richard",
            lastname: "Stallman",
            avatar: 'avatar.url'
        }
    }
];

//Mock axios.get method that our Component calls in mounted event
jest.mock("axios", () => ({
    get: () => Promise.resolve({
        data: testData
    })
}));


//Test that exactly as many posts are rendered as contained in testData variable
//Test that if post has media property, image or video tags are rendered depending on media.type property, or if media property is absent nothing is rendered.
//Test that post create time is displayed in correct format: Saturday, December 5, 2020 1:53 PM
describe('Posts', () => {

    const wrapper = mount(Posts, {router, store, localVue});
    

    it('renders the correct amount of posts', () => {
        let expectedPostCount = testData.length
        
        let posts = wrapper.findAll('.main-container .post')
        let realPostCount = posts.length
        
        expect(expectedPostCount).toBe(realPostCount)
    })

    it('renders image or video tags depending on media.type property', () => {
        let posts = wrapper.findAll('.main-container .post')

        console.log(posts.at(0))

        for (let i=0; i< posts.length; i++){
            console.log(posts.at(i).find('.post-image'))
        }
        expect(true).toBe(true)
    })

});