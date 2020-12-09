import {mount, createLocalVue} from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Posts from "../../src/components/Posts.vue";
import moment from 'moment'

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


// Task #4
describe('Posts', () => {

    const wrapper = mount(Posts, {router, store, localVue});
    

    it('renders the correct amount of posts', () => {
        let expectedPostCount = testData.length
        
        let posts = wrapper.findAll('.main-container .post')
        let realPostCount = posts.length
        
        expect(expectedPostCount).toEqual(realPostCount)
    })

    it('renders image or video tags depending on media.type property', () => {
        let posts = wrapper.findAll('.main-container .post')
        for (let i=0; i< posts.length; i++){
            let post = posts.at(i)
            let postImage = post.find('.post-image')
            let hasPostImage = postImage.exists()
            if(testData[i].media==null){
                expect(hasPostImage).toBe(false)
            }else{
                expect(hasPostImage).toBe(true)
                let hasImage = postImage.find('img').exists()
                let hasVideo = postImage.find('video').exists()
                if(testData[i].media.type=="image"){
                    expect(hasImage).toBe(true)
                    expect(hasVideo).toBe(false)
                }else if(testData[i].media.type=="video"){
                    expect(hasVideo).toBe(true)
                    expect(hasImage).toBe(false)
                }
            }
           
        }
    })

    it('renders post create time in correct format: Saturday, December 5, 2020 1:53 PM', () => {
        let posts = wrapper.findAll('.main-container .post')
        let posts_dates = wrapper.findAll('.main-container .post .post-author > small')
        for (let i=0; i<posts_dates.length; i++){
            let renderedDate = posts_dates.at(i).text()
            let expectedDate = moment(testData[i].createTime).format('LLLL')
            expect(expectedDate).toEqual(renderedDate)
        }
        
    })


});