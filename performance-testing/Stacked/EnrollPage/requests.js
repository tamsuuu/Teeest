import { credentials, authorization, payload } from "./environment_variables.js";

export const stackedRequest = {
    pages: {
        freeCourse: {
            url: `${credentials.stackedURL}/marketplace/N03yn3eVYRLE`,
        },

        freePurchase: {
            url: `${credentials.stackedURL}/course_purchases/`,
        },

        freePurchaseDetails: {
            url: `${credentials.stackedURL}/purchases/680/details`,
        },

        premiumCourse: {
            url: `${credentials.stackedURL}`,
        },

        purchase: {
            url: `${credentials.stackedURL}`,
        }
    },

    apis: {
        verify: {
            url: `${credentials.stackedURL}/api/auth/token/verify`,
            token: `{"token":"${credentials.bearerToken}"}`,
        },

        states: {
            url: `${credentials.stackedURL}/api/me/states`,
            payload: payload.states,
        },

        courseByCourse: {
            url: `${credentials.stackedURL}/api/courses_by_course_key/N03yn3eVYRLE?type=marketplace`,
        },

        courseLanguage: {
            url: `${credentials.stackedURL}/api/course_languages?page=1`,
        },

        courseSubject: {
            url: `${credentials.stackedURL}/api/course_subjects?page=1`,
        },

        career: {
            url: `${credentials.stackedURL}/api/courses?type=stacktrek-academy-career&page=1&version=2`,
        },

        skill: {
            url:`${credentials.stackedURL}/api/courses?type=stacktrek-academy-skill&page=1&version=2`,
        },

        coursePurchaseSlot: {
            url: `${credentials.stackedURL}/api/course_purchase_slots/2255/user_type`,
        },

        coursePurchase: {
            url: `${credentials.stackedURL}/api/course_purchase`,
            payload: payload.freePurchaseDetails,
        },

        requestJoinAsInstructor: {
            url:`${credentials.stackedURL}/api/courses/2255/classes/4093/requests/instructors`,
        }
    }
}