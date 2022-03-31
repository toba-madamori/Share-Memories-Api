# SHARE MEMORIES API 

This is a partial social media application, with it's main features centering on users been able to  
share memories(pictures/images) that each have meaning and the possibility for other users to like 
and comment on those memories.

#### Motivation

My motivation for this project was mainly to keep developing my backend skills in areas not covered before.


### Features:
Method : Token Authentication
-   User profile
-   Memory sharing
-   Feed generation
-	Possibility to comment and react(like/dislike) a memory



#### Future Plans:
This includes adding a very comprehensive suite of tests for the application 
Real-time communication between users


#### Setup

```bash
npm install && npm start
```

#### Database Connection

1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
4. Add MONGO_URI with correct value
5. Add JWT_SECRET value
6. Add JWT_LIFETIME value

#### Other necessary environment variables

1. CLOUDINARY_NAME
2. CLOUDINARY_API_KEY
3. CLOUDINARY_API_SECRET
4. EMAIL_PASS(for the nodemailer service)
5. EMAIL_ACCOUNT(for the nodemailer service, preferably outlook.com)

#### Security

- helmet
- cors
- xss-clean
- express-rate-limit


