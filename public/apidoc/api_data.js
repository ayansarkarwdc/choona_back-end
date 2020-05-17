define({ "api": [
  {
    "type": "get",
    "url": "/activity/list",
    "title": "My Activity List",
    "group": "Activity",
    "header": {
      "fields": {
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": [\n        {\n            \"_id\": \"5eb538f5521e0638a5bceadb\",\n            \"full_name\": \"Jhon doe\",\n            \"profile_image\": \"profile_image_1588848830991_tst.jpg\",\n            \"username\": \"spotify\",\n            \"user_id\": \"5eb3e8bfc26a203c69957603\",\n            \"activity_type\": \"following\",\n            \"created_at\": null\n        }\n    ],\n    \"message\": \"Your activities fetched successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/api/activity.routes.js",
    "groupTitle": "Activity",
    "name": "GetActivityList"
  },
  {
    "type": "get",
    "url": "/applemusic/token",
    "title": "Token applemusic",
    "group": "Activity",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"token\": \"eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IktKN0RKQjM3NjgifQ.eyJpYXQiOjE1ODk0NjE4MzksImV4cCI6MTYwNTAxMzgzOSwiaXNzIjoiSDIzVzNFRVJMSyJ9.L-mhSqbspX_-YJhT5al5x05vGFePZ3VQK_ftUiQvjbhWdSxgNlFAA-O6HNKcnxWvZlmhWFelloz-TuXVIriIkg\",\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/api/applemusic.routes.js",
    "groupTitle": "Activity",
    "name": "GetApplemusicToken"
  },
  {
    "type": "post",
    "url": "/message/list",
    "title": "List",
    "group": "Inbox",
    "header": {
      "fields": {
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": [\n        {\n            \"_id\": \"5eb57a9e560f17264998e6a9\",\n            \"sender_full_name\": \"Jhon doe\",\n            \"sender_profile_image\": \"profile_image_1588848830991_tst.jpg\",\n            \"sender_username\": \"spotify\",\n            \"sender_user_id\": null,\n            \"song\": \"e\",\n            \"created_at\": \"2020-05-08T15:28:30.698Z\"\n        },\n        {\n            \"_id\": \"5eb57a9e560f17264998e6a8\",\n            \"sender_full_name\": \"Jhon doe\",\n            \"sender_profile_image\": \"profile_image_1588848830991_tst.jpg\",\n            \"sender_username\": \"spotify\",\n            \"sender_user_id\": null,\n            \"song\": \"d\",\n            \"created_at\": \"2020-05-08T15:28:30.613Z\"\n        },\n        {\n            \"_id\": \"5eb57a9e560f17264998e6a7\",\n            \"sender_full_name\": \"Jhon doe\",\n            \"sender_profile_image\": \"profile_image_1588848830991_tst.jpg\",\n            \"sender_username\": \"spotify\",\n            \"sender_user_id\": null,\n            \"song\": \"a\",\n            \"created_at\": \"2020-05-08T15:28:30.532Z\"\n        },\n        {\n            \"_id\": \"5eb57a9e560f17264998e6a6\",\n            \"sender_full_name\": \"Jhon doe\",\n            \"sender_profile_image\": \"profile_image_1588848830991_tst.jpg\",\n            \"sender_username\": \"spotify\",\n            \"sender_user_id\": null,\n            \"song\": \"e\",\n            \"created_at\": \"2020-05-08T15:28:30.452Z\"\n        },\n        {\n            \"_id\": \"5eb57a9e560f17264998e6a5\",\n            \"sender_full_name\": \"Jhon doe\",\n            \"sender_profile_image\": \"profile_image_1588848830991_tst.jpg\",\n            \"sender_username\": \"spotify\",\n            \"sender_user_id\": null,\n            \"song\": \"d\",\n            \"created_at\": \"2020-05-08T15:28:30.369Z\"\n        },\n        {\n            \"_id\": \"5eb57a9e560f17264998e6a4\",\n            \"sender_full_name\": \"DJ OHEM\",\n            \"sender_profile_image\": \"profile_image_1588848830991_tst.jpg\",\n            \"sender_username\": \"ohem\",\n            \"sender_user_id\": null,\n            \"song\": \"a\",\n            \"created_at\": \"2020-05-08T15:28:30.276Z\"\n        }\n    ],\n    \"message\": \"Your inbox fetched successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/api/message.routes.js",
    "groupTitle": "Inbox",
    "name": "PostMessageList"
  },
  {
    "type": "post",
    "url": "/message/store",
    "title": "Store",
    "group": "Inbox",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "receiver_id",
            "description": "<p>Receiver User Id [receiver_id[0]=1,receiver_id[2]=2]</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "song",
            "description": "<p>song Selected Song [song[0]='aaa']</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": [\n        {\n            \"_id\": \"5eb538f5521e0638a5bceadb\",\n            \"full_name\": \"Jhon doe\",\n            \"profile_image\": \"profile_image_1588848830991_tst.jpg\",\n            \"username\": \"spotify\",\n            \"user_id\": \"5eb3e8bfc26a203c69957603\",\n            \"activity_type\": \"following\",\n            \"created_at\": null\n        }\n    ],\n    \"message\": \"Your activities fetched successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/api/message.routes.js",
    "groupTitle": "Inbox",
    "name": "PostMessageStore"
  },
  {
    "type": "get",
    "url": "/setting/all",
    "title": "All Setting",
    "version": "1.0.0",
    "group": "Setting",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": [\n        {\n            \"setting_name\": \"Site Email\",\n            \"setting_slug\": \"site-email\",\n            \"setting_value\": \"info@choona.com\",\n            \"status\": \"Active\",\n            \"isDeleted\": false,\n            \"_id\": \"5e81a7b8c7d64cd82b52eb63\"\n        },\n        {\n            \"setting_name\": \"Phone\",\n            \"setting_slug\": \"phone\",\n            \"setting_value\": \"1234567890\",\n            \"status\": \"Active\",\n            \"isDeleted\": false,\n            \"_id\": \"5e81a7e1c7d64cd82b52ec22\"\n        }\n    ],\n    \"message\": \"Setting Data fetched Successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/setting.routes.js",
    "groupTitle": "Setting",
    "name": "GetSettingAll"
  },
  {
    "type": "post",
    "url": "/song/sent/store",
    "title": "Share / Send Song",
    "group": "Song",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "song_id",
            "description": "<p>Song Id</p>"
          },
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "shared_user_id",
            "description": "<p>User id to send song</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": {\n        \"_id\": \"5eb523a9ed51692f40fcb817\",\n        \"shared_user_id\": \"5eb3e8bfc26a203c69957603\",\n        \"song_id\": \"5ea174f4c7d64cd82bddd54a\",\n        \"user_id\": \"5eb3e8bfc26a203c69957603\",\n        \"createdAt\": \"2020-05-08T09:17:29.522Z\",\n        \"__v\": 0\n    },\n    \"message\": \"Your song shared successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/api/song.routes.js",
    "groupTitle": "Song",
    "name": "PostSongSentStore"
  },
  {
    "type": "post",
    "url": "/song/store",
    "title": "Store Song",
    "group": "Song",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "song_id",
            "description": "<p>Song Id</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": {\n        \"_id\": \"5eb52192ecb87c2c4eedf42e\",\n        \"song_id\": \"5ea174f4c7d64cd82bddd54a\",\n        \"user_id\": \"5eb3e8bfc26a203c69957603\",\n        \"createdAt\": \"2020-05-08T09:08:34.833Z\",\n        \"__v\": 0\n    },\n    \"message\": \"Your song saved successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/api/song.routes.js",
    "groupTitle": "Song",
    "name": "PostSongStore"
  },
  {
    "type": "get",
    "url": "/follower/following/list",
    "title": "My Following List",
    "group": "User",
    "header": {
      "fields": {
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": [\n        {\n            \"_id\": \"5eb41a21c7d64cd82b336b86\",\n            \"full_name\": \"DJ Ohem\",\n            \"profile_image\": \"profile_image_1588848830991_tst.jpg\",\n            \"username\": \"spotify\",\n            \"user_id\": \"5eb4199ac7d64cd82b33677b\"\n        }\n    ],\n    \"message\": \"Your following list fetched successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/api/follower.routes.js",
    "groupTitle": "User",
    "name": "GetFollowerFollowingList"
  },
  {
    "type": "get",
    "url": "/follower/list",
    "title": "My Follower List",
    "group": "User",
    "header": {
      "fields": {
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": [\n        {\n            \"_id\": \"5eb41594271eb75b623492e4\",\n            \"full_name\": \"New User\",\n            \"profile_image\": null,\n            \"username\": null,\n            \"user_id\": \"5ea174f4c7d64cd82bddd54a\"\n        }\n    ],\n    \"message\": \"My follower list.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/api/follower.routes.js",
    "groupTitle": "User",
    "name": "GetFollowerList"
  },
  {
    "type": "get",
    "url": "/user/logout",
    "title": "User Logout",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>User's Access Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": [],\n    \"isLoggedIn\": false,\n    \"message\": \"Logout successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/api/user.routes.js",
    "groupTitle": "User",
    "name": "GetUserLogout"
  },
  {
    "type": "get",
    "url": "/user/profile",
    "title": "User's Profile",
    "version": "1.0.0",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>User's Access token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": {\n        \"full_name\": \"Node user\",\n        \"username\": \"spotify\",\n        \"social_username\": \"hello\",\n        \"phone\": \"\",\n        \"email\": \"laravel@gmail.com\",\n        \"password\": \"\",\n        \"profile_image\": \"profile_image_1588848830991_tst.jpg\",\n        \"social_id\": \"123456\",\n        \"register_type\": \"spotify\",\n        \"isDeleted\": false,\n        \"deviceToken\": \"\",\n        \"deviceType\": \"android\",\n        \"email_notification\": true,\n        \"push_notification\": true,\n        \"isActive\": true,\n        \"_id\": \"5eb3e8bfc26a203c69957603\",\n        \"role\": \"5ea174d3c7d64cd82bddd490\",\n        \"createdAt\": \"2020-05-07T10:53:51.583Z\",\n        \"updatedAt\": \"2020-05-07T10:53:51.583Z\"\n    },\n    \"message\": \"Profile Info fetched Successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/user.routes.js",
    "groupTitle": "User",
    "name": "GetUserProfile"
  },
  {
    "type": "post",
    "url": "/follower/user/store",
    "title": "Follow Create Or Delete",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "follower_id",
            "description": "<p>Visited user Id</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 201,\n    \"data\": {\n        \"_id\": \"5eb411ddb96f61589dad3c61\",\n        \"user_id\": \"5eb3e8bfc26a203c69957603\",\n        \"follower_id\": \"5ea174f4c7d64cd82bddd54a\",\n        \"createdAt\": \"2020-05-07T13:49:17.019Z\",\n        \"__v\": 0\n    },\n    \"message\": \"You have follwed this user successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/api/follower.routes.js",
    "groupTitle": "User",
    "name": "PostFollowerUserStore"
  },
  {
    "type": "post",
    "url": "/user/forgotpassword",
    "title": "Forgot Password",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "email",
            "description": "<p>User's account Email</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": [],\n    \"message\": \"A verification code to reset your password sent to your registered email\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/user.routes.js",
    "groupTitle": "User",
    "name": "PostUserForgotpassword"
  },
  {
    "type": "post",
    "url": "/user/profile/update",
    "title": "User profile update",
    "version": "1.0.0",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>User's Access Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "profile_image",
            "description": "<p>Profile Image [Multipart]</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "full_name",
            "description": "<p>Full Name</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "location",
            "description": "<p>Location</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": {\n        \"first_name\": \"Johana\",\n        \"last_name\": \"Black\",\n        \"phone\": \"7894561236\",\n        \"email\": \"johan@yopmail.com\",\n        \"password\": \"$2a$08$POxN7JXDFAT7bkxkhaoQDebUT4iMPV3kcPRqxr9.Vh2lQ9vEpqj..\",\n        \"profile_pic\": \"profile_pic_1586250554891_img3.jpg\",\n        \"deviceToken\": \"123456789\",\n        \"deviceType\": \"android\",\n        \"verification_code\": null,\n        \"social_id\": \"\",\n        \"register_type\": \"normal\",\n        \"isVerified\": false,\n        \"isDeleted\": false,\n        \"email_notification\": true,\n        \"push_notification\": true,\n        \"isActive\": true,\n        \"_id\": \"5e871514d982311378cf3c6c\",\n        \"role\": \"5e81bf47c7d64cd82b5348f1\",\n        \"createdAt\": \"2020-04-03T10:51:00.684Z\",\n        \"updatedAt\": \"2020-04-07T09:09:14.970Z\"\n    },\n    \"message\": \"User details updated successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/user.routes.js",
    "groupTitle": "User",
    "name": "PostUserProfileUpdate"
  },
  {
    "type": "post",
    "url": "/user/search",
    "title": "Search User",
    "version": "1.0.0",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>User's Access Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "keyword",
            "description": "<p>Search keyword</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": [\n        {\n            \"full_name\": \"DJ Ohem\",\n            \"username\": \"spotify\",\n            \"social_username\": \"user\",\n            \"email\": \"test@gmail.com\",\n            \"password\": \"\",\n            \"profile_image\": \"profile_image_1588848830991_tst.jpg\",\n            \"location\": \"kolkata\",\n            \"social_id\": \"45678\",\n            \"register_type\": \"spotify\",\n            \"isDeleted\": false,\n            \"deviceToken\": \"\",\n            \"deviceType\": \"android\",\n            \"isActive\": true,\n            \"_id\": \"5eb4199ac7d64cd82b33677b\",\n            \"phone\": \"\",\n            \"role\": \"5ea174d3c7d64cd82bddd490\",\n            \"createdAt\": \"2020-05-07T10:53:51.583Z\",\n            \"updatedAt\": \"2020-05-07T12:13:49.946Z\"\n        }\n    ],\n    \"message\": \"User list fetched successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/user.routes.js",
    "groupTitle": "User",
    "name": "PostUserSearch"
  },
  {
    "type": "post",
    "url": "/user/signin",
    "title": "User SignIn",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "social_id",
            "description": "<p>Social Id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "social_type",
            "description": "<p>Social Type [apple/spotify]</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "deviceToken",
            "description": "<p>Device Token</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "deviceType",
            "description": "<p>Device Type[ios/android]</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": {\n        \"full_name\": \"Node user\",\n        \"username\": \"spotify\",\n        \"social_username\": \"hello\",\n        \"phone\": \"\",\n        \"email\": \"laravel@gmail.com\",\n        \"password\": \"\",\n        \"profile_image\": \"profile_image_1588848830991_tst.jpg\",\n        \"social_id\": \"123456\",\n        \"register_type\": \"spotify\",\n        \"isDeleted\": false,\n        \"deviceToken\": \"\",\n        \"deviceType\": \"android\",\n        \"email_notification\": true,\n        \"push_notification\": true,\n        \"isActive\": true,\n        \"_id\": \"5eb3e8bfc26a203c69957603\",\n        \"role\": \"5ea174d3c7d64cd82bddd490\",\n        \"createdAt\": \"2020-05-07T10:53:51.583Z\",\n        \"updatedAt\": \"2020-05-07T10:53:51.583Z\"\n    },\n    \"isLoggedIn\": true,\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYjNlOGJmYzI2YTIwM2M2OTk1NzYwMyIsImlhdCI6MTU4ODg1MDE5NCwiZXhwIjoxNTkxNDQyMTk0fQ.bSud3muISEB0xQ_JiIh3bX4A-_QyU_q4RhP_0WjrPYg\",\n    \"message\": \"Login successful.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/user.routes.js",
    "groupTitle": "User",
    "name": "PostUserSignin"
  },
  {
    "type": "post",
    "url": "/user/signup",
    "title": "User Signup",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "full_name",
            "description": "<p>Full Name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "profile_image",
            "description": "<p>profile Image</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "location",
            "description": "<p>Location</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "social_username",
            "description": "<p>Username[spotyfy/ apple]</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "deviceToken",
            "description": "<p>Device Token</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "deviceType",
            "description": "<p>Device Type [android / ios]</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "social_id",
            "description": "<p>Social Id [ For  spotify or apple]</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "register_type",
            "description": "<p>[spotify / apple]</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": {\n        \"full_name\": \"Node user\",\n        \"username\": \"spotify\",\n        \"social_username\": \"hello\",\n        \"phone\": \"\",\n        \"email\": \"laravel@gmail.com\",\n        \"password\": \"\",\n        \"profile_image\": \"profile_image_1588848830991_tst.jpg\",\n        \"social_id\": \"123456\",\n        \"register_type\": \"spotify\",\n        \"isDeleted\": false,\n        \"deviceToken\": \"\",\n        \"deviceType\": \"android\",\n        \"email_notification\": true,\n        \"push_notification\": true,\n        \"isActive\": true,\n        \"_id\": \"5eb3e8bfc26a203c69957603\",\n        \"role\": \"5ea174d3c7d64cd82bddd490\",\n        \"createdAt\": \"2020-05-07T10:53:51.583Z\",\n        \"updatedAt\": \"2020-05-07T10:53:51.583Z\"\n    },\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYjNlOGJmYzI2YTIwM2M2OTk1NzYwMyIsImlhdCI6MTU4ODg0ODgzMSwiZXhwIjoxNTkxNDQwODMxfQ.ElS8AEKyZsOmFVVrunyw3B5AZvfiv8qVBqOY3LaniHo\",\n    \"message\": \"Registration successful.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/user.routes.js",
    "groupTitle": "User",
    "name": "PostUserSignup"
  }
] });
